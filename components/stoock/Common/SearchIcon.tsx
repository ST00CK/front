import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchIconProps extends TextInputProps {
    placeholder: string;
    onChangeText: (text: string) => void;
    value: string;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
}

const SearchIcon: React.FC<SearchIconProps> = ({ placeholder, onChangeText, value, containerStyle, inputStyle, ...props }) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput
                style={[styles.input, inputStyle]}
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