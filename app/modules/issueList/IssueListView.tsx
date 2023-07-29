import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import IssueTabParamList from '../../navigation/models/IssueTabParamList'
import { RootScreenProps } from '../../navigation/models/RootParamList'
import ActiveIssuesView from './ActiveIssuesView'
import IssueBacklogView from './IssueBacklogListView'

const Tab = createMaterialTopTabNavigator<IssueTabParamList>()

type Props = RootScreenProps<'IssueList'>

export default function IssueListView(props: Props) {
  return (
    <Tab.Navigator screenOptions={{ swipeEnabled: false }}>
      <Tab.Screen
        name="ActiveIssues"
        component={ActiveIssuesView}
        options={{ title: 'Active' }}
        initialParams={{ teamId: props.route.params.teamId, projectId: props.route.params.projectId }}
      />
      <Tab.Screen
        name="IssueBacklog"
        component={IssueBacklogView}
        options={{ title: 'Backlog' }}
        initialParams={{ teamId: props.route.params.teamId, projectId: props.route.params.projectId }}
      />
    </Tab.Navigator>
  )
}
