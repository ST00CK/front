import { View, Text, TouchableOpacity,Platform  } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useUserStore } from '../store/useUserStore';
import { useProfileImageMutation } from '../query/userQuery';
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
  const [newImageUri, setnewImageUri] = useState(user?.file || '');
  const [newImage, setNewImage] = useState(user?.file || '');
  const [isChanged, setIsChanged] = useState(false);
  const mutation = useProfileImageMutation();

  const handleImageChange = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      // 웹에서는 base64 옵션을 활성화하여 데이터 얻기
      base64: Platform.OS === 'web',
    });

    if (!result.canceled) {
      if (Platform.OS === 'web' && result.assets[0].base64) {
        // 웹: base64 데이터로 저장
        setNewImage(`data:${result.assets[0].type};base64,${result.assets[0].base64}`);
      } else {
        // 모바일: 단순 URI로 저장
        setNewImage(result.assets[0].uri);
      }
      setIsChanged(true);
    }
  };

  const handleSubmit = async () => {
    if (isChanged && user) {
      let fileData: File | { uri: string; name: string; type: string };

      if (Platform.OS === 'web') {
        // 웹: base64 문자열을 File 객체로 변환
        try {
          fileData = base64ToFile(newImage, 'profile.jpg', 'image/jpeg');
        } catch (error) {
          console.error('Error converting base64 to File:', error);
          return;
        }
      } else {
        // 모바일: React Native의 FormData 전송용 파일 객체 생성
        fileData = {
          uri: newImage,
          name: 'profile.jpg',
          type: 'image/jpeg',
        };
        console.log("image change")
      }

      console.log("Submitting with:", { userId: user.userId.toString(), file: fileData });
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>내정보</Text>
      {user && (
        <ProfileEdit 
          user={user} 
          newImage={newImageUri} 
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