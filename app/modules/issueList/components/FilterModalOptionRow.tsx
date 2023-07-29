import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Pressable, Text } from 'react-native'

interface Props {
  title: string
  onPress(): void
  isChecked: boolean
}

export default function FilterModalOptionRow({ title, onPress, isChecked }: Props) {
  return (
    <Pressable className="flex flex-row justify-between" onPress={onPress}>
      <Text className="text-base py-2">{title}</Text>
      {isChecked && <FontAwesomeIcon icon={faCheck} />}
    </Pressable>
  )
}
