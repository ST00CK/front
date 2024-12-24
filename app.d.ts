//Expo Router에서 navigation.navigate가 작동하려면 TypeScript가 경로를 인식해야 합니다. 이를 위해 expo-router의 타입 정의를 업데이트해야 합니다.

// app.d.ts
import { StaticRoutes } from 'expo-router';

declare module 'expo-router' {
    export interface RootStackParamList extends StaticRoutes {
        friendListPage: undefined; // friendListPage 경로 추가
    }
}
