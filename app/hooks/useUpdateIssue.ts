import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { apiEndPoint } from '../constants/Environment'
import { Issue } from '../models/Issue'
import { WorkflowState } from '../models/WorkFlowState'
import { issueQueryKey, issuesQueryKey } from './queryKeys'

export default function useUpdateIssue(token: string) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ issueId, details }: { issueId: Issue['id']; details: Partial<Issue> }) => {},
    onSuccess: () => {
      queryClient.invalidateQueries([issuesQueryKey])
      queryClient.invalidateQueries([issueQueryKey])
    },
  })
  const updateStateMutation = useMutation({
    mutationFn: async ({ issueId, state }: { issueId: Issue['id']; state: WorkflowState }) => {
      const query = `{ issueUpdate(id: \"${issueId}\", input: { stateId: \"${state.id}\" }) { success } }`
      const response = await fetch(apiEndPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ mutation: query }),
      })
      console.log('query', query)
      const data = await response.json()
      console.log('result', JSON.stringify(data))
      return
    },
    onSuccess: () => {
      queryClient.invalidateQueries([issuesQueryKey])
      queryClient.invalidateQueries([issueQueryKey])
    },
  })

  const updateIssueState = useCallback(
    (issueId: Issue['id'], state: WorkflowState) => {
      updateStateMutation.mutate({ issueId, state })
    },
    [updateStateMutation],
  )

  const updateIssue = useCallback(
    (issueId: Issue['id'], details: Partial<Issue>) => {
      mutation.mutate({ issueId, details })
    },
    [mutation],
  )

  return { updateIssue, updateIssueState }
}
