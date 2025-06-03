// components/global/SearchBar.tsx
import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '@unistyles/Constants';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

const SearchBar = ({value, onChangeText, placeholder = 'Search...'}: Props) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={Colors.textTertiary}
        value={value}
        onChangeText={onChangeText}
      />
      <Icon
        name="search"
        size={24}
        color={Colors.textSecondary}
        style={styles.searchIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 45,
    paddingVertical: 15,
    fontSize: 16,
    fontFamily: 'Okra-Regular',
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    top: 18,
  },
});

export default SearchBar;
