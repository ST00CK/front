import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyPageButton from '../components/stoock/friendlist/MyPageButton';
import styles from '../styles/FriendListPageStyles';

const FriendListPage = () => {
    const navigation = useNavigation();

    const navigateToMyPage = () => {
        navigation.navigate('MyPage');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Main Tab Content</Text>
            <MyPageButton onPress={navigateToMyPage} />
        </View>
    );
};

export default FriendListPage;
