import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@unistyles/Constants';
import Icon from './Icon'; // Import your Icon component and its props

interface CustomButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  buttonStyle?: ViewStyle | ViewStyle[];
  children?: React.ReactNode; // ✅ Support custom children like <CustomText>
  icon?: {
    name: string;
    size?: number;
    color?: string;
    iconFamily: 'Ionicons' | 'MaterialCommunityIcons' | 'MaterialIcons';
    position?: 'left' | 'right';
    style?: ViewStyle;
  };
}
const CustomButton: FC<CustomButtonProps> = ({
  onPress,
  disabled = false,
  loading = false,
  buttonStyle,
  children,
  icon,
  ...props
}) => {
  const iconColor = icon?.color || '#fff';
  const iconSize = icon?.size || 20;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.btn,
        {
          backgroundColor: disabled ? Colors.disabled : Colors.secondary,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        buttonStyle,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <View style={styles.contentContainer}>
          {icon?.position !== 'right' && icon && (
            <Icon
              name={icon.name}
              size={iconSize}
              color={iconColor}
              iconFamily={icon.iconFamily}
              style={[styles.leftIcon, icon.style]}
            />
          )}
          {children}
          {icon?.position === 'right' && icon && (
            <Icon
              name={icon.name}
              size={iconSize}
              color={iconColor}
              iconFamily={icon.iconFamily}
              style={[styles.rightIcon, icon.style]}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginVertical: 25,
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    marginHorizontal: 8, // Space between icon and text
  },
  leftIcon: {
    marginRight: 8, // Space after left icon
  },
  rightIcon: {
    marginLeft: 8, // Space before right icon
    // left:60,
  },
});

export default CustomButton;
