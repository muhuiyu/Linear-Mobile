import { ActivityIndicator, View } from 'react-native'

interface Props {}

export default function LoadingSpinner(props: Props) {
  return (
    <View className="justify-center h-full">
      <ActivityIndicator size="large" />
    </View>
  )
}
