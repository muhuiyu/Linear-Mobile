import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Pressable, PressableProps } from 'react-native'

interface Props extends Omit<PressableProps, 'children'> {}

export default function EditButton(props: Props) {
  return (
    <Pressable {...props}>
      <FontAwesomeIcon icon={faEdit} size={20} />
    </Pressable>
  )
}
