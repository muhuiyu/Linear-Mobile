import { Image, Pressable, Text, View } from 'react-native'
import { memberData } from '../data/MemberData'

interface Props {
  onPressMember(memberId: string): void
}
export default function MemberList({ onPressMember }: Props) {
  return (
    <View>
      {memberData.map((member) => (
        <Pressable
          className="flex flex-row items-center py-2"
          onPress={() => {
            onPressMember(member.id)
          }}
        >
          <View>
            <Image source={{ uri: member.photoUrl }} style={{ width: 50, height: 50 }} />
          </View>
          <View className="px-2">
            <Text className="font-semibold text-lg">{member.name}</Text>
            <Text>{member.jobTitle}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  )
}
