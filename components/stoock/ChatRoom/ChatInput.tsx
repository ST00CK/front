import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChatInputProps {
    onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Send a message"
                value={message}
                onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Ionicons name="send" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChatInput;