import { Text, View } from 'react-native'

interface Props {}

export default function EmptyView(props: Props) {
  return (
    <View className="justify-center items-center flex-1">
      <Text>No issue found</Text>
    </View>
  )
}
