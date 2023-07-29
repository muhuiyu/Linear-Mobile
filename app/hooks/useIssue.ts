import { useQuery } from '@tanstack/react-query'
import { apiEndPoint } from '../constants/Environment'
import { Issue, IssueSchema, issueFullQuery, issueQuery } from '../models/Issue'
import { issueQueryKey } from './queryKeys'

export type UseIssueType = 'full' | 'basic' | 'default'

export default function useIssue(token: string, issueId: Issue['id'], type: UseIssueType) {
  const { data: issue, isFetching } = useQuery({
    queryKey: [issueQueryKey],
    queryFn: async () => {
      let query = ''
      switch (type) {
        case 'basic':
          query = `{ issue(id: \"${issueId}\") { ${issueQuery} } }`
          break
        case 'default':
          query = `{ issue(id: \"${issueId}\") { ${issueQuery} } }`
          break
        case 'full':
          query = `{ issue(id: \"${issueId}\") { ${issueFullQuery} } }`
          break
      }

      const response = await fetch(apiEndPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()
      return IssueSchema.parse(data.data.issue)
    },
  })

  return {
    issue,
    isLoading: isFetching,
  }
}
