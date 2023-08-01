import { useQuery } from '@tanstack/react-query'
import { apiEndPoint } from '../constants/Environment'
import { Team } from '../models/Team'
import { WorkflowState, WorkflowStateSchema, workflowStateQuery } from '../models/WorkFlowState'
import { teamsQueryKey } from './queryKeys'

export default function useAllWorkflowStates(token: string, teamId: Team['id']) {
  const { data: states, isFetching } = useQuery({
    queryKey: [teamsQueryKey],
    queryFn: async () => {
      const query = `{ team(id: \"${teamId}\") { states { nodes { ${workflowStateQuery} } } } }`
      const response = await fetch(apiEndPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()
      let states: WorkflowState[] = data.data.team.states.nodes.map((node: any) => WorkflowStateSchema.parse(node))
      states.sort((a, b) => a.position - b.position)
      return states
    },
  })

  return {
    states,
    isLoading: isFetching,
  }
}
