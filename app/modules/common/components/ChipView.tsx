import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import classNames from 'classnames'
import { Text, View } from 'react-native'

interface Props {
  id: string
  color: string
  name: string
  textColor?: string
  icon?: IconDefinition
  iconColor?: string
  borderColor?: string
}

export default function ChipView({ id, color, name, textColor, icon, iconColor, borderColor }: Props) {
  return (
    <View
      key={id}
      className="flex flex-row items-center px-1.5 py-1 mr-1 rounded-sm my-0.5"
      style={{ backgroundColor: color, borderColor: borderColor, borderWidth: borderColor ? 1 : 0 }}
    >
      {icon && iconColor && <FontAwesomeIcon icon={icon} size={12} color={iconColor} />}
      <Text className={classNames('text-xs', icon && 'ml-1')} style={{ color: textColor ? textColor : '#fff' }}>
        {name}
      </Text>
    </View>
  )
}
