import { View, Text, Button} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const ChatListPage = () => {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/chatAddPage');
    };

  return (
    <View>
      <Text>ChatListPage</Text>
      <Button title="Go to ChatAdd" onPress={handleLogin} />
    </View>
  )
}

export default ChatListPage