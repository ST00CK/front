import React, { useState, useRef } from 'react';
import { View, ScrollView, TextInput, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Profile from '../components/stoock/Common/Profile';
import PlusIcon from '../components/stoock/Common/PlusIcon';
import styles from '../styles/FriendListPageStyles';

const FriendListPage = () => {
    const navigation = useNavigation();
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const slideAnim = useRef(new Animated.Value(0)).current;

    const navigateToMyPage = () => {
        navigation.navigate('MyPage');
    };

    const handleShowInput = () => {
        setShowInput(true);
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleInputChange = (text: string) => {
        setInputValue(text);
    };

    const slideDown = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 0],
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <PlusIcon onShowInput={handleShowInput} />
            </View>
            <View style={styles.largeProfile}>
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
            <ScrollView style={styles.smallProfilesContainer}>
                <Profile imageUrl="https://via.placeholder.com/50" name="Ryan Reynolds" imageSize={40} textSize={14} style={styles.smallProfile} />
                <Profile imageUrl="https://via.placeholder.com/50" name="Ryan Reynolds" imageSize={40} textSize={14} style={styles.smallProfile} />
                <Profile imageUrl="https://via.placeholder.com/50" name="Ryan Reynolds" imageSize={40} textSize={14} style={styles.smallProfile} />
                <Profile imageUrl="https://via.placeholder.com/50" name="Ryan Reynolds" imageSize={40} textSize={14} style={styles.smallProfile} />
                <Profile imageUrl="https://via.placeholder.com/50" name="Ryan Reynolds" imageSize={40} textSize={14} style={styles.smallProfile} />
                <Profile imageUrl="https://via.placeholder.com/50" name="Ryan Reynolds" imageSize={40} textSize={14} style={styles.smallProfile} />
                <Profile imageUrl="https://via.placeholder.com/50" name="Ryan Reynolds" imageSize={40} textSize={14} style={styles.smallProfile} />
                <Profile imageUrl="https://via.placeholder.com/50" name="Ryan Reynolds" imageSize={40} textSize={14} style={styles.smallProfile} />
                <Profile imageUrl="https://via.placeholder.com/50" name="Ryan Reynolds" imageSize={40} textSize={14} style={styles.smallProfile} />
                <Profile imageUrl="https://via.placeholder.com/50" name="Ryan Reynolds" imageSize={40} textSize={14} style={styles.smallProfile} />
                <Profile imageUrl="https://via.placeholder.com/50" name="Ryan Reynolds" imageSize={40} textSize={14} style={styles.smallProfile} />
                <Profile imageUrl="https://via.placeholder.com/50" name="Ryan Reynolds" imageSize={40} textSize={14} style={styles.smallProfile} />
                <Profile imageUrl="https://via.placeholder.com/50" name="Ryan Reynolds" imageSize={40} textSize={14} style={styles.smallProfile} />
            </ScrollView>
        </View>
    );
};

export default FriendListPage;