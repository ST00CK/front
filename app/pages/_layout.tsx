import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './main/mainPage';
import ChatScreen from './chat/chatPage';
import LoginScreen from './login/loginPage';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Tab.Screen name="Main" component={MainScreen} options={{ title: 'Main' }} />
      <Tab.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
    </Tab.Navigator>
  );
}