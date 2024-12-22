// FriendListPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyPageButton from '../components/stoock/friendlist/MyPageButton';

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

export default FriendListPage;
