import classNames from 'classnames'
import _ from 'lodash'
import { Pressable, Text, View } from 'react-native'
import { Issue } from '../../../../models/Issue'
import {
  issueDetailsCardContentStyle,
  issueDetailsCardStyle,
  issueDetailsCardSubtitleStyle,
  issueDetailsCardTitleStyle,
} from '../../styles/IssueDetailsViewStyle'
import { renderPriorityIcon } from '../ListView/IssueListRow'
import UserNameAvatarView from '../UserNameAvatarView'

interface Props {
  issue: Issue
  onPressLinkButton(): void
}

export default function IssueDetailsDetailsCard({ issue, onPressLinkButton }: Props) {
  const hasLabels = !_.isEmpty(issue.labels)
  return (
    <View className={issueDetailsCardStyle}>
      <Text className={issueDetailsCardTitleStyle}>Details</Text>
      {/* assignee */}
      <View className="my-1">
        <Text className={classNames(issueDetailsCardSubtitleStyle, 'my-2')}>Assignee</Text>
        {issue.assignee ? (
          <UserNameAvatarView user={issue.assignee} />
        ) : (
          <Text className={issueDetailsCardContentStyle}>None</Text>
        )}
      </View>
      {/* creator */}
      {issue.creator && (
        <View className="my-1">
          <Text className={classNames(issueDetailsCardSubtitleStyle, 'my-2')}>Creator</Text>
          <UserNameAvatarView user={issue.creator} />
        </View>
      )}
      {/* labels */}
      <View className="my-1">
        <Text className={classNames(issueDetailsCardSubtitleStyle, 'my-2')}>Labels</Text>
        {hasLabels ? (
          <View className="flex flex-row flex-wrap gap-2">
            {issue?.labels?.map?.((label) => (
              <View key={label.id} className="px-2 py-1 rounded-sm" style={{ backgroundColor: label.color }}>
                <Text className="text-white">{label.name}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text className={issueDetailsCardContentStyle}>None</Text>
          </View>
        )}
      </View>
      {/* priority */}
      <View className="my-1">
        <Text className={classNames(issueDetailsCardSubtitleStyle, 'my-2')}>Priority</Text>
        <View className="flex flex-row items-center">
          {renderPriorityIcon(issue.priority, 16)}
          <Text className="ml-2">{issue.priorityLabel}</Text>
        </View>
      </View>
      {/* url */}
      <View className="my-1">
        <Text className={classNames(issueDetailsCardSubtitleStyle, 'my-2')}>URL</Text>
        <Pressable onPress={onPressLinkButton}>
          <Text className={classNames(issueDetailsCardContentStyle, 'text-blue-600')}>Open in Linear</Text>
        </Pressable>
      </View>
    </View>
  )
}
