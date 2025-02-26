import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, TextInput, Animated, Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Profile from '../components/stoock/Common/Profile';
import SearchIcon from '../components/stoock/Common/SearchIcon';
import styles from '../styles/ChatAddPageStyles';
import { useChatRoomCreateMutation } from '@/query/chatQuery';
import { useFriendShipListMutation } from '@/query/friendQuery';
import { useUserStore } from '@/store/useUserStore';

type RootStackParamList = {
    ChatAddPage: undefined;
    ChatRoomPage: undefined;
    ChatListPage: { refresh: boolean };
};

interface ProfileType {
    id: number;
    name: string;
    imageUrl: string;
    isChecked: boolean;
}

type NavigationProps = NavigationProp<RootStackParamList>;

const ChatAddPage = () => {
    const navigation = useNavigation<NavigationProps>();
    const { user } = useUserStore();
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [profiles, setProfiles] = useState<ProfileType[]>([]);
    const [filteredProfiles, setFilteredProfiles] = useState<ProfileType[]>([]);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const createChatRoomMutation = useChatRoomCreateMutation();
    const friendShipListMutation = useFriendShipListMutation();

    useEffect(() => {
        const fetchFriendList = async () => {
            try {
                const response = await friendShipListMutation.mutateAsync(user!.userId);
                console.log('Friend list response:', response); // 응답 데이터 확인
                if (Array.isArray(response)) {
                    const transformedResponse = response.map((user: any) => ({
                        id: user.id, // id 필드가 올바르게 설정되었는지 확인
                        name: user.name,
                        imageUrl: user.imageUrl,
                        isChecked: false,
                    }));
                    setProfiles(transformedResponse);
                    setFilteredProfiles(transformedResponse);
                }
            } catch (error) {
                console.error('Error fetching friend list:', error);
            }
        };
        fetchFriendList();
    }, [user]);

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

    const handleCreateChatRoom = async () => {
        const selectedProfiles = profiles.filter(profile => profile.isChecked);
        const userIds = selectedProfiles.map(profile => profile.id.toString());
        const userNames = selectedProfiles.map(profile => profile.name);

        // 현재 사용자의 ID와 이름을 추가
        if (user && user.userId) {
            userIds.push(user.userId.toString());
            userNames.push(user.name);
        }

        const roomName = userNames.join(',');

        console.log('Selected profiles:', selectedProfiles);
        console.log('User IDs:', userIds);
        console.log('Room Name:', roomName);

        try {
            const response = await createChatRoomMutation.mutateAsync({
                roomName: roomName,
                userId: userIds
            });
            console.log('Chat room creation response:', response);
            alert(response.data.message);
            navigation.navigate('ChatListPage', { refresh: true });
        } catch (error) {
            console.error('Error creating chat room:', error);
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