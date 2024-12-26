import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface ShortButtonProps {
    text: string;
    onClick: () => void;
    style?: ViewStyle;
}

const ShortButton: React.FC<ShortButtonProps> = ({ text, onClick, style }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onClick}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#EF5353',
        borderRadius: 50,
        width: 120,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default ShortButton;