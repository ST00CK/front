import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface ExitIconProps {
    onPress: () => void;
}

const ExitIcon: React.FC<ExitIconProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.exitButton} onPress={onPress}>
            <FontAwesome name="sign-out" style={styles.exitIcon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    exitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    exitIcon: {
        fontSize: 24,
        color: 'red',
    },
});

export default ExitIcon;