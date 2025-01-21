import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ChatProps {
    profileImage: string;
    name: string;
    message: string;
    time: string;
    isUserMessage?: boolean;
    showProfileImage: boolean;
    showName: boolean;
    showTime: boolean;
}

const Chat: React.FC<ChatProps> = ({ profileImage, name, message, time, isUserMessage, showProfileImage, showName, showTime }) => {
    const formattedTime = new Date(time).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true });

    return (
        <View style={[styles.container, isUserMessage && styles.userContainer]}>
            {!isUserMessage && (
                <View style={styles.profileImageContainer}>
                    {showProfileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}
                </View>
            )}
            <View style={[styles.messageContainer, isUserMessage && styles.userMessageContainer]}>
                {showName && !isUserMessage && <Text style={styles.name}>{name}</Text>}
                <View style={styles.messageRow}>
                    {isUserMessage && showTime && <Text style={[styles.time, styles.userTime]}>{formattedTime}</Text>}
                    <View style={[styles.messageBubble, isUserMessage && styles.userMessageBubble]}>
                        <Text style={styles.message}>{message}</Text>
                    </View>
                    {!isUserMessage && showTime && <Text style={styles.time}>{formattedTime}</Text>}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 2,
    },
    userContainer: {
        justifyContent: 'flex-end',
        marginRight: 10,
    },
    profileImageContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    messageContainer: {
        maxWidth: '80%',
    },
    userMessageContainer: {
        alignItems: 'flex-end',
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageBubble: {
        backgroundColor: '#E3E1F6',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E3E1F6',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    userMessageBubble: {
        alignSelf: 'flex-end',
    },
    message: {
        color: '#1D00AC',
    },
    time: {
        color: 'gray',
        fontSize: 12,
        marginHorizontal: 5,
    },
    userTime: {
        marginRight: 10,
    },
    name: {
        fontWeight: 'bold',
    },
});

export default Chat;