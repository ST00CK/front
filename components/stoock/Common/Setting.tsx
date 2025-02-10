import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { handleLogout } from '../../../query/userQuery';

interface SettingProps {
    onPress: () => void;
}

type RootStackParamList = {
    MyPage: undefined;
    FriendListPage: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;

const Setting: React.FC<SettingProps> = ({ onPress }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NavigationProps>();

    const navigateToMyPage = () => {
        setModalVisible(false);
        navigation.navigate('MyPage');
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.container}>
                <FontAwesome name="cog" size={24} color="black" />
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.button} onPress={navigateToMyPage}>
                            <Text style={styles.buttonText}>내정보</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleLogout}>
                            <Text style={styles.buttonText}>로그아웃</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    button: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    buttonText: {
        fontSize: 18,
        color: 'black',
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        color: 'red',
    },
});

export default Setting;