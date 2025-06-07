import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';

type CategoryBtnProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

const CategoryBtn = ({label, isActive, onPress}: CategoryBtnProps) => (
  <TouchableOpacity
    style={[styles.categoryButton, isActive && styles.activeCategory]}
    onPress={onPress}>
    <CustomText
      variant="h7"
      fontFamily={isActive ? 'Okra-Bold' : 'Okra-Medium'}
      style={isActive ? styles.activeCategoryText : styles.categoryText}>
      {label}
    </CustomText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 6,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeCategory: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    color: Colors.textSecondary,
  },
  activeCategoryText: {
    color: Colors.white,
  },
});

export default CategoryBtn;
