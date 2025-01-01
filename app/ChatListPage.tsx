import React from 'react';
import { View } from 'react-native';
import ChatRoom from '../components/stoock/ChatList/ChatRoom';
import ChatLogo from '../components/stoock/ChatList/ChatLogo';
import styles from '../styles/ChatListPageStyles';

const ChatListPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <ChatLogo />
            </View>
            <View style={styles.chatRoomContainer}>
                <ChatRoom />
            </View>
        </View>
    );
};

export default ChatListPage;