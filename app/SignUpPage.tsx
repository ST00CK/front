import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Modal } from 'react-native';
import { useNavigation } from 'expo-router';
import Input from '../components/stoock/Common/Input';
import ShortButton from '../components/stoock/Common/ShortButton';
import StoockImage from '../assets/images/STOOCK!.png';
import styles from '../styles/SignUpPageStyles';
import { NavigationProp } from '@react-navigation/native';
import { useSignUpMutation } from '../query/userQuery';

type RootStackParamList = {
    FriendListPage: undefined;
    LoginPage: undefined;
};

console.log("SignUpPage loaded");

const SignUpPage = () => {
    const [ID, setID] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [emailCode, setEmailCode] = useState('');

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const signUpMutation = useSignUpMutation();

    const navigateToFriendList = () => {
        navigation.navigate('FriendListPage');
    };

    const navigateToLoginPage = () => {
        navigation.navigate('LoginPage');
    };

    // const handleSignUp = async () => {
    //     if (password !== confirmPassword) {
    //         alert("Passwords do not match!");
    //         return;
    //     }

    //     try {
    //         await signUpMutation.mutateAsync({
    //             userId: ID,
    //             name: name,
    //             email: email,
    //             password: password,
    //         });
    //         setIsModalVisible(true);
    //     } catch (error) {
    //         console.error("Sign up failed:", error);
    //         alert("Sign up failed. Please try again.");
    //     }
    // };

    const handleSignUp = async () => {
          setIsModalVisible(true);
  };

    const handleModalSignUp = () => {
      setIsModalVisible(false);
      navigateToLoginPage(); // 모달 닫고 로그인 페이지로 이동
  };

    return (
        <View style={styles.container}>
            <Image source={StoockImage} style={styles.image} />
            <Text style={styles.text}>Sign Up</Text>
            <Input
                placeholder="ID"
                onChangeText={setID}
                value={ID}
                style={styles.input}
            />
            <Input
                placeholder="Name"
                onChangeText={setName}
                value={name}
                style={styles.input}
            />
            <Input
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                style={styles.input}
            />
            <Input
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                style={styles.input}
            />
            <Input
                placeholder="Confirm Password"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry
                style={styles.input}
            />
            <ShortButton text="Sign Up" onClick={handleSignUp} style={styles.button} />

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>이메일 인증코드</Text>
                        <Input
                            placeholder="인증코드"
                            onChangeText={setEmailCode}
                            value={emailCode}
                            style={styles.input}
                        />
                        <ShortButton text="Sign Up" onClick={handleModalSignUp} style={styles.button} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default SignUpPage;
