import { faCircle } from '@fortawesome/free-regular-svg-icons'
import {
  faAngleDown,
  faAngleUp,
  faAnglesUp,
  faCircleUser,
  faGripLines,
  faMinus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import _ from 'lodash'
import { Image, Pressable, Text, View } from 'react-native'
import { Issue } from '../../../../models/Issue'
import { IssueGroupedBy } from '../../ActiveIssuesView'
import IssueLabelChipView from '../IssueLabelChipView'

interface Props {
  issue: Issue
  groupedBy: IssueGroupedBy
  onPressIssue(issueId: Issue['id']): void
}

export default function IssueListRow({ issue, groupedBy, onPressIssue }: Props) {
  const hasLabels = !_.isEmpty(issue?.labels)

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
      <View className="flex-1 flex flex-row  justify-between items-center px-4">
        <View className="py-3  flex-1">
          <Text className="text-sm font-semibold text-black leading-4 mb-2">{issue.title}</Text>
          {/* <Text className="text-sm text-gray-400">{project.id}</Text> */}
          {groupedBy != 'label' && hasLabels ? (
            <View className="flex flex-row flex-wrap mb-2">
              {issue?.labels?.map?.((label) => <IssueLabelChipView key={label.id} {...{ label }} />)}
            </View>
          ) : null}
          <View className="flex flex-row items-center">
            <Text className="text-xs text-gray-400 mr-2">{issue.identifier}</Text>
            {renderPriorityIcon(issue.priority, 12)}
            {issue?.assignee?.avatarUrl ? (
              <Image className="h-4 w-4 rounded-full ml-2" source={{ uri: issue?.assignee?.avatarUrl }} />
            ) : (
              <FontAwesomeIcon icon={faCircleUser} color="#899499" size={16} />
            )}
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
  let color = '#fff'

  switch (priority) {
    case 0:
      icon = faMinus
      color = '#bbb'
      break
    case 1:
      icon = faAnglesUp
      color = '#FF3333'
      break
    case 2:
      icon = faAngleUp
      color = '#FF6033'
      break
    case 3:
      icon = faGripLines
      color = '#F4BB44'
      // icon = faAngleDown
      break
    case 4:
      icon = faAngleDown
      color = '#2F83F6'
      // icon = faAnglesDown
      break
    default:
      break
  }

  return <FontAwesomeIcon icon={icon} color={color} size={size} />
}
