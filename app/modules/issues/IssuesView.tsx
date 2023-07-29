import { faBars, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Pressable, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRootNavigation } from '../../navigation/models/RootParamList'
import { TabScreenProps } from '../../navigation/models/TabParamList'
import SearchBar from '../common/components/SearchBar'
import { safeAreaStyle } from '../common/styles/pageStyle'

type Props = TabScreenProps<'IssuesTab'>

// The one on tab bar
export default function IssuesView(props: Props) {
  const navigation = useRootNavigation()

  const renderItem = ({ item }: { item: { title: string } }) => {
    return (
      <Pressable
        key={item.title}
        className="flex flex-row items-center"
        onPress={() => {
          // TODO:
          navigation.navigate('IssueList', { teamId: props.route.params.teamId })
        }}
      >
        <View className="h-10 w-10 justify-center rounded-lg bg-gray-50 items-center">
          <FontAwesomeIcon icon={faBars} size={24} />
        </View>
        <View className="flex-1 flex flex-row border-b ml-2 border-gray-300 justify-between items-center">
          <View className="py-3">
            <Text className="text-base font-semibold text-black">{item.title}</Text>
          </View>
          <Pressable className="p-2">
            <FontAwesomeIcon icon={faStar} size={16} />
          </Pressable>
        </View>
      </Pressable>
    )
  }

  return (
    <SafeAreaView className={safeAreaStyle} edges={['left', 'right', 'bottom']}>
      <View className="h-full">
        <>
          <View className="flex flex-row p-4 items-center">
            <SearchBar
              value={''}
              placeholder="Search issues"
              onChangeText={() => {
                // TODO:
              }}
            />
          </View>
          <FlatList
            className="bg-white px-4"
            data={options}
            keyExtractor={(item) => item.title}
            renderItem={renderItem}
          />
        </>
      </View>
    </SafeAreaView>
  )
}

const options = [
  {
    title: 'My issues',
  },
]
