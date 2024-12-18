// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './app/pages/login/loginPage';
import ChatPage from './app/pages/chat/chatPage';
import MainPage from './app/pages/main/mainPage';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="Chat" component={ChatPage} />
                <Stack.Screen name="Main" component={MainPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
