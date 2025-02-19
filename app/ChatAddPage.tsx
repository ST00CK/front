import React, { useState, useRef } from 'react';
import { View, ScrollView, TextInput, Animated } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Profile from '../components/stoock/Common/Profile';
import SearchIcon from '../components/stoock/Common/SearchIcon';
import ShortButton from '../components/stoock/Common/ShortButton';
import styles from '../styles/ChatAddPageStyles';
import { useChatRoomCreateMutation } from '@/query/chatQuery';

type RootStackParamList = {
    ChatAddPage: undefined;
    ChatRoomPage: undefined;
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
        const response = await createChatRoomMutation.mutateAsync({
            roomName: "testroom",
            userId: ["htb010630@naver.com"]            
        });
        alert(response);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
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
            <ShortButton
                        text="채팅방생성"
                        onClick={handleCreateChatRoom}
                    />
        </View>
    );
};

export default ChatAddPage;