import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, TextInput, Animated, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Profile from '../components/stoock/Common/Profile';
import PlusIcon from '../components/stoock/Common/PlusIcon';
import SearchIcon from '../components/stoock/Common/SearchIcon';
import { useUsersQuery, User } from '../query/userQuery';
import styles from '../styles/FriendListPageStyles';

type RootStackParamList = {
    FriendListPage: undefined;
    MyPage: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;

const FriendListPage = () => {
    const navigation = useNavigation<NavigationProps>();
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [filteredProfiles, setFilteredProfiles] = useState<User[]>([]);
    const slideAnim = useRef(new Animated.Value(0)).current;

    const { data, isLoading, error } = useUsersQuery();

    useEffect(() => {
        if (data) {
            setFilteredProfiles(data);
        }
    }, [data]);

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
        if (data) {
            const filtered = data.filter(profile =>
                profile.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredProfiles(filtered);
        }
    };

    if (isLoading) {
        return <View><Text>Loading...</Text></View>;
    }

    if (error) {
        return <View><Text>Error loading users</Text></View>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <PlusIcon onShowInput={() => {}} />
                <SearchIcon onPress={handleShowInput} />
            </View>
            <View style={styles.largeProfile}>
                <Profile
                    imageUrl="https://via.placeholder.com/50"
                    name="Ryan Reynolds"
                    imageSize={60}
                    textSize={20}
                    onPress={() => navigation.navigate('MyPage')}
                />
            </View>
            {showInput && (
                <Animated.View style={[styles.inputContainer, { transform: [{ translateY: slideAnim }] }]}>
                    <TextInput
                        style={styles.input}
                        value={inputValue}
                        onChangeText={handleInputChange}
                        placeholder="Search"
                    />
                </Animated.View>
            )}
            <ScrollView style={styles.smallProfilesContainer}>
                {filteredProfiles.map((profile) => (
                    <Profile
                        key={profile.id}
                        imageUrl={profile.profileImage}
                        name={profile.name}
                        imageSize={40}
                        textSize={14}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default FriendListPage;