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

// 회원가입을 위한 mutation
export interface SignUpData {
    userId: string;
    name: string;
    email: string;
    password: string;
}

export const useSignUpMutation = (): UseMutationResult<void, unknown, SignUpData> => {
    return useMutation(async (data: SignUpData) => {
        const response = await axios.post(`${API_URL}/user/formuser`, {
            formUserDto: {
                userId: data.userId,
                passwd: data.password,
            },
            userDto: {
                userId: data.userId,
                name: data.name,
                email: data.email,
                file: '', // 필요에 따라 추가
            },
        });
        return response.data;
    });
};
