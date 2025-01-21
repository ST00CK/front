import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

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
                name="LoginPage"
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
                    tabBarLabel: '친구',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people" color="purple" size={size * 0.8} />
                    ),
                    tabBarItemStyle: { flex: 1 },
                }}
            />
            <Tabs.Screen
                name="ChatListPage"
                options={{
                    tabBarLabel: '채팅',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="chatbubbles" color="purple" size={size * 0.8} />
                    ),
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
                    tabBarStyle: { display: 'none'},
                    headerShown: false,
                    tabBarButton: () => null,
                    tabBarItemStyle: { flex: 0 },
                }}
            />
            <Tabs.Screen
                name="AppNavigator"
                options={{
                    tabBarStyle: { display: 'none'},
                    headerShown: false,
                    tabBarButton: () => null,
                    tabBarItemStyle: { flex: 0 },
                }}
            />
        </Tabs>
    );
};

export default Layout;