import { Project } from '@linear/sdk'
import { useQuery } from '@tanstack/react-query'
import { issuesQueryKey } from './queryKeys'
import { linearClient } from './useAuth'

export default function useFilteredIssues(projectId: Project['id']) {
  const { data: issues, isFetching } = useQuery({
    queryKey: [issuesQueryKey, projectId],
    queryFn: async () => {
      if (!linearClient) {
        return []
      }
      let project = await linearClient.project(projectId)
      if (!project) {
        return []
      }
      let issues = await project.issues()
      return issues.nodes
    },
  })

  return {
    issues,
    isLoading: isFetching,
  }
}
