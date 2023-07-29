import { IconDefinition, faStar } from '@fortawesome/free-regular-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import _ from 'lodash'
import { useMemo, useState } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { linearIconToIconDefinition } from '../../helpers/iconHelpers'
import useAllProjects from '../../hooks/useAllProjects'
import useAuth from '../../hooks/useAuth'
import { Project } from '../../models/Project'
import { useRootNavigation } from '../../navigation/models/RootParamList'
import { TabScreenProps } from '../../navigation/models/TabParamList'
import SearchBar from '../common/components/SearchBar'
import { safeAreaStyle } from '../common/styles/pageStyle'

type Props = TabScreenProps<'ProjectsTab'>

export default function ProjectsView(props: Props) {
  const { token } = useAuth()
  const { projects, isLoading } = useAllProjects(token, props.route.params.teamId)

  // Search projects
  const [searchText, setSearchText] = useState('')

  const filteredProjects: Project[] = useMemo(() => {
    if (!projects) return []

    return _.isEmpty(searchText)
      ? projects
      : projects?.filter((project) => project.name.toLowerCase().includes(searchText.toLowerCase()))
  }, [projects, searchText])

  const navigation = useRootNavigation()

  const onPressProject = (projectId: Project['id']) => {
    // navigation.navigate('ProjectDetails', { projectId: projectId })
    console.log('navigate to', projectId)
    navigation.navigate('IssueList', { projectId: projectId })
  }

  const renderProjectItem = ({ item }: { item: Project }) => {
    const icon: IconDefinition = linearIconToIconDefinition[item.icon ?? ''] ?? faQuestionCircle
    console.log(item.icon)
    return (
      <Pressable
        key={item.id}
        className="flex flex-row items-center"
        onPress={() => {
          onPressProject(item.id)
        }}
      >
        <View className="h-10 w-10 justify-center rounded-lg items-center">
          <FontAwesomeIcon icon={icon} color={item.color} size={24} />
        </View>
        <View className="flex-1 flex flex-row ml-2 border-b border-gray-300 justify-between items-center">
          <View className="py-3">
            <Text className="text-base font-semibold text-black">{item.name}</Text>
            {/* <Text className="text-sm text-gray-400">TODO: add team</Text> */}
          </View>
          <Pressable className="p-2">
            <FontAwesomeIcon icon={faStar} size={16} />
          </Pressable>
        </View>
      </Pressable>
    )
  }

  // Return null if useAllProjects fails
  if (!projects) {
    return null
  }

  return (
    <SafeAreaView className={safeAreaStyle} edges={['left', 'right', 'bottom']}>
      <View className="h-full">
        {isLoading ? (
          <View className="justify-center h-full">
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <>
            <View className="flex flex-row p-4 items-center">
              <SearchBar value={searchText} placeholder="Search projects" onChangeText={setSearchText} />
            </View>
            {_.isEmpty(filteredProjects) ? (
              <View className="justify-center items-center">
                <Text>No projects found</Text>
              </View>
            ) : (
              <FlatList
                className="bg-white px-4"
                data={filteredProjects}
                keyExtractor={(item) => item.id}
                renderItem={renderProjectItem}
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

// title
// user
// add button
// searchbar
// recent projects
// all projects
