import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'react-native-image-picker';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import HeaderNav from '@components/global/HeaderNav';
import {useNavigation} from '@react-navigation/native';
import {Event, EventStatus} from '../../../types/eventTypes';

const AddEvents = () => {
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTag, setCurrentTag] = useState('');

  // Form state initialization
  const [formData, setFormData] = useState<
    Omit<Event, 'id' | 'attendingCount' | 'imageUrl'>
  >({
    title: '',
    date: '',
    location: '',
    description: '',
    category: 'academic',
    organizer: '',
    price: '0',
    tags: [],
    status: 'upcoming',
  });

  /**
   * Handles image selection from device gallery
   */
  const handleImagePicker = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (response.assets?.[0]?.uri) {
          setImageUri(response.assets[0].uri);
        }
      },
    );
  };

  /**
   * Updates form data when input fields change
   * @param field - Field name to update
   * @param value - New value for the field
   */
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  /**
   * Handles date selection from date picker
   * @param date - Selected date object
   */
  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    setFormData(prev => ({
      ...prev,
      date: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
    }));
    setDatePickerVisible(false);
  };

  /**
   * Adds a new tag to the event
   */
  const addTag = () => {
    if (currentTag.trim() && formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag('');
    }
  };

  /**
   * Removes a tag from the event
   * @param index - Index of tag to remove
   */
  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  /**
   * Validates and submits the event form
   */
  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Field validation
    if (!formData.title.trim()) {
      Alert.alert('Validation Error', 'Event title is required');
      setIsSubmitting(false);
      return;
    }

    if (!formData.date) {
      Alert.alert('Validation Error', 'Event date is required');
      setIsSubmitting(false);
      return;
    }

    if (!formData.location.trim()) {
      Alert.alert('Validation Error', 'Event location is required');
      setIsSubmitting(false);
      return;
    }

    try {
      // In a real app:
      // 1. Upload image to storage
      // 2. Get image URL
      // 3. Submit formData + image URL to backend
      
      // Simulated API call
      const eventData = {
        ...formData,
        imageUrl: imageUri || '', // Use actual uploaded URL in real app
        attendingCount: 0,
      };

      console.log('Submitting event:', eventData);
      // await api.post('/events', eventData);

      Alert.alert('Success', 'Event created successfully!', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderNav text="Add New Event" />

      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* ------ TITLE INPUT ------ */}
        <View style={styles.inputGroup}>
          <CustomText variant="h6" fontFamily="Okra-Medium" style={styles.label}>
            Event Title *
          </CustomText>
          <TextInput
            style={styles.input}
            placeholder="Enter event title"
            value={formData.title}
            onChangeText={value => handleInputChange('title', value)}
          />
        </View>

        {/* ------ DATE PICKER ------ */}
        <View style={styles.inputGroup}>
          <CustomText variant="h6" fontFamily="Okra-Medium" style={styles.label}>
            Event Date *
          </CustomText>
          <TouchableOpacity 
            style={styles.dateInputContainer} 
            onPress={() => setDatePickerVisible(true)}
          >
            <CustomText
              variant="h6"
              fontFamily="Okra-Regular"
              style={formData.date ? styles.dateText : styles.placeholderText}>
              {formData.date || 'Select event date'}
            </CustomText>
            <Icon
              name="calendar-today"
              size={20}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={() => setDatePickerVisible(false)}
            minimumDate={new Date()}
          />
        </View>

        {/* ------ LOCATION INPUT ------ */}
        <View style={styles.inputGroup}>
          <CustomText variant="h6" fontFamily="Okra-Medium" style={styles.label}>
            Location *
          </CustomText>
          <TextInput
            style={styles.input}
            placeholder="Enter event location"
            value={formData.location}
            onChangeText={value => handleInputChange('location', value)}
          />
        </View>

        {/* ------ DESCRIPTION INPUT ------ */}
        <View style={styles.inputGroup}>
          <CustomText variant="h6" fontFamily="Okra-Medium" style={styles.label}>
            Description *
          </CustomText>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Enter event description"
            value={formData.description}
            onChangeText={value => handleInputChange('description', value)}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* ------ IMAGE UPLOAD ------ */}
        <View style={styles.inputGroup}>
          <CustomText variant="h6" fontFamily="Okra-Medium" style={styles.label}>
            Event Image
          </CustomText>
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={handleImagePicker}>
            {imageUri ? (
              <Image source={{uri: imageUri}} style={styles.imagePreview} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Icon
                  name="add-a-photo"
                  size={40}
                  color={Colors.textSecondary}
                />
                <CustomText variant="h6" fontFamily="Okra-Regular">
                  Select an image
                </CustomText>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* ------ CATEGORY SELECTION ------ */}
        <View style={styles.inputGroup}>
          <CustomText variant="h6" fontFamily="Okra-Medium" style={styles.label}>
            Category
          </CustomText>
          <View style={styles.categoryContainer}>
            {['academic', 'cultural', 'sports', 'workshops'].map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  formData.category === category && styles.selectedCategory,
                ]}
                onPress={() => handleInputChange('category', category)}>
                <CustomText
                  variant="h7"
                  fontFamily="Okra-Medium"
                  // Fixed conditional styling:
                  style={[
                    styles.categoryText,
                    formData.category === category ? styles.selectedCategoryText : {},
                  ]}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ------ ORGANIZER INPUT ------ */}
        <View style={styles.inputGroup}>
          <CustomText variant="h6" fontFamily="Okra-Medium" style={styles.label}>
            Organizer
          </CustomText>
          <TextInput
            style={styles.input}
            placeholder="Enter organizer name"
            value={formData.organizer}
            onChangeText={value => handleInputChange('organizer', value)}
          />
        </View>

        {/* ------ PRICE INPUT ------ */}
        <View style={styles.inputGroup}>
          <CustomText variant="h6" fontFamily="Okra-Medium" style={styles.label}>
            Price
          </CustomText>
          <View style={styles.priceContainer}>
            <TextInput
              style={[styles.input, styles.priceInput]}
              placeholder="0.00"
              value={formData.price}
              onChangeText={value => handleInputChange('price', value)}
              keyboardType="decimal-pad"
            />
            <CustomText
              variant="h6"
              fontFamily="Okra-Regular"
              style={styles.currencyText}>
              USD
            </CustomText>
          </View>
        </View>

        {/* ------ STATUS SELECTION ------ */}
        <View style={styles.inputGroup}>
          <CustomText variant="h6" fontFamily="Okra-Medium" style={styles.label}>
            Status
          </CustomText>
          <View style={styles.statusContainer}>
            {(['upcoming', 'ongoing', 'completed'] as EventStatus[]).map(
              status => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.statusButton,
                    formData.status === status && styles.selectedStatus,
                  ]}
                  onPress={() => handleInputChange('status', status)}>
                  <CustomText
                    variant="h7"
                    fontFamily="Okra-Medium"
                    // Fixed conditional styling:
                    style={[
                      styles.statusText,
                      formData.status === status ? styles.selectedStatusText : {},
                    ]}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </CustomText>
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>

        {/* ------ TAGS MANAGEMENT ------ */}
        <View style={styles.inputGroup}>
          <CustomText variant="h6" fontFamily="Okra-Medium" style={styles.label}>
            Tags (Max 5)
          </CustomText>
          <View style={styles.tagInputContainer}>
            <TextInput
              style={[styles.input, styles.tagInput]}
              placeholder="Add a tag"
              value={currentTag}
              onChangeText={setCurrentTag}
              onSubmitEditing={addTag}
            />
            <TouchableOpacity style={styles.addTagButton} onPress={addTag}>
              <Icon name="add" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.tagsContainer}>
            {formData.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <CustomText
                  variant="h7"
                  fontFamily="Okra-Medium"
                  style={styles.tagText}>
                  {tag}
                </CustomText>
                <TouchableOpacity onPress={() => removeTag(index)}>
                  <Icon name="close" size={16} color={Colors.textSecondary} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* ------ SUBMIT BUTTON ------ */}
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <CustomText
            variant="h5"
            fontFamily="Okra-Bold"
            style={styles.submitText}>
            {isSubmitting ? 'Creating...' : 'Create Event'}
          </CustomText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: StatusBar.currentHeight,
  },
  formContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Okra-Regular',
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  // Special container for date input
  dateInputContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  placeholderText: {
    color: Colors.textTertiary,
  },
  dateText: {
    color: Colors.textPrimary,
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
    marginRight: 10,
  },
  currencyText: {
    color: Colors.textSecondary,
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedStatus: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  statusText: {
    color: Colors.textSecondary,
  },
  selectedStatusText: {
    color: Colors.white,
  },
  tagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tagInput: {
    flex: 1,
    marginRight: 10,
  },
  addTagButton: {
    backgroundColor: Colors.primary,
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    backgroundColor: Colors.primaryGloss,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tagText: {
    color: Colors.textPrimary,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: Colors.white,
  },
  imagePicker: {
    height: 200,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default AddEvents;