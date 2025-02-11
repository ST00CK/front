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
                animationType="none"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.button} onPress={navigateToMyPage}>
                                <Text style={styles.buttonText}>내정보</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                                <Text style={styles.buttonText}>로그아웃</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    modalContainer: {
        marginTop: 55,
        marginRight: 25,
        backgroundColor: 'white',
        borderRadius: 5,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'black',
    },
    modalContent: {
        padding: 10,
    },
    button: {
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
    },
});

export default Setting;