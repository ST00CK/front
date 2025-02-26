import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, TextInput, Animated, TouchableOpacity, Text, Modal } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Profile from '../components/stoock/Common/Profile';
import SearchIcon from '../components/stoock/Common/SearchIcon';
import PlusIcon from '../components/stoock/Common/PlusIcon';
import Setting from '../components/stoock/Common/Setting';
import BottomTab from '../components/stoock/Common/BottomTab';
import ShortButton from '../components/stoock/Common/ShortButton';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles/FriendListPageStyles';
import { useUserStore } from '../store/useUserStore';
import { useFriendShipCreateMutation, useFriendShipDeleteMutation, useFriendShipListMutation } from '@/query/friendQuery';

type RootStackParamList = {
    FriendListPage: undefined;
    MyPage: undefined;
    SettingPage: undefined;
};

interface Profile {
    id: string;
    imageUrl: string;
    name: string;
}

type NavigationProps = NavigationProp<RootStackParamList>;

const FriendListPage = () => {
    const navigation = useNavigation<NavigationProps>();
    const [showInput, setShowInput] = useState(false);
    const [showFriendInput, setShowFriendInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [inputFriendIDValue, setinputFriendIDValue] = useState('');
    const [selectedFriend, setSelectedFriend] = useState<Profile | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const friendShipCreateMutation = useFriendShipCreateMutation();
    const friendShipDeleteMutation = useFriendShipDeleteMutation();
    const friendShipListMutation = useFriendShipListMutation();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [filteredProfiles, setFilteredProfiles] = useState(profiles);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const friendSlideAnim = useRef(new Animated.Value(0)).current;
    const [refreshFlag, setRefreshFlag] = useState(0);
    const { user } = useUserStore();

    useEffect(() => {
        console.log('User information:', user);
        const fetchFriendList = async () => {
            try {
                const response = await friendShipListMutation.mutateAsync(user!.userId);
                console.log('Friend list response:', response);

                if (response === "친구 없음") {
                    return;
                }

                if (Array.isArray(response)) {
                    const transformedResponse = response.map(user => ({
                        ...user,
                        id: user.id.toString(),
                    }));
                    setProfiles(transformedResponse);
                    setFilteredProfiles(transformedResponse);
                    console.log('Profiles updated:', transformedResponse);
                } else {
                    console.error('Unexpected response format:', response);
                }
            } catch (error) {
                console.error('Error fetching friend list:', error);
            }
        };
        fetchFriendList();
    }, [user, refreshFlag]);

    const navigateToMyPage = () => {
        navigation.navigate('MyPage');
    };

    const navigateToSettingPage = () => {
        navigation.navigate('SettingPage');
    };

    const handleShowInput = () => {
        setShowInput(prevShowInput => !prevShowInput);
        Animated.timing(slideAnim, {
            toValue: showInput ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleShowFriendInput = () => {
        setShowFriendInput(prevShowFriendInput => !prevShowFriendInput);
        Animated.timing(friendSlideAnim, {
            toValue: showFriendInput ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleInputChange = (text: string) => {
        setInputValue(text);
        const filtered = profiles.filter(profile => profile.name.toLowerCase().includes(text.toLowerCase()));
        setFilteredProfiles(filtered);
    };

    const handleInputFriendIdChange = (text: string) => {
        setinputFriendIDValue(text);
    };

    const slideDown = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 0],
    });

    const friendSlideDown = friendSlideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 0],
    });

    const handleFriendCreate = async () => {
        if (user!.userId === inputFriendIDValue) {
            alert("자기자신은 추가할 수 없습니다.");
            return;
        }
        try {
            const response = await friendShipCreateMutation.mutateAsync({
                User1ID: user!.userId,
                User2ID: inputFriendIDValue
            });
            console.log('Friend created:', response);
            setRefreshFlag(prev => prev + 1);
            setShowFriendInput(false);
        } catch (error) {
            console.error('Error CreateFreindShip:', error);
        }
    };

    const handleFriendDelete = async () => {
        if (selectedFriend) {
            try {
                const response = await friendShipDeleteMutation.mutateAsync({
                    User1ID: user!.userId,
                    User2ID: selectedFriend.id
                });
                setRefreshFlag(prev => prev + 1);
                setModalVisible(false);
            } catch (error) {
                console.error('Error CreateFreindShip:', error);
            }
        }
    };

    const openModal = (friend: Profile) => {
        setSelectedFriend(friend);
        setModalVisible(true);
    };

    return (
        <View style={styles.pageContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <PlusIcon onShowInput={handleShowFriendInput} />
                    <SearchIcon onPress={handleShowInput} />
                    <Setting onPress={navigateToSettingPage} />
                </View>
                <View style={styles.largeProfile}>
                    <Profile
                        imageUrl={user ? user.file : 'https://placehold.co/50'}
                        name={user ? user.name : 'Guest'}
                        imageSize={60}
                        textSize={20}
                        onPress={navigateToMyPage}
                    />
                </View>
                {showInput && (
                    <Animated.View style={[styles.inputContainer, { transform: [{ translateY: slideDown }] }]}>
                        <TextInput
                            style={styles.input}
                            value={inputValue}
                            onChangeText={handleInputChange}
                            placeholder="Search"
                        />
                    </Animated.View>
                )}
                {showFriendInput && (
                    <Animated.View style={[styles.friendInputContainer, { transform: [{ translateY: friendSlideDown }] }]}>
                        <TextInput
                            style={styles.friendInput}
                            value={inputFriendIDValue}
                            onChangeText={handleInputFriendIdChange}
                            placeholder="friend ID"
                        />
                        <TouchableOpacity
                            onPress={handleFriendCreate}
                            style={styles.addButton}
                            disabled={!inputFriendIDValue}
                        >
                            <Text style={[
                                styles.addButtonText,
                                { color: inputFriendIDValue ? 'black' : 'gray' }
                            ]}>추가</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}
                <Animated.ScrollView style={[styles.smallProfilesContainer, { transform: [{ translateY: slideDown }] }]}>
                    {filteredProfiles.map(profile => (
                        <View key={profile.id} style={styles.profileContainer}>
                            <Profile
                                imageUrl={profile.imageUrl}
                                name={profile.name}
                                imageSize={40}
                                textSize={14}
                                style={styles.smallProfile}
                            />
                            <TouchableOpacity onPress={() => openModal(profile)} style={styles.settingIcon}>
                                <FontAwesome name="ellipsis-v" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </Animated.ScrollView>
            </View>
            <BottomTab currentPage="FriendListPage" />
            {selectedFriend && (
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>친구 정보</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <FontAwesome name="times" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <Profile
                                imageUrl={selectedFriend.imageUrl}
                                name={selectedFriend.name}
                                imageSize={60}
                                textSize={20}
                            />
                            <View style={{ flex: 1 }} />
                            <TouchableOpacity onPress={handleFriendDelete} style={styles.deleteButton}>
                                <Text style={styles.deleteButtonText}>친구 삭제</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            )}
        </View>
    );
};

export default FriendListPage;