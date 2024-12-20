import { View, Text, Button} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const FriendListPage = () => {
  const router = useRouter();
  
  const handleLogin = () => {
      router.push('/');
  };

  return (
    <View>
      <Text>FriendListPage</Text>
      <Button title="Go to MyPage" onPress={handleLogin} />
    </View>
  )
}

export default FriendListPage