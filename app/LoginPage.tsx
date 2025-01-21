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

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigateToFriendList = () => {
        navigation.navigate('FriendListPage');
    };

    const navigateToSighUp = () => {
        navigation.navigate('SignUpPage');
    };

    return (
        <View style={styles.container}>
            <Image source={StoockImage} style={styles.image} />
            <Text style={styles.text}>Login</Text>
            <Input placeholder="Email" style={styles.input} onChangeText={(text) => setEmail(text)} value={email} />
            <Input placeholder="Password" style={styles.input} onChangeText={(text) => setPassword(text)} value={password} />
            <View style={styles.buttonContainer}>
                <ShortButton text='Login' onClick={navigateToFriendList} style={styles.button} />
                <ShortButton text='Sign Up' onClick={navigateToSighUp} style={styles.button} />
            </View>
            <Image source={kakaoImage} />
            <Button title="Go to Friend List" onPress={navigateToFriendList} />
        </View>
    );
};

export default LoginPage;