import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface InputProps {
    placeholder: string;
    onChangeText: (text: string) => void;
    value: string;
}

const Input: React.FC<InputProps> = ({ placeholder, onChangeText, value }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#d3d3d3',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 5,
    },
});

export default Input;