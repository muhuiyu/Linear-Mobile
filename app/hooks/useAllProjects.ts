import { Project } from '@linear/sdk'
import { useQuery } from '@tanstack/react-query'
import { apiEndPoint } from '../constants/Environment'
import { projectQuery } from '../models/Project'
import { projectsQueryKey } from './queryKeys'

const query = `{ teams { nodes { projects { nodes { ${projectQuery} } } } } }`

export default function useAllProjects(token: string) {
  const { data: projects, isFetching } = useQuery({
    queryKey: [projectsQueryKey],
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
          let teams = data.data.teams.nodes

          let allProjects: Project[] = []
          teams.map((team: any) => {
            let projects = team.projects.nodes.map((node: any) => node as Project)
            Array.prototype.push.apply(allProjects, projects)
          })

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
