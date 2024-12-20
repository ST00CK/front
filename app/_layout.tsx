import { Tabs, useRootNavigationState } from 'expo-router';
import React from 'react';

const Layout = () => {
    const state = useRootNavigationState();

    const currentRouteName = state.routes && state.routes.length > 0 
        ? state.routes[state.index]?.name 
        : null;

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#f8f9fa',
                    display: currentRouteName === 'loginPage' ? 'none' : 'flex',
                },
                tabBarActiveTintColor: '#007bff',
                tabBarInactiveTintColor: '#6c757d',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarStyle: { display: 'none' },
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="friendListPage"
                options={{
                    tabBarLabel: 'Main',
                }}
            />
            <Tabs.Screen
                name="chatListPage"
                options={{
                    tabBarLabel: 'Chat',
                }}
            />
        </Tabs>
    );
};

export default Layout;