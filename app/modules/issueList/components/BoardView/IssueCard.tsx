import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import _ from 'lodash'
import { Image, Pressable, Text, View } from 'react-native'
import { Issue } from '../../../../models/Issue'
import { IssueGroupedBy } from '../../ActiveIssuesView'
import IssueLabelChipView from '../IssueLabelChipView'
import { renderPriorityIcon } from '../ListView/IssueListRow'
import IssueDueDateChipView from './IssueDueDateChipView'
import IssueProjectChipView from './IssueProjectChipView'
import IssueStatusChipView from './IssueStatusChipView'

interface Props {
  groupedBy: IssueGroupedBy
  issue: Issue
  onPressIssue(issueId: Issue['id']): void
}

export default function IssueCard({ issue, groupedBy, onPressIssue }: Props) {
  const hasLabels = !_.isEmpty(issue?.labels)

  return (
    <Pressable
      className="bg-white px-1 pt-1 pb-2 shadow-sm flex flex-col gap-2 m-1"
      onPress={() => {
        onPressIssue(issue.id)
      }}
    >
      <View className="flex flex-row justify-between">
        <View className="w-4/5">
          <Text className="font-medium">{issue.title}</Text>
          <View className="flex flex-row flex-wrap mt-2">
            {groupedBy !== 'project' && <IssueProjectChipView project={issue.project} />}
            {issue.dueDate && <IssueDueDateChipView dueDate={issue.dueDate} />}
            {groupedBy !== 'label' &&
              hasLabels &&
              issue?.labels?.map?.((label) => <IssueLabelChipView key={label.id} {...{ label }} />)}
            {groupedBy !== 'status' && <IssueStatusChipView state={issue.state} />}
          </View>
          <View className="flex flex-row items-center mt-2">
            <Text className="text-gray-500 text-xs mr-2">{issue.identifier}</Text>
            {renderPriorityIcon(1, 12)}
          </View>
        </View>

        {issue?.assignee?.avatarUrl ? (
          <Image className="h-7 w-7 rounded-full mr-2" source={{ uri: issue?.assignee?.avatarUrl }} />
        ) : (
          <FontAwesomeIcon icon={faCircleUser} color="#899499" size={28} />
        )}
      </View>
    </Pressable>
  )
}
