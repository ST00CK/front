import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

const LoginPage = () => {
    const router = useRouter();

    return (
        <View>
            <Text>Login Page</Text>
            <Button title="Go to Main" onPress={() => router.push('/main')} />
        </View>
    );
};

export default LoginPage;