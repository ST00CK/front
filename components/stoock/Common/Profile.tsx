import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface ProfileProps {
    imageUrl: string;
    name: string;
    imageSize?: number;
    textSize?: number;
    style?: ViewStyle;
    onPress?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ imageUrl, name, imageSize = 50, textSize = 18, style, onPress }) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Image source={{ uri: imageUrl }} style={[styles.image, { width: imageSize, height: imageSize, borderRadius: imageSize / 2 }]} />
            <Text style={[styles.name, { fontSize: textSize }]}>{name}</Text>
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
        textAlign: 'center',
    },
});

export default Profile;