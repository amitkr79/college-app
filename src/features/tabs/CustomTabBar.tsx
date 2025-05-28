// CustomTabBar.tsx

import React, { FC } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import TabIcon from './TabIcon';
import { Colors } from '@unistyles/Constants';

const screenWidth = Dimensions.get('window').width;

const CustomTabBar: FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  // Width of each tab
  const tabWidth = screenWidth / state.routes.length;

  // Animated style for the sliding indicator
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(state.index * tabWidth, { duration: 300 }),
        },
      ],
    };
  });

  return (
    <View style={styles.tabBar}>
      {/* Sliding indicator */}
      <Animated.View style={[styles.indicator, { width: tabWidth }, indicatorStyle]} />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            <TabIcon name={label as string} focused={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 80 : 60,
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
    backgroundColor: Colors.background_light,
    position: 'relative',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    height: 3,
    // bottom: 0,
    top:0,
    backgroundColor: '#007bff', // Customize as needed
    borderRadius: 1.5,
  },
});

export default CustomTabBar;
