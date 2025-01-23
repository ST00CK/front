import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FriendListPage from './app/FriendListPage';
import ChatListPage from './app/ChatListPage';
import ChatAddPage from './app/ChatAddPage';
import ChatRoomPage from './app/ChatRoomPage';
import MyPage from './app/MyPage';
import LoginPage from './app/LoginPage';
import SignUpPage from './app/SignUpPage';

// QueryClient 생성
const queryClient = new QueryClient();

const Stack = createStackNavigator();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
                <Stack.Navigator initialRouteName="LoginPage">
                    <Stack.Screen name="FriendListPage" component={FriendListPage} />
                    <Stack.Screen name="ChatListPage" component={ChatListPage} />
                    <Stack.Screen name="ChatAddPage" component={ChatAddPage} />
                    <Stack.Screen name="ChatRoomPage" component={ChatRoomPage} />
                    <Stack.Screen name="MyPage" component={MyPage} />
                    <Stack.Screen name="LoginPage" component={LoginPage} />
                    <Stack.Screen name="SignUpPage" component={SignUpPage} />
                </Stack.Navigator>
        </QueryClientProvider>
    );
};

export default App;