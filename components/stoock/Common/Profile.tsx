import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

interface ProfileProps {
    imageUrl: string;
    name: string;
    imageSize?: number;
    textSize?: number;
    style?: ViewStyle;
    onPress?: () => void;
    showCheck?: boolean;
    isChecked?: boolean;
    onCheck?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ imageUrl, name, imageSize = 50, textSize = 18, style, onPress, showCheck = false, isChecked = false, onCheck }) => {
    const handlePress = () => {
        if (showCheck && onCheck) {
            onCheck();
        }
        if (onPress) {
            onPress();
        }
    };

    return (
        <TouchableOpacity style={[styles.container, style]} onPress={handlePress}>
            <Image source={{ uri: imageUrl }} style={[styles.image, { width: imageSize, height: imageSize, borderRadius: imageSize / 2 }]} />
            <Text style={[styles.name, { fontSize: textSize }]}>{name}</Text>
            {showCheck && (
                <View style={[styles.checkCircle, isChecked && styles.checkedCircle]}>
                    {isChecked && <Text style={styles.checkMark}>✓</Text>}
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        marginRight: 10,
    },
    name: {
        flex: 1,
    },
    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkedCircle: {
        backgroundColor: 'purple',
        borderColor: 'purple',
    },
    checkMark: {
        color: 'white',
        fontSize: 16,
    },
});

export default Profile;