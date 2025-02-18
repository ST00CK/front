import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useUserStore } from '../store/useUserStore';
import { useProfileImageMutation, useLogInChangePassWordMutation } from '../query/userQuery';
import styles from '../styles/MyPageStyles';
import ProfileEdit from '../components/stoock/mypage/ProfileEdit';

// base64 문자열을 File 객체로 변환하는 함수 (웹 환경 전용)
function base64ToFile(base64: string, fileName: string, mimeType: string): File {
  const parts = base64.split(',');
  const byteString = atob(parts[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  return new File([uint8Array], fileName, { type: mimeType });
}

const MyPage = () => {
  const { user, updateUser } = useUserStore();
  const [newImage, setNewImage] = useState(user?.file || '');
  const [isChanged, setIsChanged] = useState(false);
  const [isPasswordChangeVisible, setIsPasswordChangeVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const mutation = useProfileImageMutation();
  const changePasswordMutation = useLogInChangePassWordMutation();

  const handleImageChange = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: Platform.OS === 'web',
    });

    if (!result.canceled) {
      if (Platform.OS === 'web' && result.assets[0].base64) {
        setNewImage(`data:${result.assets[0].type};base64,${result.assets[0].base64}`);
      } else {
        setNewImage(result.assets[0].uri);
      }
      setIsChanged(true);
    }
  };

  const handleSubmit = async () => {
    if (isChanged && user) {
      let fileData: File | { uri: string; name: string; type: string };

      if (Platform.OS === 'web') {
        try {
          fileData = base64ToFile(newImage, 'profile.jpg', 'image/jpeg');
        } catch (error) {
          console.error('Error converting base64 to File:', error);
          return;
        }
      } else {
        fileData = {
          uri: newImage,
          name: 'profile.jpg',
          type: 'image/jpeg',
        };
      }

      mutation.mutate(
        { userId: user.userId.toString(), file: fileData },
        {
          onSuccess: (data) => {
            updateUser({ file: data.fileUrl });
            setIsChanged(false);
          },
          onError: (error) => {
            console.error("Error uploading image:", error);
          }
        }
      );
    }
  };

  const handlePasswordChange = () => {
    setIsPasswordChangeVisible(!isPasswordChangeVisible);
  };

  const handlePasswordSubmit = async () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(newPassword)) {
      setPasswordError('비밀번호에 특수문자가 포함되어야 합니다.');
      return;
    } else {
      setPasswordError('');
    }

    if (user) {
      changePasswordMutation.mutate(
        { userId: user.userId.toString(), oldPassword: '', newPassword: newPassword },
        {
          onSuccess: () => {
            setNewPassword('');
            setConfirmNewPassword('');
            setIsPasswordChangeVisible(false);
          },
          onError: (error) => {
            console.error("Error changing password:", error);
          }
        }
      );
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
      <TouchableOpacity
        style={styles.passwordChangeButton}
        onPress={handlePasswordChange}
      >
        <Text style={styles.passwordChangeButtonText}>비밀번호 변경</Text>
      </TouchableOpacity>
      {isPasswordChangeVisible && (
        <View style={styles.passwordChangeContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="새로운 비밀번호"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.passwordInput}
            placeholder="새로운 비밀번호 확인"
            secureTextEntry
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
          />
          {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
          <TouchableOpacity
            style={styles.passwordSubmitButton}
            onPress={handlePasswordSubmit}
          >
            <Text style={styles.passwordSubmitButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
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