// TabIcon.tsx
import React, { FC, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface TabIconProps {
  name: string;
  focused: boolean;
}

const TabIcon: FC<TabIconProps> = memo(({ name, focused }) => {
  const getIconName = () => {
    switch (name) {
      case 'Home':
        return focused ? 'home' : 'home-outline';
      case 'Job':
        return focused ? 'briefcase' : 'briefcase-outline';
      case 'Feed':
        return focused ? 'newspaper' : 'newspaper-outline';
      case 'Event':
        return focused ? 'calendar' : 'calendar-outline';
      case 'Club':
        return focused ? 'people' : 'people-outline';
      default:
        return 'ellipse';
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name={getIconName()}
        size={24}
        color={focused ? '#1A4D8F' : '#8E8E93'}
      />
      <Text style={[styles.label, { color: focused ? '#007AFF' : '#8E8E93' }]}>
        {name}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    marginTop: 2,
  },
});

export default TabIcon;
