import React, { useState, useRef } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Text, TextInput, Animated } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Chat from '../components/stoock/ChatRoom/Chat';
import ChatInput from '../components/stoock/ChatRoom/ChatInput';
import SearchIcon from '../components/stoock/Common/SearchIcon';
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
            message: 'How are you?',
            time: '10:02 AM',
        },
        {
            id: 4,
            profileImage: 'https://via.placeholder.com/40',
            name: 'Robert Downey Jr.',
            message: 'Good morning!',
            time: '10:03 AM',
        },
    ]);
    const [filteredMessages, setFilteredMessages] = useState(messages);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const slideAnim = useRef(new Animated.Value(0)).current;

    const handleShowInput = () => {
        setShowInput(prevShowInput => !prevShowInput);
        Animated.timing(slideAnim, {
            toValue: showInput ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleInputChange = (text: string) => {
        setInputValue(text);
        const filtered = messages.filter(msg =>
            msg.name.toLowerCase().includes(text.toLowerCase()) ||
            msg.message.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredMessages(filtered);
    };

    const handleSend = (message: string) => {
        const newMessage = {
            id: messages.length + 1,
            profileImage: 'https://via.placeholder.com/40',
            name: 'You',
            message: message,
            time: new Date().toLocaleTimeString(),
        };
        setMessages([...messages, newMessage]);
        setFilteredMessages([...messages, newMessage]);
    };

    const slideDown = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 0],
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                {!showInput ? (
                    <>
                        <Text style={styles.chatRoomName}>{name}</Text>
                        <SearchIcon onPress={handleShowInput} />
                    </>
                ) : (
                    <Animated.View style={[styles.inputContainer, { transform: [{ translateY: slideDown }] }]}>
                        <TextInput
                            style={styles.input}
                            value={inputValue}
                            onChangeText={handleInputChange}
                            placeholder="Search"
                        />
                    </Animated.View>
                )}
            </View>
            <ScrollView style={styles.messagesContainer}>
                {filteredMessages.map(msg => (
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