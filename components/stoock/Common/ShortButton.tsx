import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ShortButtonProps {
    text: string;
    onClick: () => void;
}

const ShortButton: React.FC<ShortButtonProps> = ({ text, onClick }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onClick}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'red',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default ShortButton;