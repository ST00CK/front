import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

interface ListIconProps {
    onPress: () => void;
}

const ListIcon: React.FC<ListIconProps> = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.line} />
            <View style={styles.line} />
            <View style={styles.line} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    line: {
        width: 20,
        height: 2,
        backgroundColor: '#000',
        marginVertical: 2,
    },
});

export default ListIcon;