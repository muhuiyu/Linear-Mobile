import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import useAuth from './app/hooks/useAuth'
import LoginView from './app/modules/auth/LoginView'
import MainTabScreen from './app/modules/common/MainTabScreen'
import MoreButton from './app/modules/common/components/MoreButton'
import IssueDetailsView from './app/modules/issues/IssueDetailsView'
import ProjectDetailsView from './app/modules/projects/ProjectDetailsView'
import RootParamList from './app/navigation/models/RootParamList'

// query
const queryClient = new QueryClient()
const Stack = createNativeStackNavigator<RootParamList>()

export default function App() {
  const { isSignedIn } = useAuth()

  return (
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
  )
}

{
  /* <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <Stack.Screen name="Journal" component={JournalScreen} options={{ headerShown: false }} />
          </Stack.Group> */
}
