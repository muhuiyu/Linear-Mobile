import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Pressable, Text } from 'react-native'

interface Props {
  title: string
  onPress(): void
}

export default function FilterChipButton({ title, onPress }: Props) {
  return (
    <Pressable className="px-2 py-1 rounded-xl bg-slate-300 flex flex-row" onPress={onPress}>
      <Text>{title}</Text>
      <FontAwesomeIcon icon={faCaretDown} size={14} />
    </Pressable>
  )
}
