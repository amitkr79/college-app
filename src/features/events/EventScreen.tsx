import React, {useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderNav from '@components/global/HeaderNav';
import {Colors} from '@unistyles/Constants';
import {eventsData} from '@utils/eventData';
import {Event, EventCategory} from '../../types/eventTypes';
import CategoryBtn from '@components/event/CategoryBtn';
import EventCard from '@components/event/EventCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomText from '@components/global/CustomText';
import SearchBar from '@components/event/SearchBar';
import EventDetailsModal from './EventDetailsModal';
import AddEventButton from '@components/event/AddEventBtn';
import { navigate } from '@utils/NavigationUtils';

const {height} = Dimensions.get('window');

const categories: {key: EventCategory; label: string}[] = [
  {key: 'featured', label: 'Featured'},
  {key: 'academic', label: 'Academic'},
  {key: 'cultural', label: 'Cultural'},
  {key: 'sports', label: 'Sports'},
  {key: 'workshops', label: 'Workshops'},
];
type UserType = 'student' | 'faculty' | 'admin';

const EventsScreen = () => {
  const [activeCategory, setActiveCategory] =
    useState<EventCategory>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [userType, setUserType] = useState<UserType>('admin'); // Default to 'student' for testing
  // Replace this with your actual user type detection logic
  // This could come from auth context, async storage, etc.


  const filteredEvents: Event[] = eventsData[activeCategory].filter(
    event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  // todo: logic for registration
  const handleRegister = (eventId: string) => {
    console.log('Register for event:', eventId);
  };

  //moreinfo modal
  const handleInfo = (event: Event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const handleAddEvent = () => {
    console.log('Navigate to add event screen');
    // navigation.navigate('AddEventScreen');
    navigate('AddEvents')

  };

  const showAddButton = userType === 'admin' || userType === 'faculty';
  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* Add Event Button (conditionally rendered) */}
        {!showAddButton && (
          <View style={styles.addButtonContainer}>
            <AddEventButton onPress={handleAddEvent} />
          </View>
        )}

        {/* Reusable SearchBar */}
        <SearchBar
          placeholder="Search events by name, description or tags..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />

        {/* Rest of the code remains the same */}
        <View style={styles.categoryScrollContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}>
            {categories.map(({key, label}) => (
              <CategoryBtn
                key={key}
                label={label}
                isActive={activeCategory === key}
                onPress={() => setActiveCategory(key)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={filteredEvents}
            renderItem={({item}) => (
              <EventCard
                event={item}
                onRegister={() => handleRegister(item.id)}
                onInfo={() => handleInfo(item)}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Icon name="event" size={48} color={Colors.textTertiary} />
                <CustomText
                  variant="h5"
                  fontFamily="Okra-Medium"
                  style={styles.emptyText}>
                  No events found. Try another search or category.
                </CustomText>
              </View>
            }
          />
        </View>
        <EventDetailsModal
          visible={modalVisible}
          event={selectedEvent}
          onClose={handleCloseModal}
          onRegister={() => {
            if (selectedEvent) {
              handleRegister(selectedEvent.id);
            }
            handleCloseModal();
          }}
          userType={userType}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },
  addButtonContainer: {
    alignItems: 'flex-end',
    marginVertical: 16,
  },
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
  categoryScrollContainer: {
    height: 60,
    marginBottom: 8,
  },
  categoryContainer: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    color: Colors.textTertiary,
    marginTop: 16,
    textAlign: 'center',
  },
});

export default EventsScreen;
