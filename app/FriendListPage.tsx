import React, { useState } from 'react';
import { View, ScrollView, TextInput, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Profile from '../components/stoock/Common/Profile';
import SearchIcon from '../components/stoock/Common/SearchIcon';
import styles from '../styles/FriendListPageStyles';

const FriendListPage = () => {
    const navigation = useNavigation();
    const [inputValue, setInputValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showInput, setShowInput] = useState(false);
    const slideDown = new Animated.Value(0);

    const profiles = [
        { id: 1, name: 'Ryan Reynolds', imageUrl: 'https://via.placeholder.com/50' },
        { id: 2, name: 'Chris Evans', imageUrl: 'https://via.placeholder.com/50' },
        { id: 3, name: 'Scarlett Johansson', imageUrl: 'https://via.placeholder.com/50' },
        { id: 4, name: 'Robert Downey Jr.', imageUrl: 'https://via.placeholder.com/50' },
    ];

    const handleInputChange = (text: string) => {
        setInputValue(text);
    };

    const handleSearchChange = (text: string) => {
        setSearchQuery(text);
    };

    const filteredProfiles = profiles.filter(profile =>
        profile.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const navigateToMyPage = () => {
        navigation.navigate('MyPage');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Profile
                    imageUrl="https://via.placeholder.com/50"
                    name="Ryan Reynolds"
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
                        placeholder="input"
                    />
                </Animated.View>
            )}
            <SearchIcon
                placeholder="Search"
                onChangeText={handleSearchChange}
                value={searchQuery}
                containerStyle={styles.searchContainer}
                inputStyle={styles.searchInput}
            />
            <ScrollView style={styles.smallProfilesContainer}>
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
            </ScrollView>
        </View>
    );
};

export default FriendListPage;