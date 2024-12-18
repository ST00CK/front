import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen1 from './main/mainPage';
import ChatScreen1 from './chat/chatPage';
import LoginScreen from './login/loginPage';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={MainScreen1} options={{ title: 'Main' }} />
      <Tab.Screen name="Chat" component={ChatScreen1} options={{ title: 'Chat' }} />
      <Tab.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
    </Tab.Navigator>
  );
}
