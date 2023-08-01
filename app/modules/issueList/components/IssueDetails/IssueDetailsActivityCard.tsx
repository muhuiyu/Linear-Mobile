import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import _ from 'lodash'
import { Image, Pressable, Text, View } from 'react-native'
import { Issue } from '../../../../models/Issue'
import { issueDetailsCardStyle, issueDetailsCardTitleStyle } from '../../styles/IssueDetailsViewStyle'

interface Props {
  issue: Issue
  onPressShowButton(): void
}

export default function IssueDetailsActivityCard({ issue, onPressShowButton }: Props) {
  return (
    <View className={issueDetailsCardStyle}>
      {/* activity header */}
      <View className="flex flex-row justify-between w-full items-center mb-4">
        <Text className={issueDetailsCardTitleStyle}>Activity</Text>
        <Pressable className="flex flex-row gap-1 items-center" onPress={onPressShowButton}>
          <Text className="text-blue-600 font-medium">Show comment</Text>
          <FontAwesomeIcon icon={faCaretDown} color="#3182ce" size={12} />
        </Pressable>
      </View>
      {/* body */}
      {/* TODO: change to activities */}
      {!_.isEmpty(issue?.comments) &&
        issue?.comments?.map((comment) => {
          return (
            <View key={comment.id} className="flex flex-row items-start gap-3 pb-3">
              <Image className="h-8 w-8 rounded-full" source={{ uri: comment.user.avatarUrl }} />
              <View>
                <View className="flex flex-row items-center gap-2 pb-1">
                  <Text className="text-sm font-medium">{comment.user.name}</Text>
                  <Text className="text-xs text-gray-500">{comment.createdAt.toLocaleString()}</Text>
                </View>
                <Text>{comment.bodyData}</Text>
              </View>
            </View>
          )
        })}
    </View>
  )
}
