import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
    placeholder: string;
    onChangeText: (text: string) => void;
    value: string;
    secureTextEntry?: boolean;
}

const Input: React.FC<InputProps> = ({ placeholder, onChangeText, value, secureTextEntry, style }) => {
    return (
        <TextInput
            style={[styles.input, style]}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            secureTextEntry={secureTextEntry}
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
        width: '70%',
    },
});

export default Input;