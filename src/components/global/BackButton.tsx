// components/common/BackButton.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '@components/global/CustomText';
import { Colors } from '@unistyles/Constants';

interface BackButtonProps {
  onPress: () => void;
  label?: string;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  style?: ViewStyle;
}

const BackButton = ({
  onPress,
  label = 'Back',
  iconName = 'arrow-back',
  iconSize = 24,
  iconColor = Colors.black,
  style,
}: BackButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
      <CustomText
        variant="h6"
        fontFamily="Okra-Medium"
        style={styles.label}
        color={iconColor}
      >
        {label}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingRight: 16,
    alignSelf: 'flex-start',
  },
  label: {
    marginLeft: 8,
    bottom: 3, // Adjust for perfect vertical alignment
  },
});

export default BackButton;