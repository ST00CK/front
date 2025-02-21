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
    const deleteChatroomMutation = useDeleteRoomMutation();
    const chatRoomInviteMutation = useChatRoomInviteMutation();
    const chatRoomUpdateMutation = useChatRoomUpdateMutation();
    const chatRoomLogMutation = useChatRoomLogMutation();
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState(messages);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const [refreshFlag, setRefreshFlag] = useState(0);

    //채팅방 조회
    useEffect(() => {
        const fetchChatList = async () => {
            if (!user?.userId) return;

            try {
                const response = await chatRoomListMutation.mutateAsync(user.userId);
                console.log('Chat list response:', response);

                const updatedMessages = response.map((room: any) => ({
                    id: room.id,
                    name: room.name,
                    message: '',
                    time: '',
                    imageUrl: 'https://placehold.co/50',
                    roomId: room.id,
                }));

                setMessages(updatedMessages);
                setFilteredMessages(updatedMessages);
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

    //채팅방 초대(친구 없어서 테스트 못하는중..)
    const handleChatRoomInvite = async () => {
        try {
            const response = await chatRoomInviteMutation.mutateAsync({
                roomId: "381f5c60-8ec5-4864-9d3e-705f23a8806f",
                userId: "친구 아이디!!"
            });
            console.log(response);
        } catch (error) {
            alert("초대 오류")
        }
    }

    //채팅방 업데이트(작동)
    const handleChatRoomUpdate = async () => {
        try {
            const response = await chatRoomUpdateMutation.mutateAsync({
                roomId: "b419d3b4-53e3-4ff7-b9b8-4d3fcd39ae08",
                roomName: "삭제 예정123"
            });
            console.log(response);
            setRefreshFlag(prev => prev + 1); //
        } catch (error) {
            alert("초대 오류")
        }
    }

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
                    text="채팅방 업데이트"
                    onClick={handleChatRoomUpdate}
                />
                <ShortButton
                    text="채팅방 초대"
                    onClick={handleChatRoomInvite}
                />
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