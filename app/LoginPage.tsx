import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import ShortButton from '../components/stoock/Common/ShortButton';
import styles from '../styles/LoginPageStyles';
import Input from './../components/stoock/Common/Input';
import StoockImage from '../assets/images/STOOCK!.png';
import kakaoImage from '../assets/images/kakao.png';
import { useLoginMutation, useKakaoLoginMutation } from '@/query/userQuery';

type RootStackParamList = {
  FriendListPage: undefined;
  SignUpPage: undefined;
  PasswdChangePage: undefined;
};

const LoginPage = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginMutation = useLoginMutation();
  const kakaoLoginMutation = useKakaoLoginMutation();

  const navigateToFriendList = () => {
    navigation.navigate('FriendListPage');
  };

  const navigateToSighUp = () => {
    navigation.navigate('SignUpPage');
  };

  const navigateToPasswdChange = () => {
    navigation.navigate('PasswdChangePage');
  };

  //폼 로그인 핸들
  const handleLogin = async () => {
    try {
      await loginMutation.mutateAsync({
        userId: email,
        password: password,
      })

      navigateToFriendList();
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  }

  //카카오 로그인 핸들
  const handleKaKaoLogin = async () => {
    try {
      // Kakao 로그인 mutation 실행
      await kakaoLoginMutation.mutateAsync();

      navigateToFriendList();
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={StoockImage} style={styles.image} />
      <Text style={styles.text}>로그인</Text>
      <Input placeholder="이메일" style={styles.input} onChangeText={(text) => setEmail(text)} value={email} />
      <Input placeholder="비밀번호" style={styles.input} onChangeText={(text) => setPassword(text)} secureTextEntry value={password} />
      <View style={styles.buttonContainer}>
        <ShortButton text='로그인' onClick={handleLogin} style={[styles.button, { marginLeft: 0 }]} />
        <ShortButton text='회원가입' onClick={navigateToSighUp} style={[styles.button, { marginRight: 0 }]} />
      </View>
      <TouchableOpacity onPress={handleKaKaoLogin} >
        <Image source={kakaoImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToPasswdChange} style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>비밀번호가 기억이 안나요</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;