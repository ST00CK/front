import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDeleteRoomMutation } from '@/query/chatQuery';
import Profile from '../Common/Profile';

interface ChatSettingProps {
    isVisible: boolean;
    onClose: () => void;
    roomId: string;
    roomName: string;
    participants: { name: string; profileImage: string }[];
}

const ChatSetting: React.FC<ChatSettingProps> = ({ isVisible, onClose, roomId, roomName, participants }) => {
    const panelAnim = useRef(new Animated.Value(0)).current;
    const [newRoomName, setNewRoomName] = useState(roomName);
    const [isModified, setIsModified] = useState(false);
    const deleteRoomMutation = useDeleteRoomMutation();

    useEffect(() => {
        Animated.timing(panelAnim, {
            toValue: isVisible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isVisible]);

    useEffect(() => {
        setNewRoomName(roomName);
        setIsModified(false);
    }, [roomName]);

    const panelTranslateY = panelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [300, 0],
    });

    const handleRoomNameChange = (text: string) => {
        setNewRoomName(text);
        setIsModified(text !== roomName);
    };

    const handleSave = () => {
        if (isModified) {
            // 채팅방 이름 수정 로직 추가
            console.log('채팅방 이름 수정:', newRoomName);
            setIsModified(false);
        }
    };

    const handleExitRoom = () => {
        deleteRoomMutation.mutate({ roomId }, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="none"
            onRequestClose={onClose}
        >
            <Animated.View style={[styles.overlay, { opacity: panelAnim }]}>
                <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
            </Animated.View>
            <Animated.View style={[styles.panel, { transform: [{ translateY: panelTranslateY }] }]}>
                <View style={styles.header}>
                    <Text style={styles.panelTitle}>채팅방 설정</Text>
                    <TouchableOpacity onPress={onClose}>
                        <FontAwesome name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.participantsContainer}>
                        {participants.map((participant, index) => (
                            <Profile
                                key={index}
                                name={participant.name}
                                imageUrl={participant.profileImage}
                                imageSize={50}
                                textSize={14}
                            />
                        ))}
                    </View>
                    <View style={styles.roomNameContainer}>
                        <Text style={styles.label}>채팅방 이름</Text>
                        <TextInput
                            style={styles.input}
                            value={newRoomName}
                            onChangeText={handleRoomNameChange}
                        />
                        <TouchableOpacity
                            style={[styles.saveButton, isModified && styles.saveButtonActive]}
                            onPress={handleSave}
                            disabled={!isModified}
                        >
                            <Text style={styles.saveButtonText}>확인</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.exitButton} onPress={handleExitRoom}>
                        <Text style={styles.exitButtonText}>채팅방 나가기</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    panel: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    participantsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    roomNameContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    saveButton: {
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonActive: {
        backgroundColor: '#007AFF',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
    },
    exitButton: {
        padding: 15,
        backgroundColor: 'red',
        alignItems: 'center',
        borderRadius: 5,
    },
    exitButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ChatSetting;