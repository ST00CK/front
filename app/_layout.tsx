import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Make sure expo-icons is installed

const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#f8f9fa', // Customize the tab bar style
                },
                tabBarActiveTintColor: '#007bff', // Active tab color
                tabBarInactiveTintColor: '#6c757d', // Inactive tab color
            }}
        >
            {/* Index Page */}
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: 'Home', // Custom label for index tab
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />

            {/* Main Page */}
            <Tabs.Screen
                name="main"
                options={{
                    tabBarLabel: 'Main', // Custom label for main tab
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="apps-outline" size={size} color={color} />
                    ),
                }}
            />

            {/* Chat Page */}
            <Tabs.Screen
                name="chat"
                options={{
                    tabBarLabel: 'Chat', // Custom label for chat tab
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="chatbubble-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default Layout;
