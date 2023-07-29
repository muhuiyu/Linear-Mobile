import { useQuery } from '@tanstack/react-query'
import { apiEndPoint } from '../constants/Environment'
import { teamsQueryKey } from './queryKeys'

export default function useAllTeams(token: string) {
  const { data: teams, isFetching } = useQuery({
    queryKey: [teamsQueryKey],
    queryFn: async () => {
      const query = `{ teams { nodes { id name } } }`

      const response = await fetch(apiEndPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()
      return data.data.teams.nodes
    },
  })

  return {
    teams,
    isLoading: isFetching,
  }
}
