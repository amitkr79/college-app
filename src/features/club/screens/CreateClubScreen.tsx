import React from 'react';
import { View, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from '../../../components/global/CustomText';
import HeaderNav from '../../../components/global/HeaderNav';
import { Colors } from '@unistyles/Constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateClubScreen = () => {
  const categories = ['Academic', 'Cultural', 'Sports', 'Arts', 'Technology', 'Community'];

  return (
    <View style={styles.container}>
      <HeaderNav text="Create New Club" />
      <TouchableOpacity style={styles.createButton}>
        <CustomText
          variant="h6"
          fontFamily="Okra-Medium"
          style={[styles.createButtonText, styles.disabledButton]}
        >
          Create
        </CustomText>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Club Name */}
        <View style={styles.inputGroup}>
          <CustomText variant="h6" fontFamily="Okra-Medium" style={styles.label}>
            Club Name *
          </CustomText>
          <TextInput
            style={styles.input}
            placeholder="Enter club name"
            value=""
          />
        </View>

        {/* Description */}
        <View style={styles.inputGroup}>
          <CustomText variant="h6" fontFamily="Okra-Medium" style={styles.label}>
            Description *
          </CustomText>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Describe your club's purpose and activities"
            value=""
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Category */}
        <View style={styles.inputGroup}>
          <CustomText variant="h6" fontFamily="Okra-Medium" style={styles.label}>
            Category *
          </CustomText>
          <View style={styles.categoryContainer}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[styles.categoryButton, category === 'Technology' && styles.selectedCategory]}
              >
                <CustomText
                  variant="h7"
                  fontFamily="Okra-Medium"
                  style={[
                    styles.categoryText,
                    category === 'Technology' && styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Social Links */}
        <View style={styles.inputGroup}>
          <CustomText variant="h6" fontFamily="Okra-Medium" style={styles.label}>
            Social Links (Optional)
          </CustomText>

          <View style={styles.socialInput}>
            <Icon
              name="link"
              size={20}
              color={Colors.textSecondary}
              style={styles.socialIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Website URL"
              value=""
              keyboardType="url"
            />
          </View>

          <View style={styles.socialInput}>
            <Icon
              name="instagram"
              size={20}
              color={Colors.textSecondary}
              style={styles.socialIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Instagram username"
              value=""
            />
          </View>

          <View style={styles.socialInput}>
            <Icon
              name="facebook"
              size={20}
              color={Colors.textSecondary}
              style={styles.socialIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Facebook page URL"
              value=""
              keyboardType="url"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  createButton: {
    padding: 5,
  },
  createButtonText: {
    color: Colors.primary,
  },
  disabledButton: {
    color: Colors.textTertiary,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    fontFamily: 'Okra-Regular',
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 20,
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
  socialInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  socialIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
});

export default CreateClubScreen;