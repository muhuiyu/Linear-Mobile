import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import IssueBacklogView from './IssueBacklogListView'
import IssueBoardView from './IssueBoardView'
import IssueListView from './IssueListView'

const Tab = createMaterialTopTabNavigator()

interface Props {}

export default function IssuesView({}: Props) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="IssueBoard" component={IssueBoardView} options={{ title: 'board' }} />
      <Tab.Screen name="IssueList" component={IssueListView} options={{ title: 'list' }} />
      <Tab.Screen name="IssueBacklog" component={IssueBacklogView} options={{ title: 'backlog' }} />
    </Tab.Navigator>
  )
}
