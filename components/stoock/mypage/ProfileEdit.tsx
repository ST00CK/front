import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import styles from '../../../styles/MyPageStyles';

interface ProfileEditProps {
  user: {
    file: string;
    name: string;
    email: string;
  };
  newImage: string;
  isChanged: boolean;
  handleImageChange: () => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ user, newImage, isChanged, handleImageChange }) => {
  return (
    <View style={styles.profileContainer}>
      {user && <Image source={{ uri: isChanged ? newImage : user.file }} style={styles.profileImage} />}
      <View style={styles.userInfo}>
        {user && <Text style={styles.userName}>{user.name}</Text>}
        {user && <Text style={styles.userEmail}>{user.email}</Text>}
      </View>
      <TouchableOpacity onPress={handleImageChange}>
        <Text style={styles.editText}>사진변경</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileEdit;