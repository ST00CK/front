import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation, NavigationProp } from 'expo-router';
import Input from '../components/stoock/Common/Input';
import ShortButton from '../components/stoock/Common/ShortButton';
import StoockImage from '../assets/images/STOOCK!.png';
import styles from '../styles/SignUpPageStyles';

type RootStackParamList = {
  FriendListPage: undefined;
};

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const navigateToFriendList = () => {
      navigation.navigate('FriendListPage');
  };

  return (
    <View style={styles.container}>
      <Image source={StoockImage} style={styles.image} />
      <Text style={styles.text}>Sign Up</Text>
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
      <ShortButton text="Sign Up" onClick={navigateToFriendList} style={styles.button} />
    </View>
  );
};

export default SignUpPage;