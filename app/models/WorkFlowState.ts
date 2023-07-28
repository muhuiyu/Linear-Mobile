import { IconDefinition, faCircle } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle, faCircleHalfStroke, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { z } from 'zod'

export type WorkflowStateType = 'backlog' | 'started' | 'unstarted' | 'completed'
export const allWorkflowStateTypes: WorkflowStateType[] = ['backlog', 'unstarted', 'started', 'completed']
// export const workFlowStateOrders: Record<WorkflowStateType, number> = {
//   backlog: 0,
//   unstarted: 1,
//   started: 2,
//   completed: 3,
// }
export const workflowStateTypeToName: Record<WorkflowStateType, string> = {
  backlog: 'Backlog',
  unstarted: 'Todo',
  started: 'In progress',
  completed: 'Done',
}

export interface WorkflowState {
  id: string
  /** The state's name. */
  name: string
  /** The position of the state in the team flow. */
  position: number
  /** The type of the state. */
  type: WorkflowStateType
}

export const workflowStateQuery = 'id name position type'

export const WorkflowStateSchema = z.object({
  id: z.string(),
  name: z.string(),
  position: z.number(),
  type: z.string().transform((value) => value as WorkflowStateType),
})

export const stateIconInfo = (type: WorkflowStateType): { icon: IconDefinition; color: string } => {
  let icon = faSpinner
  let color = '#000'

  switch (type) {
    case 'unstarted':
      icon = faCircle
      break
    case 'started':
      icon = faCircleHalfStroke
      color = '#FAD02C'
      break
    case 'completed':
      icon = faCheckCircle
      color = '#0A7029'
      break
  }
  return { icon: icon, color: color }
}
