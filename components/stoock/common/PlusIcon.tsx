import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const PlusIcon = ({ onShowInput }) => {
    const handlePress = () => {
        onShowInput();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.plusButton} onPress={handlePress}>
                <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    plusButton: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusText: {
        color: '#007AFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default PlusIcon;