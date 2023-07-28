import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { Team } from '../../models/Team'

type IssueTabParamList = {
  IssueBoard: undefined
  IssueList: { teamId: Team['id'] }
  IssueBacklog: undefined
}

export default IssueTabParamList

export type IssueTabScreenName = keyof IssueTabParamList

export type IssueTabScreenProps<TScreen extends IssueTabScreenName> = NativeStackScreenProps<IssueTabParamList, TScreen>

export const useIssueTabNavigation = () => useNavigation<NativeStackNavigationProp<IssueTabParamList>>()
