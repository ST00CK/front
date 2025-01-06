import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ChatProps {
    profileImage: string;
    name: string;
    message: string;
    time: string;
}

const Chat: React.FC<ChatProps> = ({ profileImage, name, message, time }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <View style={styles.messageContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.message}>{message}</Text>
                <Text style={styles.time}>{time}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
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
    name: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    message: {
        marginBottom: 5,
    },
    time: {
        color: 'gray',
        fontSize: 12,
    },
});

export default Chat;