import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Pressable, PressableProps } from 'react-native'

interface Props extends Omit<PressableProps, 'children'> {}

export default function PlusButton(props: Props) {
  return (
    <Pressable {...props}>
      <FontAwesomeIcon icon={faPlus} size={20} />
    </Pressable>
  )
}
