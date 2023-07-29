import { Project } from '@linear/sdk'
import { useQuery } from '@tanstack/react-query'
import { apiEndPoint } from '../constants/Environment'
import { ProjectSchema, projectQuery } from '../models/Project'
import { Team } from '../models/Team'
import { projectsQueryKey } from './queryKeys'

const query = `{ projects { nodes { ${projectQuery} } } }`

export default function useAllProjects(token: string, teamId: Team['id']) {
  const { data: projects, isFetching } = useQuery({
    queryKey: [projectsQueryKey],
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
          let allProjects: Project[] = data.data.team.projects.nodes.map((node: any) => ProjectSchema.parse(node))
          return allProjects
        })
        .catch((error) => {
          console.error('error', error)
        })
    },
  })

  return {
    projects,
    isLoading: isFetching,
  }
}

// async (accumulator: Promise<Project[]>, team: Team) => {
//           const myProjects: Project[] = await (await team.projects()).nodes
//           return _.concat(await accumulator, myProjects)
//         },
