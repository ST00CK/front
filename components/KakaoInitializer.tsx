import React, { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';

const KakaoInitializer: React.FC = () => {
  const [kakaoInitialized, setKakaoInitialized] = useState(false);

  const API_KEY = process.env.REACT_APP_STOOCK_KAKAO_API_KEY;

  useEffect(() => {
    // Expo Web 환경에서만 실행 (네이티브 환경에서는 window 객체가 없으므로)
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      if (!window.Kakao) {
        // Kakao SDK가 아직 로드되지 않았다면 동적으로 스크립트를 추가합니다.
        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
        script.async = true;
        script.onload = () => {
          // 스크립트 로드 후, Kakao SDK가 정의되어 있으면 초기화합니다.
          if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(`${API_KEY}`);
            console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
            setKakaoInitialized(true);
          }
        };
        document.head.appendChild(script);
      } else {
        // 이미 로드된 경우
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(`${API_KEY}`);
        }
        setKakaoInitialized(true);
      }
    }
  }, []);

  return null
};

export default KakaoInitializer;
