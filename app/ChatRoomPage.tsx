import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Chat from '../components/stoock/ChatRoom/Chat';

const ChatRoomPage = () => {
    const messages = [
        {
            id: 1,
            profileImage: 'https://via.placeholder.com/40',
            name: 'Ryan Reynolds',
            message: 'Hello!',
            time: '10:00 AM',
        },
        {
            id: 2,
            profileImage: 'https://via.placeholder.com/40',
            name: 'Chris Evans',
            message: 'Hi there!',
            time: '10:01 AM',
        },
        {
            id: 3,
            profileImage: 'https://via.placeholder.com/40',
            name: 'Scarlett Johansson',
            message: 'Good morning!',
            time: '10:02 AM',
        },
        {
            id: 4,
            profileImage: 'https://via.placeholder.com/40',
            name: 'Robert Downey Jr.',
            message: 'How are you?',
            time: '10:03 AM',
        },
    ];

    return (
        <ScrollView style={styles.container}>
            {messages.map((msg) => (
                <Chat
                    key={msg.id}
                    profileImage={msg.profileImage}
                    name={msg.name}
                    message={msg.message}
                    time={msg.time}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default ChatRoomPage;