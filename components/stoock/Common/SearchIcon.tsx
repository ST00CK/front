import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // expo 아이콘 패키지 사용

interface SearchIconProps {
    onPress: () => void;
}

const SearchIcon: React.FC<SearchIconProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.searchButton} onPress={onPress}>
            <FontAwesome name="search" style={styles.searchIcon} />
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
    searchIcon: {
        fontSize: 20,
        color: 'black',
    },
});

export default SearchIcon;