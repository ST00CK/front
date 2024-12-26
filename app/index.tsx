import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useNavigation, NavigationProp } from 'expo-router';
import ShortButton from '../components/stoock/Common/ShortButton';
import styles from '../styles/LoginPageStyles';
import Input from './../components/stoock/Common/Input';
import StoockImage from '../assets/images/STOOCK!.png';
import kakaoImage from '../assets/images/kakao.png';

type RootStackParamList = {
    FriendListPage: undefined;
};

const LoginPage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const navigateToFriendList = () => {
        navigation.navigate('FriendListPage');
    };

    const

    return (
        <View style={styles.container}>
            <Image source={StoockImage} />
            <Text style={styles.text}>Login</Text>
            <Button title="Go to Friend List" onPress={navigateToFriendList} />
            <Input placeholder="Email"/>
            <Input placeholder="Password"/>
            <View style={styles.buttonContainer}>
                <ShortButton text='Login' onClick={navigateToFriendList} />
                <ShortButton text='Sign Up' onClick={navigateToFriendList} />
            </View>
            <Image source={kakaoImage} />
        </View>
    );
};

export default LoginPage;