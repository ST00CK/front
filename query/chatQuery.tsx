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
            console.log(createRoomData);
            const response = await axios.post(`${API_URL}/api/chatroom/create`,
                createRoomData
            ,{
                headers: {
                    'Content-Type': 'application/json',
                  },
            })
            return response;
        },
        onSuccess(data){
            console.log(data);
            alert("채팅방 생성 완료")
        }
    })
}

interface DeleteRoomData{
    roomId:string,
    userId:string
}

//채팅방 삭제(개발자 모드 네트워크에서 CORS에러 뜨는데 로그 확인 필요....ㅠㅠ)
export const useDeleteRoomMutation = () : UseMutationResult<string, unknown, DeleteRoomData , unknown> => {
    return useMutation({
        mutationFn: async(deleteRoomdata:DeleteRoomData) =>{
            const response = await axios.delete(`${API_URL}/api/chatroom/exit`,{
                data: deleteRoomdata,
            });
            return response;
        },
        onSuccess(data){
            console.log(data);
            alert("채팅방 삭제")
        }
    })
}