import { useQuery } from '@tanstack/react-query'
import { apiEndPoint } from '../constants/Environment'
import { Issue, IssueSchema, issueQuery as issuesQuery } from '../models/Issue'
import { issuesQueryKey } from './queryKeys'

const query = `{ issues { nodes { ${issuesQuery} } } }`

export default function useAllIssues(token: string, teamId: string, isBacklogIncluded: boolean) {
  const { data: issues, isFetching } = useQuery({
    queryKey: [issuesQueryKey],
    queryFn: async () => {
      return fetch(apiEndPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ query: `{ team(id: \"${teamId}\") ${query}  }` }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data) return []
          let allIssues: Issue[] = data.data.team.issues.nodes.map((node: any) => IssueSchema.parse(node))

          return isBacklogIncluded ? allIssues : allIssues.filter((issue) => issue.state.type !== 'backlog')
        })
        .catch((error) => {
          console.error(error)
        })
    },
  })

  return { issues, isLoading: isFetching }
}
