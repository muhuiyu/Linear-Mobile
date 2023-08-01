import { IconDefinition, faCircle } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle, faCircleHalfStroke, faSpinner, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { z } from 'zod'

export type WorkflowStateType = 'backlog' | 'started' | 'unstarted' | 'completed' | 'canceled'
// export const workFlowStateOrders: Record<WorkflowStateType, number> = {
//   backlog: 0,
//   unstarted: 1,
//   started: 2,
//   completed: 3,
// }

export interface WorkflowState {
  id: string
  /** The state's UI color as a HEX string. */
  color: string
  /** The state's name. */
  name: string
  /** The position of the state in the team flow. */
  position: number
  /** The type of the state. */
  type: WorkflowStateType
}

export const workflowStateQuery = 'id name position type color'

export const WorkflowStateSchema = z.object({
  id: z.string(),
  color: z.string(),
  name: z.string(),
  position: z.number(),
  type: z.string().transform((value) => value as WorkflowStateType),
})

export const stateIconInfo = (state: WorkflowState): { icon: IconDefinition; color: string } => {
  let icon = faSpinner

  switch (state.type) {
    case 'unstarted':
      icon = faCircle
      break
    case 'started':
      icon = faCircleHalfStroke
      break
    case 'completed':
      icon = faCheckCircle
      break
    case 'canceled':
      icon = faXmarkCircle
      break
  }

  return { icon: icon, color: state.color }
}
