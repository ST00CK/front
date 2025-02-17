import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Animated, ScrollView } from 'react-native';
import ChatRoom from '../components/stoock/ChatList/ChatRoom';
import ChatLogo from '../components/stoock/ChatList/ChatLogo';
import SearchIcon from '../components/stoock/Common/SearchIcon';
import BottomTab from '../components/stoock/Common/BottomTab';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from '../styles/ChatListPageStyles';
import { useChatRoomListMutation } from '@/query/chatQuery';
import { useUserStore } from '@/store/useUserStore';
const chatRoomListMutation = useChatRoomListMutation;

type RootStackParamList = {
    ChatListPage: undefined;
    ChatAddPage: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;

const ChatListPage = () => {
    const navigation = useNavigation<NavigationProps>();
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const { user } = useUserStore();
    const chatRoomListMutation = useChatRoomListMutation();
    const [messages, setMessages] = useState([
        { id: 1, name: 'Ryan Reynolds', message: 'Hi', time: '10:00 AM', imageUrl: 'https://placehold.co/50' },
        { id: 2, name: 'Chris Evans', message: 'Hi', time: '10:01 AM', imageUrl: 'https://placehold.co/50' },
        { id: 3, name: 'Scarlett Johansson', message: 'Hi', time: '10:02 AM', imageUrl: 'https://placehold.co/50' },
        { id: 4, name: 'Robert Downey Jr.', message: 'Hi', time: '10:03 AM', imageUrl: 'https://placehold.co/50' },
    ]);
    const [filteredMessages, setFilteredMessages] = useState(messages);
    const slideAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fetchChatList = async () => {
          if (!user?.userId) return;
        
          try {
            const response = await chatRoomListMutation.mutateAsync(user.userId);
            console.log('Chat list response:', response);
          } catch (error) {
            console.error('Error fetching chat list:', error);
          }
        };
      
        fetchChatList();
      }, [user]);

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

    const navigateToChatAddPage = () => {
        navigation.navigate('ChatAddPage');
    };

    const slideDown = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 0],
    });

    return (
        <View style={styles.pageContainer}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <ChatLogo />
                </View>
                <View style={styles.header}>
                    <SearchIcon onPress={handleShowInput} />
                </View>
                {showInput && (
                    <Animated.View style={[styles.inputContainer, { transform: [{ translateY: slideDown }] }]}>
                        <TextInput
                            style={styles.input}
                            value={inputValue}
                            onChangeText={handleInputChange}
                            placeholder="Search Chat Room"
                        />
                    </Animated.View>
                )}
                <Animated.ScrollView style={[styles.chatRoomContainer, { transform: [{ translateY: slideDown }] }]}>
                    <ChatRoom name="Chat Room" messages={filteredMessages} />
                </Animated.ScrollView>
            </View>
            <BottomTab currentPage="ChatListPage" />
        </View>
    );
};

export default ChatListPage;