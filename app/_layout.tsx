import { Stack } from 'expo-router';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// QueryClient 생성
const queryClient = new QueryClient();

const Layout = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Stack
                initialRouteName="LoginPage"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="LoginPage" />
                <Stack.Screen name="SignUpPage" />
                <Stack.Screen name="ChatAddPage" />
                <Stack.Screen name="ChatRoomPage" />
                <Stack.Screen name="MyPage" />
                <Stack.Screen name="SettingPage" />
                <Stack.Screen name="index" />
            </Stack>
        </QueryClientProvider>
    );
};

export default Layout;