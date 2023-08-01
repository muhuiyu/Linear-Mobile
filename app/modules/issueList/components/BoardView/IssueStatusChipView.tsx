import { WorkflowState, stateIconInfo } from '../../../../models/WorkFlowState'
import ChipView from '../../../common/components/ChipView'

interface Props {
  state: WorkflowState
}

export default function IssueStatusChipView({ state }: Props) {
  return (
    <ChipView
      id={state.id}
      iconColor={state.color}
      name={state.name}
      color="#fff"
      textColor="#000"
      icon={stateIconInfo(state).icon}
      borderColor="#ddd"
    />
  )
}
