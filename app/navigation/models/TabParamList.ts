import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { Team } from '../../models/Team'

type TabParamList = {
  HomeTab: undefined
  ProjectsTab: { teamId: Team['id'] }
  IssuesTab: { teamId: Team['id'] }
  DashboardTab: undefined
  NotificationsTab: undefined
}

export default TabParamList

export type TabScreenName = keyof TabParamList

export type TabScreenProps<TScreen extends TabScreenName> = NativeStackScreenProps<TabParamList, TScreen>

export const useTabNavigation = () => useNavigation<NativeStackNavigationProp<TabParamList>>()
