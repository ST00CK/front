import axios from 'axios';
import { useQuery, UseQueryResult, useMutation, UseMutationResult } from '@tanstack/react-query';
import { useUserStore } from '../store/useUserStore';

const API_URL = process.env.REACT_APP_STOOCK_USER_API_URL;

export interface User {
    id: number;
    name: string;
    profileImage: string;
}

// 사용자 정보 조회
export const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get(`${API_URL}/find/user`);
    return response.data;
};

// 사용자 정보를 조회하는 React Query 훅
export const useUsersQuery = (): UseQueryResult<User[], unknown> => {
    const { setUsers } = useUserStore();

    const queryResult = useQuery<User[], unknown>({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    // 데이터가 성공적으로 로드되면 zustand 상태 업데이트
    if (queryResult.data) {
        setUsers(queryResult.data);
    }

    return queryResult;
};

//이메일 인증 mutation
export const useEmailSendMutation = async (email: string) => {
    const response = await axios.post(`${API_URL}/user/send`, {
        email
    });

    return response.data;
};

//이메일 확인 코드 검증
export const useEmailCheckMutation = async (email: string, authCode: string) => {
    const response = await axios.post(`${API_URL}/user/verify`, {
        email,
        authCode
    });

    return response.data;
};

// 회원가입 데이터 타입
export interface SignUpData {
    userId: string;
    name: string;
    email: string;
    password: string;
}

//회원가입 mutation
export const useSignUpMutation = (): UseMutationResult<{ message: string }, unknown, SignUpData> => {
    return useMutation({
        mutationFn: async (data: SignUpData) => {
            const response = await axios.post(`${API_URL}/formuser`, {
                formUserDto: {
                    userId: data.userId,
                    passwd: data.password,
                },
                userDto: {
                    userId: data.userId,
                    name: data.name,
                    email: data.email,
                },
            },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true, // 쿠키 허용
                }
            );
            return response.data;
        }
    });
};

//로그인 데이터 타입
export interface LoginData {
    userId: string;
    password: string;
}

//로그인 mutation
export const useLoginMutation = (): UseMutationResult<{ message: string }, unknown, LoginData> => {
    const { setUser } = useUserStore();
    return useMutation({
        mutationFn: async (data: LoginData) => {
            const response = await axios.post(`${API_URL}/login`, {
                userId: data.userId,
                passwd: data.password,
            },
                {
                    withCredentials: true, // 쿠키 허용
                }
            );
            return response.data;
        },
        onSuccess: (data) => {
            alert(data.message);

            const { file, name, userId, email } = data;
            setUser({ file, name, userId, email });
        }
    })
}

//카카오 로그인 데이터 타입
export interface KakaoAuthResponse {
    access_token: string;
    refresh_token: string;
}

//카카오 로그인 mutation
export const useKakaoLoginMutation = (): UseMutationResult<{ message: string },  unknown,  void, unknown> => {
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: async (): Promise<any> => {
      // Kakao 로그인 API 호출: Promise를 통해 Kakao 로그인 결과를 받음
      const authObj = await new Promise<KakaoAuthResponse>((resolve, reject) => {
        window.Kakao.Auth.login({
          success: resolve,
          fail: reject,
        });
      });

      const accessToken = authObj.access_token;
      const refreshToken = authObj.refresh_token;

      if (!accessToken) {
        throw new Error("No access token received from Kakao");
      }

      console.log("accessToken:", accessToken);
      console.log("refreshToken:", refreshToken);

      // 로그인 후 액세스 토큰과 리프레시 토큰을 Kakao SDK 및 쿠키에 설정
      window.Kakao.Auth.setAccessToken(accessToken, refreshToken);
      document.cookie = `refresh_token=${refreshToken}; path=/; SameSite=Strict`;
      console.log("설정된 쿠키:", document.cookie);

      // 액세스 토큰을 헤더에 포함시켜 서버에 카카오 토큰을 전송
      const response = await axios.post(
        `${API_URL}/api/kakao-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log("서버 응답:", response.data);

      // 서버 응답 데이터를 반환
      return response.data;
    },
    onSuccess: (data) => {
      // 로그인 성공 시, 반환된 메시지를 alert로 출력
      alert(data.message);

      // 필요한 속성만 추출하여 user store 업데이트
      const { file, name, userId, email } = data;
      setUser({ file, name, userId, email });
    },
  });
}