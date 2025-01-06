import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Chat from '../components/stoock/ChatRoom/Chat';
import ChatInput from '../components/stoock/ChatRoom/ChatInput';

const ChatRoomPage = () => {
    const [messages, setMessages] = useState([
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
    ]);

    const handleSend = (newMessage: string) => {
        const newMessageObject = {
            id: messages.length + 1,
            profileImage: 'https://via.placeholder.com/40',
            name: 'You',
            message: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([...messages, newMessageObject]);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView style={styles.chatContainer}>
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
            <ChatInput onSend={handleSend} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatContainer: {
        flex: 1,
        padding: 10,
    },
});

export default ChatRoomPage;