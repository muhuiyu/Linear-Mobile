import { SafeAreaView, View } from 'react-native'

interface Props {}

export default function HomeView({}: Props) {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4 h-full">
        {/* <FlatList
          data={journals}
          renderItem={({ item }) => (
            <Pressable
              className="p-4 bg-white rounded-md border border-gray-100 flex-row"
              onPress={() => {
                onPressJournal(item.id)
              }}
            >
              <View>
                <Text>{formatDateToString(item.date)}</Text>
              </View>
            </Pressable>
          )}
        />
        <FloatingButton onPress={onPressAddJournal} /> */}
      </View>
    </SafeAreaView>
  )
}
