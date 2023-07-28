import { faBell, faFile, faFileClipboard, faFolder } from '@fortawesome/free-regular-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useState } from 'react'
import { View } from 'react-native'
import {
  dashboardTabName,
  homeTabName,
  issuesTabName,
  notificationsTabName,
  projectsTabName,
} from '../../constants/AppText'
import useAuth from '../../hooks/useAuth'
import { RootScreenProps, useRootNavigation } from '../../navigation/models/RootParamList'
import TabParamList from '../../navigation/models/TabParamList'
import DashboardView from '../dashboard/DashboardView'
import HomeView from '../home/HomeView'
import IssuesView from '../issues/IssuesView'
import NotificationsView from '../notifications/NotificationsView'
import ProjectsView from '../projects/ProjectsView'
import PlusButton from './components/PlusButton'

type Props = RootScreenProps<'Home'>

const Tab = createBottomTabNavigator<TabParamList>()

export default function MainTabScreen() {
  const { defaultTeamId } = useAuth()
  const [currentTeamId, setCurrentTeamId] = useState(defaultTeamId)
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeContent}
        options={{
          title: homeTabName,
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesomeIcon icon={faHome} size={size * 0.9} color={color} />
          },
        }}
      />
      <Tab.Screen
        name="ProjectsTab"
        component={ProjectsContent}
        options={{
          title: projectsTabName,
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesomeIcon icon={faFolder} size={size * 0.9} color={color} />
          },
          headerRight: () => (
            <PlusButton
              className="pr-4"
              onPress={() => {
                // TODO:
                // change
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="IssuesTab"
        component={IssuesView}
        options={{
          title: issuesTabName,
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesomeIcon icon={faFile} size={size * 0.9} color={color} />
          },
          headerRight: () => (
            <View className="flex flex-row">
              <PlusButton
                className="pr-4"
                onPress={() => {
                  // TODO:
                }}
              />
              <PlusButton
                className="pr-4"
                onPress={() => {
                  // TODO:
                }}
              />
            </View>
          ),
        }}
        initialParams={{ teamId: currentTeamId }}
      />
      <Tab.Screen
        name="DashboardTab"
        component={DashboardContent}
        options={{
          title: dashboardTabName,
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesomeIcon icon={faFileClipboard} size={size * 0.9} color={color} />
          },
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsContent}
        options={{
          title: notificationsTabName,
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesomeIcon icon={faBell} size={size * 0.9} color={color} />
          },
        }}
      />
    </Tab.Navigator>
  )
}

const HomeContent = () => {
  const navigation = useRootNavigation()
  return (
    <HomeView />
    // <LogListView
    //   onPressJournal={(journalId) => {
    //     navigation.navigate('LogEntry', { journalId: journalId })
    //   }}
    //   onPressAddJournal={() => {
    //     navigation.navigate('Journal', {})
    //   }}
    // />
  )
}

const ProjectsContent = () => {
  const navigation = useRootNavigation()
  return (
    <ProjectsView onPressProject={(projectId) => navigation.navigate('ProjectDetails', { projectId: projectId })} />
  )
}

// const IssuesContent = () => {
//   const navigation = useRootNavigation()
//   return <IssuesView />
// }

const DashboardContent = () => {
  const navigation = useRootNavigation()
  // return <MemberListView onPressMember={(memberId) => navigation.navigate('MemberDetails', { memberId: memberId })} />
  return <DashboardView />
}

const NotificationsContent = () => {
  const navigation = useRootNavigation()
  // return <MemberListView onPressMember={(memberId) => navigation.navigate('MemberDetails', { memberId: memberId })} />
  return <NotificationsView />
}
