import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native'
import Schedule from './components/Schedule'
import { Session } from './models/Session'

interface Props {
  onPressSession(sessionId: Session['id']): void
}

export default function ScheduleView({ onPressSession }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4 h-full">
        <StatusBar />
        <ScrollView>
          <Schedule onPressSession={onPressSession} />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
