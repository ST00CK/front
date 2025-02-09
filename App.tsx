import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import KakaoInitializer from './components/KakaoInitializer';

// QueryClient 생성
const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <KakaoInitializer />
        </QueryClientProvider>
    );
};

export default App;