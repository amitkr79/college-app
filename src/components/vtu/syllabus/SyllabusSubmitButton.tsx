import React from 'react';
import {View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';

interface SyllabusSubmitButtonProps {
  loading: boolean;
  disabled: boolean;
  onPress: () => void;
  text: string;
}

const SyllabusSubmitButton: React.FC<SyllabusSubmitButtonProps> = ({
  loading,
  disabled,
  onPress,
  text,
}) => {
  return (
    <TouchableOpacity
      style={[styles.submitButton, disabled && styles.submitButtonDisabled]}
      disabled={disabled}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.white} />
      ) : (
        <>
          <CustomText
            variant="h5"
            fontFamily="Okra-Light"
            fontSize={13}
            style={styles.submitButtonText}>
            {text}
          </CustomText>
          <Icon name="arrow-forward" size={20} color={Colors.white} style={{left:120}} />
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
    opacity: 0.9,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: Colors.white,
    marginRight: 8,
  },
});

export default SyllabusSubmitButton;