import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Pressable, Text, View } from 'react-native'
import { linearIconToIconDefinition } from '../../../../helpers/iconHelpers'
import { priorityNumberToString } from '../../../../models/Issue'
import { IssueLabel } from '../../../../models/IssueLabel'
import { Project } from '../../../../models/Project'
import { WorkflowState, stateIconInfo } from '../../../../models/WorkFlowState'
import { IssueGroupedBy } from '../../ActiveIssuesView'

// Render list header
const renderSectionHeader = (
  groupedBy: IssueGroupedBy,
  header: WorkflowState | Project | IssueLabel | number,
  length: number,
  onPressAdd: (groupedBy: IssueGroupedBy, header: WorkflowState | Project | IssueLabel | number) => void,
) => {
  let title = ''
  let icon: IconDefinition | null = null
  let color = ''

  switch (groupedBy) {
    case 'project':
      const project = header as Project
      title = project.name
      icon = linearIconToIconDefinition[project.icon ?? ''] ?? faQuestionCircle
      color = project.color
      break
    case 'label':
      const label = header as IssueLabel
      title = label.name
      color = label.color
      break
    case 'priority':
      const priority = header as number
      title = priorityNumberToString[priority] ?? ''
      break
    default:
      // state
      const state = header as WorkflowState
      let { icon: stateIcon, color: stateColor } = stateIconInfo(state)
      title = state.name
      icon = stateIcon
      color = stateColor
      break
  }

  return (
    <View className="flex flex-row bg-gray-100 px-4 py-2 items-center justify-between">
      <View className="flex flex-row items-center gap-2">
        {icon && <FontAwesomeIcon icon={icon} color={color} />}
        <Text>{title}</Text>
        <Text className="text-xs text-gray-500">{length}</Text>
      </View>
      <Pressable onPress={() => onPressAdd(groupedBy, header)}>
        <FontAwesomeIcon icon={faPlus} size={14} />
      </Pressable>
    </View>
  )
}
export default renderSectionHeader
