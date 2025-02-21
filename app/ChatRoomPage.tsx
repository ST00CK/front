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
import { useDeleteRoomMutation } from '../query/chatQuery';
import { useUserStore } from '@/store/useUserStore';

type RootStackParamList = {
    ChatRoomPage: { name: string; roomId: string };
    ChatListPage: { refresh?: boolean };
};

type ChatRoomPageRouteProp = RouteProp<RootStackParamList, 'ChatRoomPage'>;

const ChatRoomPage = () => {
    const route = useRoute<ChatRoomPageRouteProp>();
    const { name, roomId } = route.params;
    const navigation = useNavigation();
    const { user } = useUserStore();

    useEffect(() => {
        console.log('User:', user);
        console.log('Room ID:', roomId);
    }, [user, roomId]);

    const [messages, setMessages] = useState([
        {
            id: 1,
            profileImage: 'https://placehold.co/50',
            name: 'Ryan Reynolds',
            message: 'Hello!',
            time: '2023-10-01T10:00:00',
            isUserMessage: false,
        },
        {
            id: 2,
            profileImage: 'https://placehold.co/50',
            name: 'Chris Evans',
            message: 'Hi there!',
            time: '2023-10-01T10:01:00',
            isUserMessage: false,
        },
        {
            id: 3,
            profileImage: 'https://placehold.co/50',
            name: 'Scarlett Johansson',
            message: 'How are you?',
            time: '2023-10-01T10:02:00',
            isUserMessage: false,
        },
        {
            id: 4,
            profileImage: 'https://placehold.co/50',
            name: 'Robert Downey Jr.',
            message: 'Good morning!',
            time: '2023-10-01T10:03:00',
            isUserMessage: false,
        },
        {
            id: 5,
            profileImage: 'https://placehold.co/50',
            name: 'Robert Downey Jr.',
            message: 'Good morning!',
            time: '2023-10-01T10:03:00',
            isUserMessage: false,
        },
    ]);
    const [filteredMessages, setFilteredMessages] = useState(messages);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isPanelVisible, setIsPanelVisible] = useState(false);
    const [isSettingVisible, setIsSettingVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const panelAnim = useRef(new Animated.Value(0)).current;
    const overlayOpacity = useRef(new Animated.Value(0)).current;

    const deleteRoomMutation = useDeleteRoomMutation();

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

    // 중복된 프로필 이름 제거
    const uniqueProfiles = Array.from(new Set(messages.map(msg => msg.name)))
        .map(name => messages.find(msg => msg.name === name))
        .filter(profile => profile !== undefined);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                {!showInput ? (
                    <>
                        <Text style={styles.chatRoomName}>{name}</Text>
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
                    const showProfileImage = index === 0 || filteredMessages[index - 1].name !== msg.name;
                    const showName = index === 0 || filteredMessages[index - 1].name !== msg.name;
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
                        {uniqueProfiles.map((profile, index) => (
                            <Profile
                                key={index}
                                name={profile?.name || ''}
                                imageUrl={profile?.profileImage || ''}
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
                roomName={name}
                participants={uniqueProfiles.map(profile => ({
                    name: profile?.name || '',
                    profileImage: profile?.profileImage || '',
                }))}
            />
        </KeyboardAvoidingView>
    );
};

export default ChatRoomPage;