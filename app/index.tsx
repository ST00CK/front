import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

const LoginPage = () => {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/main');
    };

    return (
        <View>
            <Text>Login Page</Text>
            <Button title="Go to Main" onPress={handleLogin} />
        </View>
    );
};

export default LoginPage;