import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '@unistyles/Constants';

type SearchBarProps = {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
};

const SearchBar = ({
  placeholder = 'Search...',
  value,
  onChangeText,
  onClear,
}: SearchBarProps) => {
  return (
    <View style={styles.searchContainer}>
      <Icon
        name="search"
        size={24}
        color={Colors.textTertiary}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={Colors.textTertiary}
        value={value}
        onChangeText={onChangeText}
      />
      {value ? (
        <TouchableOpacity onPress={onClear}>
          <Icon name="close" size={24} color={Colors.textTertiary} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginVertical: 16,
    elevation: 3,
    shadowColor: Colors.darkCard,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: Colors.textPrimary,
    fontFamily: 'Okra-Regular',
    fontSize: 16,
  },
});

export default SearchBar;