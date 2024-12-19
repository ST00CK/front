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
                name="index"
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="(tabs)/friendListPage/index"
                options={{
                    tabBarLabel: '메인',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="apps-outline" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="(tabs)/chatAddPage/index"
                options={{
                    tabBarLabel: '채팅',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="chatbubble-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default Layout;
