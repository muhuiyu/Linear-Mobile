import { useState } from 'react'
import { Button, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-svg'
import useAuth from '../../hooks/useAuth'
import { safeAreaStyle } from '../common/styles/pageStyle'

interface Props {}

export default function LoginView(props: Props) {
  const [token, setToken] = useState('')
  const { signIn } = useAuth()

  const handleTextChange = (inputText: string) => {
    setToken(inputText)
  }

  const handleButtonClick = () => {
    setToken('')
    signIn(token)
  }

  return (
    <SafeAreaView className={safeAreaStyle} edges={['left', 'right', 'bottom']}>
      <View className="p-4 h-full">
        <Text>Enter personal token</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={handleTextChange}
          value={token}
        />
        <Button title="Login" onPress={handleButtonClick}></Button>
      </View>
    </SafeAreaView>
  )
}
