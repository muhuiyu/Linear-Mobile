import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Text, View } from 'react-native'
import { IssueLabel } from '../../../models/IssueLabel'
import { Project, linearIconToIconDefinition } from '../../../models/Project'
import { WorkflowState, WorkflowStateType, stateIconInfo } from '../../../models/WorkFlowState'
import { IssueGroupedBy } from '../IssueListView'

// Render list header
const renderSectionHeader = (
  groupedBy: IssueGroupedBy,
  header: WorkflowState | Project | IssueLabel | number,
  length: number,
) => {
  let title = ''
  let icon: IconDefinition | null = null
  let color = ''

  switch (groupedBy) {
    case 'project':
      const project = header as Project
      title = project.name
      console.log('project icon', project.icon)
      icon = linearIconToIconDefinition[project.icon ?? ''] ?? faQuestionCircle
      color = project.color
      break
    case 'label':
      const label = header as IssueLabel
      title = label.name
      color = label.color
      break
    default:
      const state = header as WorkflowState
      let { icon: stateIcon, color: stateColor } = stateIconInfo(state.type as WorkflowStateType)
      title = state.name
      icon = stateIcon
      color = stateColor
      break
  }

  return (
    <View className="flex flex-row gap-2 bg-gray-100 px-4 pb-2 items-center">
      {icon && <FontAwesomeIcon icon={icon} color={color} />}
      <Text>{title}</Text>
      <Text className="text-xs text-gray-500">{length}</Text>
    </View>
  )
}
export default renderSectionHeader
