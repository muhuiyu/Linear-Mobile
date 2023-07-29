import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { DeviceEventEmitter, Pressable, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { eventChangeCurrentTeam } from '../../constants/deviceEvents'
import useAllTeams from '../../hooks/useAllTeams'
import useAuth from '../../hooks/useAuth'
import { Team } from '../../models/Team'
import { RootScreenProps, useRootNavigation } from '../../navigation/models/RootParamList'

type Props = RootScreenProps<'ChooseTeamModal'>

export default function ChooseTeamModal(props: Props) {
  const { token } = useAuth()
  const { teams } = useAllTeams(token)
  const currentTeamId = props.route.params.currentTeamId

  // useEffect(() => {
  //   return () => {
  //     DeviceEventEmitter.removeAllListeners(eventChangeCurrentTeam)
  //   }
  // }, [])

  const navigation = useRootNavigation()

  const renderTeamItem = ({ item }: { item: Team }) => {
    return (
      <Pressable
        className="flex flex-row bg-white px-5 py-3 justify-between items-center"
        onPress={() => {
          DeviceEventEmitter.emit(eventChangeCurrentTeam, item.id)
          navigation.goBack()
        }}
      >
        <Text className="text-base">{item.name}</Text>
        {item.id === currentTeamId && <FontAwesomeIcon icon={faCheck} />}
      </Pressable>
    )
  }

  if (!teams) {
    return null
  }
  return (
    <View>
      <FlatList data={teams} renderItem={renderTeamItem} />
    </View>
  )
}
