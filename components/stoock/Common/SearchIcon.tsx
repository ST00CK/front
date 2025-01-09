import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SearchIconProps {
    onPress: () => void;
}

const SearchIcon: React.FC<SearchIconProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.searchButton} onPress={onPress}>
            <Text style={styles.searchText}>🔍</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    searchButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    searchText: {
        fontSize: 20,
    },
});

export default SearchIcon;