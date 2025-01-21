import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ChatLogo = () => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.logoImage} />
            <Text style={styles.logoText}>STOOCK</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ChatLogo;