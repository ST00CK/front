import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
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