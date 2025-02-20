import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, TextInput, Animated } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Profile from '../components/stoock/Common/Profile';
import SearchIcon from '../components/stoock/Common/SearchIcon';
import Setting from '../components/stoock/Common/Setting';
import BottomTab from '../components/stoock/Common/BottomTab';
import ShortButton from '../components/stoock/Common/ShortButton';
import styles from '../styles/FriendListPageStyles';
import { useUserStore } from '../store/useUserStore';
import { useFriendShipCreateMutation, useFriendShipDeleteMutation, useFriendShipListMutation }from '@/query/friendQuery';

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
    const [inputFriendIDValue, setinputFriendIDValue] = useState('');
    const friendShipCreateMutation = useFriendShipCreateMutation();
    const friendShipDeleteMutation = useFriendShipDeleteMutation();
    const friendShipListMutation = useFriendShipListMutation();
    const [profiles, setProfiles] = useState([

    ]);
    const [filteredProfiles, setFilteredProfiles] = useState(profiles);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const [refreshFlag, setRefreshFlag] = useState(0);
    const { user } = useUserStore();

    useEffect(() => {
        console.log('User information:', user);
        const fetchFriendList = async () => {
            try{
                const response = await friendShipListMutation.mutateAsync(
                    user!.userId
                );
                
                if(response=="친구 없음"){
                    return
                }
                console.log("Response:", response);
                // response가 이미 배열이라면 배열로 감싸지 말고 그대로 넣습니다.
                setProfiles(response);
                setFilteredProfiles(response);
                // 상태 업데이트는 비동기이므로, 바로 console.log(profiles)는 이전 값일 수 있습니다.
            }catch(error){
                console.error('Error CreateFreindShip : ' , error)
            }
        }
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

    const handleInputChange = (text: string) => {
        setInputValue(text);
        const filtered = profiles.filter(profile => profile.name.toLowerCase().includes(text.toLowerCase()));
        setFilteredProfiles(filtered);
    };

    //친구 추가,삭제 입력창
    const handleInputFriendIdChange = (text: string) => {
        setinputFriendIDValue(text);
    };

    const slideDown = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 0],
    });

    //친구추가(자기 자신은 안되게 해야함)
    const handleFriendCreate = async() =>{
        if(user!.userId === inputFriendIDValue){
            alert("자기자신은 추가할 수 없습니다.")
            return;
        }
        try{
            const response = await friendShipCreateMutation.mutateAsync({
                User1ID: user!.userId,
                User2ID: inputFriendIDValue
            });
            setRefreshFlag(prev => prev + 1);
        }catch(error){
            console.error('Error CreateFreindShip : ' , error)
        }
    }

    //친구삭제
    const handleFriendDelete = async() =>{
        try{
            const response = await friendShipDeleteMutation.mutateAsync({
                User1ID: user!.userId,
                User2ID: inputFriendIDValue
            });
            setRefreshFlag(prev => prev + 1);
        }catch(error){
            console.error('Error CreateFreindShip : ' , error)
        }
    }

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
                <ShortButton
                    text="친구추가"
                    onClick={handleFriendCreate}
                />
                <ShortButton
                    text="친구삭제"
                    onClick={handleFriendDelete}
                />
                <TextInput
                            style={styles.input}
                            value={inputFriendIDValue}
                            onChangeText={handleInputFriendIdChange}
                            placeholder="friend ID"
                />
            </View>
            <BottomTab currentPage="FriendListPage" />
        </View>
    );
};
export default FriendListPage;