import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_STOOCK_CHAT_API_URL

interface ChatRoomList{
    room : string[];
}


//채팅방 리스트
export const useChatRoomListMutation = (): UseMutationResult<MutationResult, unknown, { userId: string} , unknown> =>{
    return useMutation({
        mutationFn: async(userId) =>{
            console.log(userId);
            const response = await axios.get(`${API_URL}/api/chatroom/list`, {
                params: { userId }
            })
            return response.data;
        },
        onSuccess(data){
            console.log(data);
        }
    })
}

//채팅방 생성 요청 타입
interface CreateChatRoom{
    roomName:string,
    userId:string[]
}

//채팅방 생성 응답 타입
interface CreateRoomResponse {
    message: string;
    roomId: string;
    roomName: string;
    userId: string[];
  }

//채팅방 생성
export const useChatRoomCreateMutation = (): UseMutationResult<CreateRoomResponse, unknown, CreateChatRoom , unknown> =>{
    return useMutation({
        mutationFn: async(createRoomData: CreateChatRoom) =>{
            const response = await axios.post(`${API_URL}/api/chatroom/create`, {
                createRoomData
            })
            return response;
        }
    })
}