import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ChatProps {
    profileImage: string;
    name: string;
    message: string;
    time: string;
    isUserMessage?: boolean;
}

const Chat: React.FC<ChatProps> = ({ profileImage, name, message, time, isUserMessage }) => {
    return (
        <View style={[styles.container, isUserMessage && styles.userContainer]}>
            {!isUserMessage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}
            <View style={[styles.messageContainer, isUserMessage && styles.userMessageContainer]}>
                {!isUserMessage && <Text style={styles.name}>{name}</Text>}
                <View style={[styles.messageBubble, isUserMessage && styles.userMessageBubble]}>
                    <Text style={styles.message}>{message}</Text>
                </View>
                <Text style={styles.time}>{time}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    userContainer: {
        justifyContent: 'flex-end',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    messageContainer: {
        flex: 1,
    },
    userMessageContainer: {
        alignItems: 'flex-end',
    },
    name: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    messageBubble: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: '#E3E1F6',
        borderWidth: 1,
        borderColor: '#E3E1F6',
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    userMessageBubble: {
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    message: {
        color: '#1D00AC',
        marginBottom: 5,
    },
    time: {
        color: 'gray',
        fontSize: 12,
    },
});

export default Chat;