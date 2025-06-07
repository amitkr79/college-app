import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from '@features/home/HomeScreen';
import JobScreen from '@features/jobs/screens/JobScreen';
import FeedScreen from '@features/feed/screens/FeedScreen';
import EventScreen from '@features/events/screens/EventScreen';
import ClubScreen from '@features/club/screens/ClubScreen';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

const UserBottomTab = () => {
  return (
    <Tab.Navigator
        tabBar={(props)=><CustomTabBar {...props}/>}
        screenOptions={{
            headerShown:false,
            tabBarHideOnKeyboard:true
        }}
    >
        <Tab.Screen name='Home' component={HomeScreen}/>
        <Tab.Screen name='Job' component={JobScreen}/>
        <Tab.Screen name='Feed' component={FeedScreen}/>
        <Tab.Screen name='Event' component={EventScreen}/>
        <Tab.Screen name='Club' component={ClubScreen}/>
    </Tab.Navigator>
  )
}

export default UserBottomTab