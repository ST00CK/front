import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatListPage from './ChatListPage';
import ChatRoomPage from './ChatRoomPage';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ChatListPage">
                <Stack.Screen name="ChatListPage" component={ChatListPage} />
                <Stack.Screen name="ChatRoomPage" component={ChatRoomPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;