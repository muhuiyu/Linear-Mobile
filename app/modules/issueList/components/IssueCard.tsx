import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import _ from 'lodash'
import { Image, Pressable, Text, View } from 'react-native'
import { Issue } from '../../../models/Issue'
import { renderPriorityIcon } from './IssueListRow'

interface Props {
  issue: Issue
  onPressIssue(issueId: Issue['id']): void
}

export default function IssueCard({ issue, onPressIssue }: Props) {
  const hasLabels = !_.isEmpty(issue?.labels)

  return (
    <Pressable
      className="bg-white px-1 pt-1 pb-2 shadow-sm flex flex-col gap-2 m-1"
      onPress={() => {
        onPressIssue(issue.id)
      }}
    >
      <View className="flex flex-row justify-between">
        <Text className="w-4/5">{issue.title}</Text>
        {issue?.assignee?.avatarUrl ? (
          <Image className="h-7 w-7 rounded-full mr-2" source={{ uri: issue?.assignee?.avatarUrl }} />
        ) : (
          <FontAwesomeIcon icon={faCircleUser} color="#899499" size={28} />
        )}
      </View>
      {/* labels */}
      {hasLabels ? (
        <View className="flex flex-row flex-wrap">
          {issue?.labels?.map?.((label) => (
            <View key={label.id} className="px-1.5 py-1 mr-1 rounded-sm" style={{ backgroundColor: label.color }}>
              <Text className="text-white text-xs">{label.name}</Text>
            </View>
          ))}
        </View>
      ) : null}
      <View className="flex flex-row items-center">
        <Text className="text-gray-500 text-xs mr-2">{issue.identifier}</Text>
        {renderPriorityIcon(1, 12)}
      </View>
    </Pressable>
  )
}
