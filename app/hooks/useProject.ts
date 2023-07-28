import { Project } from '@linear/sdk'
import { useQuery } from '@tanstack/react-query'
import { projectQueryKey } from './queryKeys'

export default function useProject(projectId: Project['id']) {
  const { data: project, isFetching } = useQuery({
    queryKey: [projectQueryKey],
    queryFn: async () => {
      if (!linearClient) {
        return null
      }
      return await linearClient.project(projectId)
    },
  })

  return {
    project: project,
    isLoading: isFetching,
  }
}
