import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ScrollView, Modal, TextInput, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useChatRoomUpdateMutation } from '@/query/chatQuery';

interface ChatSettingProps {
    isVisible: boolean;
    onClose: () => void;
    roomId: string;
    roomName: string;
    participants: { name: string; profileImage: string }[];
    onRoomNameUpdate: (newName: string) => void;
    handleExit: () => void;
}

const ChatSetting: React.FC<ChatSettingProps> = ({ isVisible, onClose, roomId, roomName, participants, onRoomNameUpdate, handleExit }) => {
    const panelAnim = useRef(new Animated.Value(0)).current;
    const [newRoomName, setNewRoomName] = useState(roomName);
    const [isModified, setIsModified] = useState(false);
    const updateRoomMutation = useChatRoomUpdateMutation();

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
            updateRoomMutation.mutate({ roomId, roomName: newRoomName }, {
                onSuccess: () => {
                    setIsModified(false);
                    onRoomNameUpdate(newRoomName);
                },
            });
        }
    };

    const handleExitAndClose = () => {
        handleExit();
        onClose();
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
                    <View style={styles.participantsAndRoomNameContainer}>
                        <View style={styles.participantsContainer}>
                            <View style={styles.participantGrid}>
                                {participants.slice(0, 4).map((participant, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri: participant.profileImage }}
                                        style={styles.participantImage}
                                    />
                                ))}
                            </View>
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
                    </View>
                    <TouchableOpacity style={styles.exitButton} onPress={handleExitAndClose}>
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
    participantsAndRoomNameContainer: {
        marginBottom: 20,
    },
    participantsContainer: {
        alignItems: 'center',
    },
    participantGrid: {
        width: 100,
        height: 100,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    participantImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    roomNameContainer: {
        flex: 1,
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