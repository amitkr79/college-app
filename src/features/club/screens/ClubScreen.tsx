import React, {useState} from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CustomText from '../../../components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import {mockClubs} from '@utils/ClubMock';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import ClubCard from '@features/club/components/ClubCard';
import SearchBar from '@components/ui/SearchBar';
import CategoryFilter from '@components/global/CategoryFilter';
import { navigate } from '@utils/NavigationUtils';

const categories: string[] = [
  'All',
  'Academic',
  'Cultural',
  'Sports',
  'Arts',
  'Technology',
  'Community',
];

const ClubsScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredClubs = mockClubs.filter(club => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory ||
      selectedCategory === 'All' ||
      club.category === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search clubs..."
      />

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Club List */}
      <FlatList
        data={filteredClubs}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.clubList}
        renderItem={({item}) => (
          <ClubCard
            club={item}
            memberCount={item.members.length}
            onPress={() =>
              navigate('ClubDetailScreen', {clubId: item.id})
            }
          />
        )}
        ListEmptyComponent={
          <CustomText variant="h7" style={styles.emptyText}>
            No clubs found
          </CustomText>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 15,
  },
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
  clubList: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: Colors.textSecondary,
  },
});

export default ClubsScreen;
