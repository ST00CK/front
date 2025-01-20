import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface SettingProps {
    onPress: () => void;
}

const Setting: React.FC<SettingProps> = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <FontAwesome name="cog" size={24} color="black" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});

export default Setting;