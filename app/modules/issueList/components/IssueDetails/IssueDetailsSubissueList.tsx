import { Text, View } from 'react-native'
import { Issue } from '../../../../models/Issue'
import { issueDetailsCardStyle, issueDetailsCardTitleStyle } from '../../styles/IssueDetailsViewStyle'
import IssueListRow from '../ListView/IssueListRow'

interface Props {
  issue: Issue
  onPressIssue(issueId: Issue['id']): void
}

export default function IssueDetailsSubissueList({ issue, onPressIssue }: Props) {
  return (
    <View className={issueDetailsCardStyle}>
      <Text className={issueDetailsCardTitleStyle}>Sub-issues</Text>
      {issue.children?.map((issue) => (
        <IssueListRow key={issue.id} {...{ issue: issue, onPressIssue, groupedBy: 'none' }} />
      ))}
    </View>
  )
}
