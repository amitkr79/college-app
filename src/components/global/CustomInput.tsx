import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React, {FC} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Fonts} from '@unistyles/Constants';

interface InputProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  type?: 'email' | 'password' | 'text';
}

const CustomInput: FC<InputProps & React.ComponentProps<typeof TextInput>> = ({
  left,
  right,
  containerStyle,
  inputStyle,
  type = 'text',
  ...props
}) => {
  return (
    <View style={[styles.flexRow, containerStyle]}>
      {left && <View style={styles.left}>{left}</View>}

      <TextInput
        {...props}
        style={[styles.inputContainer, inputStyle]}
        placeholderTextColor="#ccc"
        secureTextEntry={type === 'password'}
      />

      {right && <View style={styles.right}>{right}</View>}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderColor: Colors.border,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowColor: Colors.border,
    elevation:4
  },
  left: {
    marginLeft: 10,
  },
  right: {
    marginRight: 10,
  },
  inputContainer: {
    flex: 1,
    fontFamily: Fonts.SemiBold,
    fontSize: RFValue(12),
    paddingVertical: 14,
    paddingHorizontal: 5,
    color: Colors.text,
  },
});
