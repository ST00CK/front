import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // expo 아이콘 패키지 사용

type RootStackParamList = {
    FriendListPage: undefined;
    ChatListPage: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;

const BottomTab = ({ currentPage }: { currentPage: string }) => {
    const navigation = useNavigation<NavigationProps>();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.tab}
                onPress={() => navigation.navigate('FriendListPage')}
            >
                <FontAwesome name="user" style={styles.icon} />
                <Text style={[styles.text, currentPage === 'FriendListPage' && styles.activeText]}>친구</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.tab}
                onPress={() => navigation.navigate('ChatListPage')}
            >
                <FontAwesome name="comments" style={styles.icon} />
                <Text style={[styles.text, currentPage === 'ChatListPage' && styles.activeText]}>채팅</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#fff',
        width: '100%',
    },
    tab: {
        alignItems: 'center',
        padding: 10,
    },
    icon: {
        fontSize: 24,
        marginBottom: 5,
        color: 'gray',
    },
    text: {
        color: 'gray',
        fontSize: 12,
    },
    activeText: {
        color: 'blue',
        fontWeight: 'bold',
    },
});

export default BottomTab;