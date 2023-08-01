import { Text, View } from 'react-native'
import { Issue } from '../../../../models/Issue'
import { issueDetailsCardStyle, issueDetailsCardTitleStyle } from '../../styles/IssueDetailsViewStyle'
import IssueListRow from '../ListView/IssueListRow'

interface Props {
  parentIssue: Issue
  onPressIssue(issueId: Issue['id']): void
}

export default function IssueDetailsParentCard({ parentIssue, onPressIssue }: Props) {
  return (
    <View className={issueDetailsCardStyle}>
      <Text className={issueDetailsCardTitleStyle}>Parent</Text>
      <IssueListRow {...{ issue: parentIssue, onPressIssue, groupedBy: 'none' }} />
    </View>
  )
}
