import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useUserStore } from '../store/useUserStore';
import { useProfileImageMutation } from '../query/userQuery';
import styles from '../styles/MyPageStyles';
import ProfileEdit from '../components/stoock/mypage/ProfileEdit';

const MyPage = () => {
  const { user, updateUser } = useUserStore();
  const [newImage, setNewImage] = useState(user?.file || '');
  const [isChanged, setIsChanged] = useState(false);
  const mutation = useProfileImageMutation();

  const handleImageChange = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
      setIsChanged(true);
    }
  };

  const handleSubmit = () => {
    if (isChanged && user) {
      console.log("Submitting with:", { userId: user.userId.toString(), file: newImage });
      mutation.mutate({ userId: user.userId.toString(), file: newImage }, {
        onSuccess: (data) => {
          updateUser({ file: data.fileUrl });
          setIsChanged(false);
        },
        onError: (error) => {
          console.error("Error uploading image:", error);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>내정보</Text>
      {user && (
        <ProfileEdit 
          user={user} 
          newImage={newImage} 
          isChanged={isChanged} 
          handleImageChange={handleImageChange} 
        />
      )}
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={[styles.submitButton, isChanged ? styles.submitButtonActive : styles.submitButtonInactive]}
        onPress={handleSubmit}
        disabled={!isChanged}
      >
        <Text style={styles.submitButtonText}>제출</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyPage;