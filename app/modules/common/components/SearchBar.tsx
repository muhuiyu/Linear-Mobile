import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { TextInput, View } from 'react-native'

interface Props {
  value: string
  placeholder: string
  onChangeText(value: string): void
}

export default function SearchBar({ value, placeholder, onChangeText }: Props) {
  return (
    <View className="flex flex-1 flex-row justify-center bg-gray-100 rounded-lg">
      <View className="h-10 w-10 items-center justify-center">
        <FontAwesomeIcon icon={faSearch} color="#888" size={16} />
      </View>
      <TextInput
        className="flex-1 h-10"
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}
