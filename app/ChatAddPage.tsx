import React, { useState, useRef } from 'react';
import { View, ScrollView, TextInput, Animated, Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Profile from '../components/stoock/Common/Profile';
import SearchIcon from '../components/stoock/Common/SearchIcon';
import styles from '../styles/ChatAddPageStyles';
import { useChatRoomCreateMutation } from '@/query/chatQuery';

type RootStackParamList = {
    ChatAddPage: undefined;
    ChatRoomPage: undefined;
    ChatListPage: { refresh: boolean };
};

type NavigationProps = NavigationProp<RootStackParamList>;

const ChatAddPage = () => {
    const navigation = useNavigation<NavigationProps>();
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [profiles, setProfiles] = useState([
        { id: 1, name: 'Ryan Reynolds', imageUrl: 'https://via.placeholder.com/50', isChecked: false },
        { id: 2, name: 'Emma Stone', imageUrl: 'https://via.placeholder.com/50', isChecked: false },
        { id: 3, name: 'Chris Evans', imageUrl: 'https://via.placeholder.com/50', isChecked: false },
        { id: 4, name: 'Scarlett Johansson', imageUrl: 'https://via.placeholder.com/50', isChecked: false },
    ]);
    const [filteredProfiles, setFilteredProfiles] = useState(profiles);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const createChatRoomMutation = useChatRoomCreateMutation();

    const handleShowInput = () => {
        setShowInput(prevShowInput => !prevShowInput);
        Animated.timing(slideAnim, {
            toValue: showInput ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleInputChange = (text: string) => {
        setInputValue(text);
        const filtered = profiles.filter(profile =>
            profile.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProfiles(filtered);
    };

    const handleCheck = (id: number) => {
        const updatedProfiles = profiles.map(profile =>
            profile.id === id ? { ...profile, isChecked: !profile.isChecked } : profile
        );
        setProfiles(updatedProfiles);
        setFilteredProfiles(updatedProfiles.filter(profile =>
            profile.name.toLowerCase().includes(inputValue.toLowerCase())
        ));
    };

    //채팅방 생성(작동)
    const handleCreateChatRoom = async () => {
        try {
            const response = await createChatRoomMutation.mutateAsync({
                roomName: "testroom",
                userId: ["mkjack310"]
            });
            alert(response);
            navigation.navigate('ChatListPage', { refresh: true });
        } catch (error) {
            alert("채팅방 생성 오류");
        }
    }

    return (
        <View style={styles.pageContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>대화상대 선택</Text>
                    <SearchIcon onPress={handleShowInput} />
                </View>
                {showInput && (
                    <Animated.View style={[styles.inputContainer, { transform: [{ translateY: slideAnim }] }]}>
                        <TextInput
                            style={styles.input}
                            value={inputValue}
                            onChangeText={handleInputChange}
                            placeholder="Search Friends"
                        />
                    </Animated.View>
                )}
                <ScrollView style={styles.profileContainer}>
                    {filteredProfiles.map(profile => (
                        <Profile
                            key={profile.id}
                            name={profile.name}
                            imageUrl={profile.imageUrl}
                            imageSize={40}
                            textSize={14}
                            showCheck={true}
                            isChecked={profile.isChecked}
                            onCheck={() => handleCheck(profile.id)}
                        />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.confirmButton} onPress={handleCreateChatRoom}>
                    <Text style={styles.confirmButtonText}>확인</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChatAddPage;