import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Animated, ScrollView } from 'react-native';
import ChatRoom from '../components/stoock/ChatList/ChatRoom';
import ChatLogo from '../components/stoock/ChatList/ChatLogo';
import SearchIcon from '../components/stoock/Common/SearchIcon';
import PlusIcon from '../components/stoock/Common/PlusIcon';
import BottomTab from '../components/stoock/Common/BottomTab';
import ShortButton from '../components/stoock/Common/ShortButton';
import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import styles from '../styles/ChatListPageStyles';
import { useChatRoomListMutation, useDeleteRoomMutation, useChatRoomInviteMutation, useChatRoomUpdateMutation, useChatRoomLogMutation } from '@/query/chatQuery';
import { useUserStore } from '@/store/useUserStore';
import { useChatRoomMembersMutation } from '@/query/chatQuery';

type RootStackParamList = {
    ChatListPage: { refresh?: boolean };
    ChatAddPage: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;
type ChatListPageRouteProp = RouteProp<RootStackParamList, 'ChatListPage'>;

const ChatListPage = () => {
    const navigation = useNavigation<NavigationProps>();
    const route = useRoute<ChatListPageRouteProp>();
    const { refresh } = route.params || {};
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const { user } = useUserStore();
    const chatRoomListMutation = useChatRoomListMutation();
    const chatRoomMembersMutation = useChatRoomMembersMutation();
    const deleteChatroomMutation = useDeleteRoomMutation();
    const chatRoomInviteMutation = useChatRoomInviteMutation();
    const chatRoomUpdateMutation = useChatRoomUpdateMutation();
    const chatRoomLogMutation = useChatRoomLogMutation();
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState(messages);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const [refreshFlag, setRefreshFlag] = useState(0);

    const fetchChatRoomMembers = async (roomId: string) => {
        try {
            const response = await chatRoomMembersMutation.mutateAsync({ roomId });
            console.log(`Room ID: ${roomId}, Members:`, response.userId);
        } catch (error) {
            console.error('Error fetching chat room members:', error);
        }
    };

    //채팅방 조회
    useEffect(() => {
        const fetchChatList = async () => {
            if (!user?.userId) return;

            try {
                const response = await chatRoomListMutation.mutateAsync(user.userId);
                console.log('Chat list response:', response);

                const updatedMessages = response.map((room: any) => {
                    const roomMembers = room.name.split(',').filter((name: string) => name !== user.name);
                    const roomName = roomMembers.join(',');

                    return {
                        id: room.id,
                        name: roomName,
                        message: '',
                        time: '',
                        imageUrl: 'https://placehold.co/50',
                        roomId: room.id,
                        userId: user.userId,
                    };
                });

                setMessages(updatedMessages);
                setFilteredMessages(updatedMessages);

                updatedMessages.forEach(room => fetchChatRoomMembers(room.roomId));
            } catch (error) {
                console.error('Error fetching chat list:', error);
            }
        };

        fetchChatList();
    }, [user, refreshFlag, refresh]);

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
    
    //채팅방 로그 조회(작동)
    const handleChatRoomLog = async () => {
        try {
            const response = await chatRoomLogMutation.mutateAsync({
                room_Id: "9458fa1d-e5bd-4fe3-9844-6d348a6c3d85",
            });
        } catch (error) {
            alert("로그 조회 오류")
        }
    }

    return (
        <View style={styles.pageContainer}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <ChatLogo />
                </View>
                <View style={styles.header}>
                    <PlusIcon onShowInput={navigateToChatAddPage} />
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
                <ShortButton
                    text="채팅방 로그"
                    onClick={handleChatRoomLog}
                />
            </View>
            <BottomTab currentPage="ChatListPage" />
        </View>
    );
};

export default ChatListPage;