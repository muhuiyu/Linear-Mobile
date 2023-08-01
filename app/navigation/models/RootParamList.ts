import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { Issue } from '../../models/Issue'
import { Project } from '../../models/Project'
import { Team } from '../../models/Team'

type RootParamList = {
  ChooseTeamModal: { currentTeamId: Team['id'] }

  Home: undefined
  Projects: undefined
  ProjectDetails: { projectId: Project['id'] }

  Issues: undefined
  IssueList: { teamId?: Team['id']; projectId?: Project['id'] }
  IssueDetails: { teamId: Team['id']; issueId: Issue['id'] }

  Dashboard: undefined

  Notification: undefined

  // sign in
  Login: undefined
}

export default RootParamList

export type RootScreenName = keyof RootParamList

export type RootScreenProps<TScreen extends RootScreenName> = NativeStackScreenProps<RootParamList, TScreen>

export const useRootNavigation = () => useNavigation<NativeStackNavigationProp<RootParamList>>()
