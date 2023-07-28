import { useQuery } from '@tanstack/react-query'
import { apiEndPoint } from '../constants/Environment'
import { Issue, issueQuery as issuesQuery } from '../models/Issue'
import { issuesQueryKey } from './queryKeys'

const query = `{ issues { nodes { ${issuesQuery} } } }`

export default function useAllIssues(token: string) {
  const { data: issues, isFetching } = useQuery({
    queryKey: [issuesQueryKey],
    queryFn: async () => {
      return fetch(apiEndPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ query: query }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data) return []
          let allIssues: Issue[] = data.data.issues.nodes.map((node: any) => node as Issue)
          return allIssues
        })
        .catch((error) => {
          console.error(error)
        })
    },
  })

  return { issues, isLoading: isFetching }
}
