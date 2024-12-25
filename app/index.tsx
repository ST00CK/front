import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from 'expo-router';
import ShortButton from '../components/stoock/Common/ShortButton';
import styles from '../styles/LoginPageStyles';

const LoginPage = () => {
    const navigation = useNavigation();

    const navigateToFriendList = () => {
        navigation.navigate('FriendListPage');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home Tab Content</Text>
            <Button title="Go to Friend List" onPress={navigateToFriendList} />
            <View style={styles.buttonContainer}>
                <ShortButton text='Login' onClick={navigateToFriendList} />
                <ShortButton text='Sign Up' onClick={navigateToFriendList} />
            </View>
        </View>
    );
};

export default LoginPage;