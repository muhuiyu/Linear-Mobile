import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { Issue } from '../../models/Issue'
import { Project } from '../../models/Project'

type RootParamList = {
  //   Journal: { journalId?: Journal['id'] }
  Home: undefined
  Projects: undefined
  ProjectDetails: { projectId: Project['id'] }

  Issues: undefined
  // IssueList: {
  //   projectId?: Project['id']
  //   issues: Issue[]
  //   groupedBy: IssueGroupedBy
  //   onPressIssue(projectId: Issue['id']): void
  // }
  IssueDetails: { issueId: Issue['id'] }

  // TicketDetails: { ticketId: Ticket['id'] }
  Dashboard: undefined
  Notification: undefined

  // sign in
  Login: undefined
}

export default RootParamList

export type RootScreenName = keyof RootParamList

export type RootScreenProps<TScreen extends RootScreenName> = NativeStackScreenProps<RootParamList, TScreen>

export const useRootNavigation = () => useNavigation<NativeStackNavigationProp<RootParamList>>()
