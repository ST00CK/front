import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Text, TextInput, Animated, TouchableOpacity, Modal } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import Chat from '../components/stoock/ChatRoom/Chat';
import ChatInput from '../components/stoock/ChatRoom/ChatInput';
import SearchIcon from '../components/stoock/Common/SearchIcon';
import ListIcon from '../components/stoock/ChatRoom/List';
import Profile from '../components/stoock/Common/Profile';
import ExitIcon from '../components/stoock/ChatRoom/ExitIcon';
import ChatSetting from '../components/stoock/ChatRoom/ChatSetting';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles/ChatRoomPageStyles';
import { useDeleteRoomMutation, useChatRoomLogMutation } from '../query/chatQuery';
import { useUserStore } from '@/store/useUserStore';
import { useChatRoomMembersMutation } from '@/query/chatQuery';
import { fetchUserById, User } from '@/query/userQuery';

type RootStackParamList = {
    ChatRoomPage: { name: string; roomId: string; userId: string };
    ChatListPage: { refresh?: boolean };
};

type ChatRoomPageRouteProp = RouteProp<RootStackParamList, 'ChatRoomPage'>;

const ChatRoomPage = () => {
    const route = useRoute<ChatRoomPageRouteProp>();
    const { name, roomId, userId } = route.params;
    const navigation = useNavigation();
    const { user } = useUserStore();

    const chatRoomMembersMutation = useChatRoomMembersMutation();
    const chatRoomLogMutation = useChatRoomLogMutation();
    const [participants, setParticipants] = useState<User[]>([]);
    interface Message {
        id: number;
        profileImage: string;
        name: string;
        message: string;
        time: string;
        isUserMessage: boolean;
        userId: string;
    }
    
    const [messages, setMessages] = useState<Message[]>([]);
    const [filteredMessages, setFilteredMessages] = useState(messages);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isPanelVisible, setIsPanelVisible] = useState(false);
    const [isSettingVisible, setIsSettingVisible] = useState(false);
    const [roomName, setRoomName] = useState(name);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const panelAnim = useRef(new Animated.Value(0)).current;
    const overlayOpacity = useRef(new Animated.Value(0)).current;

    const deleteRoomMutation = useDeleteRoomMutation();

    useEffect(() => {
        const fetchChatRoomMembers = async () => {
            try {
                const response = await chatRoomMembersMutation.mutateAsync({ roomId });
                console.log(`Room ID: ${roomId}, Members:`, response.userId);
                const userIds = response.userId || [];
                const users = await Promise.all(userIds.map(async (userId) => {
                    const user = await fetchUserById(userId);
                    console.log('Fetched user:', user); // 사용자 정보를 콘솔에 출력하여 확인
                    return {
                        ...user,
                        profileImage: user.file, // file 필드를 profileImage로 매핑
                    };
                }));
                setParticipants(users);
            } catch (error) {
                console.error('Error fetching chat room members:', error);
            }
        };

        const fetchChatRoomLog = async () => {
            try {
                const response = await chatRoomLogMutation.mutateAsync({ room_Id: roomId });
                console.log('Chat room log response:', response);
                const messages: Message[] = Array.isArray(response) ? response.map((msg: any) => ({
                    id: msg.id,
                    profileImage: msg.profileImage,
                    name: msg.name,
                    message: msg.message,
                    time: msg.time,
                    isUserMessage: msg.isUserMessage,
                    userId: msg.userId,
                })) : [];
                setMessages(messages);
                setFilteredMessages(messages);
            } catch (error) {
                console.error('Error fetching chat room log:', error);
            }
        };

        fetchChatRoomMembers();
        fetchChatRoomLog();
    }, [roomId]);

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
            msg.message.toLowerCase().includes(text.toLowerCase()) ||
            msg.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredMessages(filtered);
    };

    const handleSend = (message: string) => {
        const newMessage = {
            id: messages.length + 1,
            profileImage: '',
            name: 'You',
            message: message,
            time: new Date().toISOString(),
            isUserMessage: true,
            userId: user?.userId || '',
        };
        setMessages([...messages, newMessage]);
        setFilteredMessages([...messages, newMessage]);
    };

    const togglePanel = () => {
        setIsPanelVisible(!isPanelVisible);
        Animated.parallel([
            Animated.timing(panelAnim, {
                toValue: isPanelVisible ? 0 : 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(overlayOpacity, {
                toValue: isPanelVisible ? 0 : 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleExit = () => {
        if (user?.userId && roomId) {
            setIsPanelVisible(false);
            deleteRoomMutation.mutate({ roomId, userId: user.userId }, {
                onSuccess: () => {
                    navigation.navigate('ChatListPage', { refresh: true });
                },
            });
        } else {
            alert("유효하지 않은 사용자 또는 채팅방 ID입니다.");
        }
    };

    const handleSettingPress = () => {
        setIsPanelVisible(false);
        setIsSettingVisible(true);
    };

    const handleSettingClose = () => {
        setIsSettingVisible(false);
    };

    const handleRoomNameUpdate = (newName: string) => {
        setRoomName(newName);
    };

    const slideDown = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 0],
    });

    const panelTranslateX = panelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [300, 0],
    });

    const overlayStyle = {
        opacity: overlayOpacity,
        position: 'absolute' as const,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                {!showInput ? (
                    <>
                        <Text style={styles.chatRoomName}>{roomName}</Text>
                        <View style={styles.iconContainer}>
                            <SearchIcon onPress={handleShowInput} />
                            <ListIcon onPress={togglePanel} />
                        </View>
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
                {filteredMessages.map((msg, index) => {
                    const showProfileImage = index === 0 || filteredMessages[index - 1].userId !== msg.userId;
                    const showName = index === 0 || filteredMessages[index - 1].userId !== msg.userId;
                    const showTime = index === filteredMessages.length - 1 || new Date(filteredMessages[index + 1].time).getMinutes() !== new Date(msg.time).getMinutes();
                    return (
                        <Chat
                            key={msg.id}
                            profileImage={msg.profileImage}
                            name={msg.name}
                            message={msg.message}
                            time={msg.time}
                            isUserMessage={msg.isUserMessage}
                            showProfileImage={showProfileImage}
                            showName={showName}
                            showTime={showTime}
                        />
                    );
                })}
            </ScrollView>
            <ChatInput onSend={handleSend} />
            <Modal
                visible={isPanelVisible}
                transparent={true}
                animationType="none"
                onRequestClose={togglePanel}
            >
                <Animated.View style={[styles.overlay, overlayStyle]}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={togglePanel} />
                </Animated.View>
                <Animated.View style={[styles.panel, { transform: [{ translateX: panelTranslateX }] }]}>
                    <Text style={styles.panelTitle}>Participants</Text>
                    <ScrollView>
                        {participants.map((participant, index) => (
                            <Profile
                                key={index}
                                name={participant.name}
                                imageUrl={participant.profileImage}
                                imageSize={40}
                                textSize={14}
                            />
                        ))}
                    </ScrollView>
                    <View style={styles.panelFooter}>
                        <ExitIcon onPress={handleExit} />
                        <TouchableOpacity onPress={handleSettingPress} style={styles.settingIcon}>
                            <FontAwesome name="cog" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Modal>
            <ChatSetting
                isVisible={isSettingVisible}
                onClose={handleSettingClose}
                roomId={roomId}
                roomName={roomName}
                participants={participants.map(participant => ({
                    name: participant.name,
                    profileImage: participant.profileImage,
                }))}
                onRoomNameUpdate={handleRoomNameUpdate}
                handleExit={handleExit}
            />
        </KeyboardAvoidingView>
    );
};

export default ChatRoomPage;