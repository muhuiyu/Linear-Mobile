import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import IssueTabParamList from '../../navigation/models/IssueTabParamList'
import { TabScreenProps } from '../../navigation/models/TabParamList'
import ActiveIssuesView from './ActiveIssuesView'
import IssueBacklogView from './IssueBacklogListView'

const Tab = createMaterialTopTabNavigator<IssueTabParamList>()

type Props = TabScreenProps<'IssuesTab'>

export default function IssuesView(props: Props) {
  return (
    <Tab.Navigator screenOptions={{ swipeEnabled: false }}>
      <Tab.Screen
        name="ActiveIssues"
        component={ActiveIssuesView}
        options={{ title: 'Active' }}
        initialParams={{ teamId: props.route.params.teamId }}
      />
      <Tab.Screen
        name="IssueBacklog"
        component={IssueBacklogView}
        options={{ title: 'Backlog' }}
        initialParams={{ teamId: props.route.params.teamId }}
      />
    </Tab.Navigator>
  )
}
