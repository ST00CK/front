import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/Stack';
import LoginPage from './login/loginPage';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        {/* 다른 페이지들 추가 가능 */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
