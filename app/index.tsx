import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from 'expo-router';

const LoginPage = () => {
    const navigation = useNavigation();

    const navigateToFriendList = () => {
        navigation.navigate('friendListPage');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home Tab Content</Text>
            <Button title="Go to Friend List" onPress={navigateToFriendList} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
    },
});

export default LoginPage;
