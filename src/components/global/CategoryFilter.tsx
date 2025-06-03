// components/global/CategoryFilter.tsx
import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import CustomText from './CustomText'; // Update if path differs
import {Colors} from '@unistyles/Constants';

type Props = {
  categories: string[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
  style?: ViewStyle;
};

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelect,
  style,
}: Props) => {
  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={item => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.categoryContainer, style]}
      renderItem={({item}) => {
        const isSelected = selectedCategory === item;
        return (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              isSelected && styles.selectedCategory,
            ]}
            onPress={() => onSelect(item === 'All' ? null : item)}>
            <CustomText
              variant="h7"
              fontFamily="Okra-Medium"
              style={[
                styles.categoryText,
                isSelected ? styles.selectedCategoryText : styles.categoryText,
              ]}>
              {item}
            </CustomText>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    paddingBottom: 15,
    flex: 1,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedCategory: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    color: Colors.textSecondary,
  },
  selectedCategoryText: {
    color: Colors.white,
  },
});

export default CategoryFilter;
