import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { Project } from '../../models/Project'
import { Team } from '../../models/Team'

type IssueTabParamList = {
  ActiveIssues: { teamId: Team['id']; projectId?: Project['id'] }
  IssueBacklog: { teamId: Team['id']; projectId?: Project['id'] }
}

export default IssueTabParamList

export type IssueTabScreenName = keyof IssueTabParamList

export type IssueTabScreenProps<TScreen extends IssueTabScreenName> = NativeStackScreenProps<IssueTabParamList, TScreen>

export const useIssueTabNavigation = () => useNavigation<NativeStackNavigationProp<IssueTabParamList>>()
