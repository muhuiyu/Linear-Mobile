import { Pressable, Text } from 'react-native'

interface Props {
  value: Date
  onPress(): void
}

export default function DatePickerField({ value, onPress }: Props) {
  return (
    <Pressable onPress={onPress} className=" border-gray-100 bg-gray-200 items-center justify-center px-3 py-2 rounded-md">
      <Text>{value.toDateString()}</Text>
    </Pressable>
  )
}
