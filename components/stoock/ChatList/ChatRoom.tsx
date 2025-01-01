import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatRoom = () => {
    const navigation = useNavigation();
    const messages = [
        { id: 1, name: 'Ryan Reynolds', message: 'Hi', time: '10:00 AM', imageUrl: 'https://via.placeholder.com/50' },
        { id: 2, name: 'Chris Evans', message: 'Hi', time: '10:01 AM', imageUrl: 'https://via.placeholder.com/50' },
        { id: 3, name: 'Scarlett Johansson', message: 'Hi', time: '10:02 AM', imageUrl: 'https://via.placeholder.com/50' },
        { id: 4, name: 'Robert Downey Jr.', message: 'Hi', time: '10:03 AM', imageUrl: 'https://via.placeholder.com/50' },
    ];

    const handlePress = () => {
        navigation.navigate('ChatRoomPage');
    };

    return (
        <ScrollView style={styles.container}>
            {messages.map((msg) => (
                <TouchableOpacity key={msg.id} style={styles.messageContainer} onPress={handlePress}>
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
        width: '90%',
        alignSelf: 'center',
        padding: 10,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingBottom: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    messageContent: {
        flex: 1,
    },
    name: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    message: {
        color: 'gray',
    },
    time: {
        marginLeft: 10,
        color: 'gray',
    },
});

export default ChatRoom;