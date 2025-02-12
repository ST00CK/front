import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, TextInput, Animated } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Profile from '../components/stoock/Common/Profile';
import SearchIcon from '../components/stoock/Common/SearchIcon';
import Setting from '../components/stoock/Common/Setting';
import BottomTab from '../components/stoock/Common/BottomTab';
import styles from '../styles/FriendListPageStyles';
import { useUserStore } from '../store/useUserStore';

type RootStackParamList = {
    FriendListPage: undefined;
    MyPage: undefined;
    SettingPage: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;

const FriendListPage = () => {
    const navigation = useNavigation<NavigationProps>();
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [profiles, setProfiles] = useState([
        { id: 1, name: 'Ryan Reynolds', imageUrl: 'https://placehold.co/50' },
        { id: 2, name: 'Emma Stone', imageUrl: 'https://placehold.co/50' },
        { id: 3, name: 'Chris Evans', imageUrl: 'https://placehold.co/50' },
    ]);
    const [filteredProfiles, setFilteredProfiles] = useState(profiles);
    const slideAnim = useRef(new Animated.Value(0)).current;

    const { user } = useUserStore();

    useEffect(() => {
        console.log('User information:', user);
    }, [user]);

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

    const handleInputChange = (text: string) => {
        setInputValue(text);
        const filtered = profiles.filter(profile => profile.name.toLowerCase().includes(text.toLowerCase()));
        setFilteredProfiles(filtered);
    };

    const slideDown = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 0],
    });

    return (
        <View style={styles.pageContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
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
                <Animated.ScrollView style={[styles.smallProfilesContainer, { transform: [{ translateY: slideDown }] }]}>
                    {filteredProfiles.map(profile => (
                        <Profile
                            key={profile.id}
                            imageUrl={profile.imageUrl}
                            name={profile.name}
                            imageSize={40}
                            textSize={14}
                            style={styles.smallProfile}
                        />
                    ))}
                </Animated.ScrollView>
            </View>
            <BottomTab currentPage="FriendListPage" />
        </View>
    );
};

export default FriendListPage;