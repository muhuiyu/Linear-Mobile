import classNames from 'classnames'
import { Text, View } from 'react-native'
import {
  issueDetailsCardContentStyle,
  issueDetailsCardPlaceholderStyle,
  issueDetailsCardStyle,
  issueDetailsCardTitleStyle,
} from '../../styles/IssueDetailsViewStyle'

interface Props {
  description: string | undefined
  isPlaceholder: boolean
}

export default function IssueDetailsDescriptionCard({ description, isPlaceholder }: Props) {
  return (
    <View className={issueDetailsCardStyle}>
      <Text className={issueDetailsCardTitleStyle}>Description</Text>
      <Text
        className={classNames(isPlaceholder ? issueDetailsCardContentStyle : issueDetailsCardPlaceholderStyle, 'mt-2')}
      >
        {description}
      </Text>
    </View>
  )
}
