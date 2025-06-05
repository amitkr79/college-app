import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomText from '@components/global/CustomText';
import {Colors, Fonts} from '@unistyles/Constants';

interface DropdownItem {
  label: string;
  value: string;
}

interface SyllabusDropdownProps {
  label: string;
  data: DropdownItem[];
  value: string | null;
  onChange: (item: DropdownItem) => void;
  isFocus: boolean;
  setIsFocus: (focus: boolean) => void;
  iconName: string;
  search?: boolean;
  placeholder?: string;
}

const SyllabusDropdown: React.FC<SyllabusDropdownProps> = ({
  label,
  data,
  value,
  onChange,
  isFocus,
  setIsFocus,
  iconName,
  search = false,
  placeholder,
}) => {
  const renderItem = (item: DropdownItem) => {
    return (
      <View style={styles.item}>
        <CustomText
          variant="h5"
          fontFamily="Okra-Regular"
          fontSize={10}
          style={styles.textItem}>
          {item.label}
        </CustomText>
        {item.value === value ? (
          <Icon name="check" size={20} color={Colors.primary} />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.dropdownWrapper}>
      <CustomText variant="h7" fontFamily="Okra-Light" style={styles.label}>
        {label}
      </CustomText>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: Colors.primary}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={search}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder || `Select ${label}` : '...'}
        searchPlaceholder={`Search ${label.toLowerCase()}...`}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={onChange}
        renderItem={renderItem}
        renderLeftIcon={() => (
          <Icon
            name={iconName}
            size={20}
            color={isFocus ? Colors.primary : Colors.textTertiary}
            style={styles.leftIcon}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownWrapper: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 8,
    color: Colors.textPrimary,
  },
  dropdown: {
    height: 50,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
  },
  placeholderStyle: {
    fontSize: 14,
    color: Colors.textTertiary,
    fontFamily: Fonts.Regular,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontFamily: Fonts.Medium,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    color: Colors.textPrimary,
    fontFamily: Fonts.Regular,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  leftIcon: {
    marginRight: 8,
  },
  item: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    color: Colors.textPrimary,
  },
});

export default SyllabusDropdown;