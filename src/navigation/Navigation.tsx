import GetStarted from '@features/auth/GetStarted';
import LoginScreen from '@features/auth/LoginScreen';
import SplashScreen from '@features/auth/SplashScreen';
import HomeScreen from '@features/home/HomeScreen';
import AnimatedTab from '@features/tabs/AnimatedTab';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { navigationRef } from '@utils/NavigationUtils';
import {FC} from 'react';
import ProfileScreen from '@screen/profile/ProfileScreen'
import NotificationScreen from '@screen/notification/NotificationScreen';
import MvitScreen from '@screen/mvit/MvitScreen';
import VtuScreen from '@screen/vtu/VtuScreen';
import CircularScreen from '@screen/vtu/CircularScreen';
import SyllabusScreen from '@screen/vtu/SyllabusScreen';
import PreviousPapersScreen from '@screen/vtu/PreviousPapersScreen';
import AddEvents from '@features/events/AddEvents';
import CreatePostScreen from '@features/feed/CreatePostScreen';
import ClubDetailScreen from '@features/club/ClubDetailScreen';
import { RootStackParamList } from '@utils/naviagtionTypes';
const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen 
            options={{
                animation:"fade"
            }}
            name="LoginScreen"
            component={LoginScreen}
        />
        <Stack.Screen 
            options={{
                animation:"fade"
            }}
            name="GetStarted"
            component={GetStarted}
        />
        <Stack.Screen 
            options={{
                animation:"fade"
            }}
            name="HomeScreen"
            component={HomeScreen}
        />
        <Stack.Screen 
            options={{
                animation:"fade"
            }}
            name="AnimatedTab"
            component={AnimatedTab}
        />
        <Stack.Screen 
            options={{
                animation:"fade"
            }}
            name="ProfileScreen"
            component={ProfileScreen}
        />
        <Stack.Screen 
            options={{
                animation:"fade"
            }}
            name="Notification"
            component={NotificationScreen}
        />
        <Stack.Screen 
            options={{
                animation:"fade"
            }}
            name="MvitScreen"
            component={MvitScreen}
        />
        <Stack.Screen 
            options={{
                animation:"fade"
            }}
            name="VtuScreen"
            component={VtuScreen}
        />
        <Stack.Screen 
            options={{
                animation:"fade"
            }}
            name="CircularScreen"
            component={CircularScreen}
        />
        <Stack.Screen 
            options={{
                animation:"fade"
            }}
            name="SyllabusScreen"
            component={SyllabusScreen}
        />
        <Stack.Screen 
            options={{
                animation:"fade"
            }}
            name="PreviousPapersScreen"
            component={PreviousPapersScreen}
        />
        <Stack.Screen 
            options={{
                animation:"fade"
            }}
            name="AddEvents"
            component={AddEvents}
        />
        <Stack.Screen 
            options={{
                animation:"fade"
            }}
            name="CreatePostScreen"
            component={CreatePostScreen}
        />
        <Stack.Screen 
            options={{
                animation:"fade"
            }}
            name="ClubDetailScreen"
            component={ClubDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
