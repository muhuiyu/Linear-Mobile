import { faChevronDown, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Image, Pressable, Text, View } from 'react-native'
import { Issue } from '../../../../models/Issue'

interface Props {
  issue: Issue
  onPress(): void
}

export default function IssueDetailsHeaderView({ issue, onPress }: Props) {
  console.log('status id', issue.state.id)
  return (
    <View className="flex flex-col items-start">
      <Text className="text-xs text-gray-500">{issue.identifier}</Text>
      <View className="flex flex-row justify-between mt-2 w-full">
        <Text className="text-xl font-semibold leading-6 w-5/6">{issue.title}</Text>
        {issue.assignee?.avatarUrl ? (
          <Image className="h-9 w-9 rounded-full" source={{ uri: issue.assignee?.avatarUrl }} />
        ) : (
          <FontAwesomeIcon icon={faCircleUser} color="#899499" size={36} />
        )}
      </View>
      <Pressable className="bg-blue-600 px-3 py-1.5 rounded-sm mt-4 flex-row flex items-center" onPress={onPress}>
        <Text className="text-white font-semibold mr-4">{issue.state.name}</Text>
        <FontAwesomeIcon icon={faChevronDown} color="#fff" size={10} />
      </Pressable>
    </View>
  )
}
