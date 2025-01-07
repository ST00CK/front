import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Chat from '../components/stoock/ChatRoom/Chat';
import ChatInput from '../components/stoock/ChatRoom/ChatInput';
import styles from '../styles/ChatRoomPageStyles';

type RootStackParamList = {
    ChatRoomPage: { name: string };
};

type ChatRoomPageRouteProp = RouteProp<RootStackParamList, 'ChatRoomPage'>;

const ChatRoomPage = () => {
    const route = useRoute<ChatRoomPageRouteProp>();
    const { name } = route.params;

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
            <View style={styles.header}>
                <Text style={styles.headerText}>{name}</Text>
            </View>
            <ScrollView style={styles.chatContainer}>
                {messages.map((msg) => (
                    <Chat
                        key={msg.id}
                        profileImage={msg.profileImage}
                        name={msg.name}
                        message={msg.message}
                        time={msg.time}
                        isUserMessage={msg.name === 'You'}
                    />
                ))}
            </ScrollView>
            <ChatInput onSend={handleSend} />
        </KeyboardAvoidingView>
    );
};

export default ChatRoomPage;