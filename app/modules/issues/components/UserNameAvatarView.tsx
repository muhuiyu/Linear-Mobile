import classNames from 'classnames'
import { Image, Text, View } from 'react-native'
import { User } from '../../../models/User'

interface Props {
  user: User
  className?: string
}

export default function UserNameAvatarView({ user, className }: Props) {
  return (
    <View className={classNames('flex flex-row gap-2 items-center', className)}>
      <Image className="h-6 w-6 rounded-full" source={{ uri: user.avatarUrl }} />
      <Text>{user.name}</Text>
    </View>
  )
}
