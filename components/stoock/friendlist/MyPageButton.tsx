import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MyPageButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>My Page</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        position: 'absolute',
        top: 20,
        right: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default MyPageButton;
