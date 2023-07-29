import { Project } from '@linear/sdk'
import { useQuery } from '@tanstack/react-query'
import { apiEndPoint } from '../constants/Environment'
import { ProjectSchema, projectFullQuery, projectQuery } from '../models/Project'
import { projectQueryKey } from './queryKeys'

export type UseProjectType = 'default' | 'full'

export default function useProject(token: string, projectId: Project['id'], type: UseProjectType) {
  const { data: project, isFetching } = useQuery({
    queryKey: [projectQueryKey],
    queryFn: async () => {
      let query = ''
      switch (type) {
        case 'default':
          query = `{ project(id: \"${projectId}\") { ${projectQuery} } }`
          break
        case 'full':
          query = `{ project(id: \"${projectId}\") { ${projectFullQuery} } }`
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
      return ProjectSchema.parse(data.data.project)
    },
  })

  return {
    project: project,
    isLoading: isFetching,
  }
}
