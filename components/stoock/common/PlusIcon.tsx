import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // expo 아이콘 패키지 사용

interface PlusIconProps {
    onShowInput: () => void;
}

const PlusIcon: React.FC<PlusIconProps> = ({ onShowInput }) => {
    const handlePress = () => {
        onShowInput();
    };

    return (
        <TouchableOpacity style={styles.plusButton} onPress={handlePress}>
            <FontAwesome name="plus" style={styles.plusIcon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    plusButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    plusIcon: {
        fontSize: 20,
        color: 'black',
    },
});

export default PlusIcon;