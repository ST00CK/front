import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ChatRoomProps {
    name: string;
    messages: { id: number; name: string; message: string; time: string; imageUrl: string; roomId: string; userId: string }[];
}

const ChatRoom: React.FC<ChatRoomProps> = ({ name, messages }) => {
    const navigation = useNavigation();

    const handlePress = (name: string, roomId: string, userId: string) => {
        navigation.navigate('ChatRoomPage', { name, roomId, userId });
    };

    return (
        <ScrollView style={styles.container}>
            {messages.map((msg) => (
                <TouchableOpacity key={msg.id} style={styles.messageContainer} onPress={() => handlePress(msg.name, msg.roomId, msg.userId)}>
                    <Image source={{ uri: msg.imageUrl }} style={styles.profileImage} />
                    <View style={styles.messageContent}>
                        <Text style={styles.name}>{msg.name}</Text>
                        <Text style={styles.message}>{msg.message}</Text>
                    </View>
                    <Text style={styles.time}>{msg.time}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messageContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    messageContent: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        fontWeight: 'bold',
    },
    message: {
        color: '#555',
    },
    time: {
        alignSelf: 'flex-start',
        color: '#999',
    },
});

export default ChatRoom;