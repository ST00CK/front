import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, NavigationProp } from 'expo-router';
import ShortButton from '../components/stoock/Common/ShortButton';
import styles from '../styles/LoginPageStyles';
import Input from './../components/stoock/Common/Input';
import StoockImage from '../assets/images/STOOCK!.png';
import kakaoImage from '../assets/images/kakao.png';
import { useLoginMutation, useKakaoLoginMutation } from '@/query/userQuery';
import { useUserStore } from '../store/useUserStore';

type RootStackParamList = {
  FriendListPage: undefined;
};

const LoginPage = () => {

  console.log("LoginPage rendered");

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

      // 친구 목록 페이지로 이동
      navigateToFriendList();
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed"+ "Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={StoockImage} style={styles.image} />
      <Text style={styles.text}>Login</Text>
      <Input placeholder="Email" style={styles.input} onChangeText={(text) => setEmail(text)} value={email} />
      <Input placeholder="Password" style={styles.input} onChangeText={(text) => setPassword(text)} value={password} />
      <View style={styles.buttonContainer}>
        <ShortButton text='Login' onClick={handleLogin} style={styles.button} />
        <ShortButton text='Sign Up' onClick={navigateToSighUp} style={styles.button} />
      </View>
      <TouchableOpacity onPress={handleKaKaoLogin} >
        <Image source={kakaoImage} />
      </TouchableOpacity>
      <Button title="Go to Friend List" onPress={navigateToFriendList} />
    </View>
  );
};

export default LoginPage;