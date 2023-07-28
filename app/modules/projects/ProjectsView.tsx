import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import _ from 'lodash'
import { useMemo, useState } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAllProjects from '../../hooks/useAllProjects'
import useAuth from '../../hooks/useAuth'
import { Project } from '../../models/Project'
import SearchBar from '../common/components/SearchBar'

interface Props {
  onPressProject(projectId: Project['id']): void
}

export default function ProjectsView({ onPressProject }: Props) {
  // const { teams } = useAllTeams()
  const { token } = useAuth()
  const { projects, isLoading } = useAllProjects(token)

  // Search projects
  const [searchText, setSearchText] = useState('')

  const filteredProjects: Project[] = useMemo(() => {
    if (!projects) return []

    return _.isEmpty(searchText)
      ? projects
      : projects?.filter((project) => project.name.toLowerCase().includes(searchText.toLowerCase()))
  }, [searchText])

  const renderProjectItem = ({ item }: { item: Project }) => {
    // todo
    // const icon =

    return (
      <Pressable
        key={item.id}
        className="flex flex-row items-center gap-4"
        onPress={() => {
          onPressProject(item.id)
        }}
      >
        <View className="h-10 w-10 justify-center rounded-lg">
          <FontAwesomeIcon icon={faMusic} color={item.color} size={24} />
        </View>
        <View className="flex-1 flex flex-row border-b border-gray-300 justify-between items-center">
          <View className="py-2">
            <Text className="text-base font-semibold text-black">{item.name}</Text>
            {/* <Text className="text-sm text-gray-400">{project.id}</Text> */}
            <Text className="text-sm text-gray-400">TODO: add team</Text>
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
    <SafeAreaView className="flex-1 bg-white" edges={['left', 'right', 'bottom']}>
      <View className="p-4 h-full">
        {isLoading ? (
          <View className="justify-center h-full">
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View className="flex flex-col gap-4">
            <View className="p-4">
              <SearchBar value={searchText} onChangeText={setSearchText} />
            </View>
            <FlatList
              className="bg-white"
              data={filteredProjects}
              keyExtractor={(item) => item.id}
              renderItem={renderProjectItem}
            />
          </View>
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
