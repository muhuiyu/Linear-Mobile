import { SafeAreaView, View } from 'react-native'
import MemberList from './components/MemberList'

interface Props {
  onPressMember(memberId: string): void
}

export default function MemberListView({ onPressMember }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4 h-full">
        <MemberList onPressMember={onPressMember}></MemberList>
      </View>
    </SafeAreaView>
  )
}
