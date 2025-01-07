import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchIconProps extends TextInputProps {
    placeholder: string;
    onChangeText: (text: string) => void;
    value: string;
}

const SearchIcon: React.FC<SearchIconProps> = ({ placeholder, onChangeText, value, style, ...props }) => {
    return (
        <View style={[styles.container, style]}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                {...props}
            />
            <Ionicons name="search" size={24} color="black" style={styles.icon} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 5,
        width: '70%',
    },
    input: {
        flex: 1,
    },
    icon: {
        marginLeft: 10,
    },
});

export default SearchIcon;