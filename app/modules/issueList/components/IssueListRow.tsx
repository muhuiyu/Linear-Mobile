import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faAngleDown, faAngleUp, faAnglesUp, faGripLines, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Pressable, Text, View } from 'react-native'
import { Issue } from '../../../models/Issue'

interface Props {
  issue: Issue
  onPressIssue(issueId: Issue['id']): void
}

export default function IssueListRow({ issue, onPressIssue }: Props) {
  return (
    <Pressable
      key={issue.id}
      className="flex flex-row items-center gap-4"
      onPress={() => {
        onPressIssue(issue.id)
      }}
    >
      {/* <View className="h-10 w-10 justify-center rounded-lg">
          <FontAwesomeIcon icon={faMusic} color={issue.color} size={24} />
        </View> */}
      <View className="flex-1 flex flex-row border-b border-gray-300 justify-between items-center px-4">
        <View className="py-3">
          <Text className="text-sm font-semibold text-black leading-4 mb-2">{issue.title}</Text>
          {/* <Text className="text-sm text-gray-400">{project.id}</Text> */}
          <View className="flex flex-row items-center">
            <Text className="text-xs text-gray-400 mr-2">{issue.identifier}</Text>
            {/* <Text className="text-xs text-gray-400">{issue.priorityLabel}</Text> */}
            {renderPriorityIcon(issue.priority, 12)}
          </View>
        </View>
        {/* <Pressable className="p-2">
            <FontAwesomeIcon icon={faStar} size={16} />
          </Pressable> */}
      </View>
    </Pressable>
  )
}
export const renderPriorityIcon = (priority: number, size: number) => {
  let icon = faCircle

  switch (priority) {
    case 0:
      icon = faMinus
      break
    case 1:
      icon = faAnglesUp
      break
    case 2:
      icon = faAngleUp
      break
    case 3:
      icon = faGripLines
      // icon = faAngleDown
      break
    case 4:
      icon = faAngleDown
      // icon = faAnglesDown
      break
    default:
      break
  }

  return <FontAwesomeIcon icon={icon} color="#808080" size={size} />
}
