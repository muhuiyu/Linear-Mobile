import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import IssueTabParamList from '../../navigation/models/IssueTabParamList'
import { TabScreenProps } from '../../navigation/models/TabParamList'
import IssueBacklogView from './IssueBacklogListView'
import IssueBoardView from './IssueBoardView'
import IssueListView from './IssueListView'

const Tab = createMaterialTopTabNavigator<IssueTabParamList>()

type Props = TabScreenProps<'IssuesTab'>

export default function IssuesView(props: Props) {
  return (
    <Tab.Navigator screenOptions={{ swipeEnabled: false }}>
      <Tab.Screen name="IssueBoard" component={IssueBoardView} options={{ title: 'board' }} />
      <Tab.Screen
        name="IssueList"
        component={IssueListView}
        options={{ title: 'list' }}
        initialParams={{ teamId: props.route.params.teamId }}
      />
      <Tab.Screen name="IssueBacklog" component={IssueBacklogView} options={{ title: 'backlog' }} />
    </Tab.Navigator>
  )
}
