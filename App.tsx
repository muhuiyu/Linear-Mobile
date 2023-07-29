import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import useAuth from './app/hooks/useAuth'
import LoginView from './app/modules/auth/LoginView'
import ChooseTeamModal from './app/modules/common/ChooseTeamModal'
import MainTabScreen from './app/modules/common/MainTabScreen'
import MoreButton from './app/modules/common/components/MoreButton'
import IssueDetailsView from './app/modules/issueList/IssueDetailsView'
import IssueListView from './app/modules/issueList/IssueListView'
import ProjectDetailsView from './app/modules/projects/ProjectDetailsView'
import RootParamList from './app/navigation/models/RootParamList'

// query
const queryClient = new QueryClient()
const Stack = createNativeStackNavigator<RootParamList>()

export default function App() {
  const { isSignedIn } = useAuth()

  return (
    <>
      <StatusBar style="auto" />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            {isSignedIn ? (
              <>
                <Stack.Group>
                  <Stack.Screen name="Home" component={MainTabScreen} options={{ headerShown: false }} />
                  <Stack.Screen
                    name="ProjectDetails"
                    component={ProjectDetailsView}
                    options={{
                      headerTitle: 'Project Details',
                      headerRight: () => (
                        <MoreButton
                          className="pr-2"
                          onPress={() => {
                            // TODO:
                          }}
                        />
                      ),
                    }}
                  />
                  <Stack.Screen
                    name="IssueDetails"
                    component={IssueDetailsView}
                    options={{
                      headerTitle: 'Issue Details',
                      headerRight: () => (
                        <MoreButton
                          className="pr-2"
                          onPress={() => {
                            // TODO:
                          }}
                        />
                      ),
                    }}
                  />
                  <Stack.Screen name="IssueList" component={IssueListView} options={{ title: 'Issues' }} />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                  <Stack.Screen name="ChooseTeamModal" component={ChooseTeamModal} options={{ title: 'Choose team' }} />
                </Stack.Group>
              </>
            ) : (
              <Stack.Group>
                <Stack.Screen name="Login" component={LoginView} options={{}} />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </>
  )
}

{
  /* <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <Stack.Screen name="Journal" component={JournalScreen} options={{ headerShown: false }} />
          </Stack.Group> */
}
