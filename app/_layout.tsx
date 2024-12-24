import { Tabs } from 'expo-router';
import React from 'react';

const Layout = () => {

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#f8f9fa',
                },
                tabBarActiveTintColor: '#007bff',
                tabBarInactiveTintColor: '#6c757d',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarStyle: { display: 'none'},
                    headerShown: false,
                    // tabBarButton: () => null,
                    // tabBarItemStyle: { flex: 0 },
                }}
            />
            <Tabs.Screen
                name="FriendListPage"
                options={{
                    tabBarLabel: 'Main',
                    headerShown: false,
                    tabBarItemStyle: { flex: 1 },
                }}
            />
            <Tabs.Screen
                name="ChatListPage"
                options={{
                    tabBarLabel: 'Chat',
                    headerShown: false,
                    tabBarItemStyle: { flex: 1 },
                }}
            />
            <Tabs.Screen
                name="ChatAddPage"
                options={{
                    headerShown: false,
                    tabBarButton: () => null,
                    tabBarItemStyle: { flex: 0 },
                }}
            />
            <Tabs.Screen
                name="ChatRoomPage"
                options={{
                    headerShown: false,
                    tabBarButton: () => null,
                    tabBarItemStyle: { flex: 0 },
                }}
            />
            <Tabs.Screen
                name="MyPage"
                options={{
                    headerShown: false,
                    tabBarButton: () => null,
                    tabBarItemStyle: { flex: 0 },
                }}
            />
            <Tabs.Screen
                name="SignUpPage"
                options={{
                    headerShown: false,
                    tabBarButton: () => null,
                    tabBarItemStyle: { flex: 0 },
                }}
            />
        </Tabs>
    );
};

export default Layout;