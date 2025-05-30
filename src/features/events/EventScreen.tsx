import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  ListRenderItemInfo,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderNav from '@components/global/HeaderNav';
import CustomText from '@components/global/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, Fonts} from '@unistyles/Constants';
import {eventsData} from '@utils/eventData';

const {height} = Dimensions.get('window');
type EventStatus = 'upcoming' | 'ongoing' | 'completed';
type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  category: string;
  organizer: string;
  registrationRequired: boolean;
  price: string;
  tags: string[];
  // status: 'upcoming' | 'ongoing' | 'completed';
  status:string;
  attendingCount: number;
};

type EventCategory = keyof typeof eventsData;

const categories: {key: EventCategory; label: string}[] = [
  {key: 'featured', label: 'Featured'},
  {key: 'academic', label: 'Academic'},
  {key: 'cultural', label: 'Cultural'},
  {key: 'sports', label: 'Sports'},
  {key: 'workshops', label: 'Workshops'},
];

const EventsScreen = () => {
  const [activeCategory, setActiveCategory] =
    useState<EventCategory>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const filteredEvents: Event[] = eventsData[activeCategory].filter(
    event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  const renderCategoryButton = (category: EventCategory, label: string) => {
    const isActive = activeCategory === category;
    return (
      <TouchableOpacity
        key={category}
        style={[
          styles.categoryButton,
          isActive && styles.activeCategory,
        ]}
        onPress={() => setActiveCategory(category)}>
        <CustomText
          variant="h7"
          fontFamily={isActive ? 'Okra-Bold' : 'Okra-Medium'}
          style={isActive ? styles.activeCategoryText : styles.categoryText}>
          {label}
        </CustomText>
      </TouchableOpacity>
    );
  };

  const renderEventCard = ({item}: ListRenderItemInfo<Event>) => (
    <View style={styles.eventCard}>
      <Image source={{uri: item.imageUrl}} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <CustomText
            variant="h5"
            fontFamily="Okra-Bold"
            style={styles.eventTitle}>
            {item.title}
          </CustomText>
          <View
            style={[
              styles.statusBadge,
              item.status === 'upcoming' && styles.upcomingBadge,
              item.status === 'ongoing' && styles.ongoingBadge,
            ]}>
            <CustomText
              variant="h7"
              fontFamily="Okra-Bold"
              style={styles.badgeText}>
              {item.status.toUpperCase()}
            </CustomText>
          </View>
        </View>

        <View style={styles.eventMeta}>
          <View style={styles.metaItem}>
            <Icon
              name="calendar-today"
              size={16}
              color={Colors.textSecondary}
            />
            <CustomText
              variant="h7"
              fontFamily="Okra-Regular"
              style={styles.metaText}>
              {formatDate(item.date)}
            </CustomText>
          </View>

          <View style={styles.metaItem}>
            <Icon name="location-on" size={16} color={Colors.textSecondary} />
            <CustomText
              variant="h7"
              fontFamily="Okra-Regular"
              style={styles.metaText}>
              {item.location}
            </CustomText>
          </View>

          <View style={styles.metaItem}>
            <Icon name="groups" size={16} color={Colors.textSecondary} />
            <CustomText
              variant="h7"
              fontFamily="Okra-Regular"
              style={styles.metaText}>
              {item.organizer}
            </CustomText>
          </View>
        </View>

        <CustomText
          variant="h6"
          fontFamily="Okra-Regular"
          style={styles.eventDescription}>
          {item.description}
        </CustomText>

        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <CustomText
                variant="h7"
                fontFamily="Okra-Medium"
                style={styles.tagText}>
                {tag}
              </CustomText>
            </View>
          ))}
        </View>

        <View style={styles.eventFooter}>
          <View style={styles.attendingContainer}>
            <Icon name="people" size={20} color={Colors.primary} />
            <CustomText
              variant="h7"
              fontFamily="Okra-Bold"
              style={styles.attendingText}>
              {item.attendingCount} attending
            </CustomText>
          </View>

          <TouchableOpacity style={styles.registerButton}>
            <CustomText
              variant="h7"
              fontFamily="Okra-Bold"
              style={styles.registerText}>
              {item.registrationRequired ? 'REGISTER NOW' : 'MORE INFO'}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNav text="Campus Events" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon
          name="search"
          size={24}
          color={Colors.textTertiary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search events by name, description or tags..."
          placeholderTextColor={Colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close" size={24} color={Colors.textTertiary} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Category Filter */}
      <View style={styles.categoryScrollContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}>
          {categories.map(({key, label}) => renderCategoryButton(key, label))}
        </ScrollView>
      </View>

      {/* Events List */}
      <View style={styles.listContainer}>
        <FlatList
          data={filteredEvents}
          renderItem={renderEventCard}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
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
    height: 60, // Fixed height for category scroll view
    marginBottom: 8,
  },
  categoryContainer: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
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
  listContainer: {
    flex: 1, // Takes remaining space
  },
  listContent: {
    paddingBottom: 24,
  },
  eventCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: Colors.darkCard,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  eventImage: {
    width: '100%',
    height: 180,
  },
  eventContent: {
    padding: 20,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventTitle: {
    flex: 1,
    color: Colors.textPrimary,
    marginRight: 12,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  upcomingBadge: {
    backgroundColor: Colors.primaryGloss,
  },
  ongoingBadge: {
    backgroundColor: Colors.primaryGloss,
  },
  badgeText: {
    fontSize: 12,
    color: Colors.primary,
  },
  eventMeta: {
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  metaText: {
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  eventDescription: {
    color: Colors.textSecondary,
    marginBottom: 16,
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  tag: {
    backgroundColor: Colors.background,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  tagText: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 16,
  },
  attendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendingText: {
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  registerButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  registerText: {
    color: Colors.white,
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