// @screens/academic/PreviousPapersScreen.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  StatusBar,
} from 'react-native';
import HeaderNav from '@components/global/HeaderNav';
import CustomText from '@components/global/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, Fonts} from '@unistyles/Constants';
import {papersData} from '@utils/paper';
import FilterSelectionModal from '@components/vtu/FilterSelectionModal';
import PdfModal from '@components/global/PdfModal';

interface Paper {
  id: string;
  subjectCode: string;
  subjectName: string;
  department: string;
  semester: string;
  year: string;
  examType: string;
  paperUrl: string;
  tags: string[];
}

interface Filters {
  department: string;
  semester: string;
  year: string;
  examType: string;
}

const PreviousPapersScreen = () => {
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Paper[]>(papersData);
  const [filters, setFilters] = useState<Filters>({
    department: '',
    semester: '',
    year: '',
    examType: '',
  });
  const [activeFilter, setActiveFilter] = useState<
    'department' | 'semester' | 'year' | 'examType' | null
  >(null);

  // Get unique filter values
  const departments = [...new Set(papersData.map(p => p.department))];
  const semesters = [...new Set(papersData.map(p => p.semester))];
  const years = [...new Set(papersData.map(p => p.year))];
  const examTypes = [...new Set(papersData.map(p => p.examType))];

  // Apply filters
  useEffect(() => {
    let result = papersData;

    if (filters.department) {
      result = result.filter(p => p.department === filters.department);
    }

    if (filters.semester) {
      result = result.filter(p => p.semester === filters.semester);
    }

    if (filters.year) {
      result = result.filter(p => p.year === filters.year);
    }

    if (filters.examType) {
      result = result.filter(p => p.examType === filters.examType);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.subjectCode.toLowerCase().includes(query) ||
          p.subjectName.toLowerCase().includes(query) ||
          p.tags.some(tag => tag.toLowerCase().includes(query)),
      );
    }

    setFilteredData(result);
  }, [filters, searchQuery]);

  const renderItem = ({item}: {item: Paper}) => (
    <TouchableOpacity
      style={styles.paperCard}
      onPress={() => setSelectedPaper(item)}>
      <View style={styles.paperHeader}>
        <CustomText
          variant="h5"
          fontFamily="Okra-Light"
          fontSize={12}
          style={styles.subjectCode}>
          {item.subjectCode}
        </CustomText>
        <View style={styles.badge}>
          <CustomText
            variant="h7"
            fontFamily="Okra-Regular"
            style={styles.badgeText}>
            {item.examType}
          </CustomText>
        </View>
      </View>

      <CustomText
        variant="h5"
        fontFamily="Okra-Medium"
        fontSize={14}
        style={styles.subjectName}>
        {item.subjectName}
      </CustomText>

      <View style={styles.paperMeta}>
        <CustomText
          variant="h7"
          fontFamily="Okra-Regular"
          fontSize={10}
          style={styles.metaText}>
          {item.department} • Sem {item.semester} • {item.year}
        </CustomText>
        <Icon name="picture-as-pdf" size={24} color={Colors.error} />
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={{paddingTop: StatusBar.currentHeight}}>
        <HeaderNav text="Previous Year Papers" />
      </View>
      <View style={styles.container}>
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
            placeholder="Search by subject, code or tag..."
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

        {/* Filter Section */}
        <View style={styles.filterContainer}>
          {/* Department Filter */}
          <TouchableOpacity
            style={[
              styles.filterButton,
              filters.department && styles.activeFilter,
            ]}
            onPress={() => setActiveFilter('department')}>
            <CustomText variant="h7" fontFamily="Okra-Medium">
              Department
            </CustomText>
            {filters.department && (
              <View style={styles.filterBadge}>
                <CustomText
                  variant="h7"
                  fontFamily="Okra-Bold"
                  style={styles.filterBadgeText}>
                  {filters.department}
                </CustomText>
              </View>
            )}
          </TouchableOpacity>

          {/* Semester Filter */}
          <TouchableOpacity
            style={[
              styles.filterButton,
              filters.semester && styles.activeFilter,
            ]}
            onPress={() => setActiveFilter('semester')}>
            <CustomText variant="h7" fontFamily="Okra-Medium">
              Semester
            </CustomText>
            {filters.semester && (
              <View style={styles.filterBadge}>
                <CustomText
                  variant="h7"
                  fontFamily="Okra-Bold"
                  style={styles.filterBadgeText}>
                  {filters.semester}
                </CustomText>
              </View>
            )}
          </TouchableOpacity>

          {/* Year Filter */}
          <TouchableOpacity
            style={[styles.filterButton, filters.year && styles.activeFilter]}
            onPress={() => setActiveFilter('year')}>
            <CustomText variant="h7" fontFamily="Okra-Medium">
              Year
            </CustomText>
            {filters.year && (
              <View style={styles.filterBadge}>
                <CustomText
                  variant="h7"
                  fontFamily="Okra-Bold"
                  style={styles.filterBadgeText}>
                  {filters.year}
                </CustomText>
              </View>
            )}
          </TouchableOpacity>

          {/* Exam Type Filter */}
          <TouchableOpacity
            style={[
              styles.filterButton,
              filters.examType && styles.activeFilter,
            ]}
            onPress={() => setActiveFilter('examType')}>
            <CustomText variant="h7" fontFamily="Okra-Medium">
              Exam Type
            </CustomText>
            {filters.examType && (
              <View style={styles.filterBadge}>
                <CustomText
                  variant="h7"
                  fontFamily="Okra-Bold"
                  style={styles.filterBadgeText}>
                  {filters.examType}
                </CustomText>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Papers List */}
        {filteredData.length > 0 ? (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="find-in-page" size={48} color={Colors.textTertiary} />
            <CustomText
              variant="h5"
              fontFamily="Okra-Medium"
              style={styles.emptyText}>
              No papers found. Try changing your filters.
            </CustomText>
          </View>
        )}

        {/* Filter Selection Modals */}
        <FilterSelectionModal
          visible={activeFilter === 'department'}
          title="Select Department"
          options={departments}
          selectedValue={filters.department}
          onSelect={value => {
            setFilters({...filters, department: value});
            setActiveFilter(null);
          }}
          onClose={() => setActiveFilter(null)}
        />

        <FilterSelectionModal
          visible={activeFilter === 'semester'}
          title="Select Semester"
          options={semesters}
          selectedValue={filters.semester}
          onSelect={value => {
            setFilters({...filters, semester: value});
            setActiveFilter(null);
          }}
          onClose={() => setActiveFilter(null)}
        />

        <FilterSelectionModal
          visible={activeFilter === 'year'}
          title="Select Year"
          options={years}
          selectedValue={filters.year}
          onSelect={value => {
            setFilters({...filters, year: value});
            setActiveFilter(null);
          }}
          onClose={() => setActiveFilter(null)}
        />

        <FilterSelectionModal
          visible={activeFilter === 'examType'}
          title="Select Exam Type"
          options={examTypes}
          selectedValue={filters.examType}
          onSelect={value => {
            setFilters({...filters, examType: value});
            setActiveFilter(null);
          }}
          onClose={() => setActiveFilter(null)}
          
        />

        {/* PDF Viewer Modal */}
        <PdfModal
          visible={!!selectedPaper}
          paper={selectedPaper}
          onClose={() => setSelectedPaper(null)}
        />
      </View>
    </>
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
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: Colors.textPrimary,
    fontFamily: Fonts.Regular,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeFilter: {
    backgroundColor: Colors.primaryGloss,
    borderColor: Colors.primary,
  },
  filterBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  filterBadgeText: {
    color: Colors.white,
    fontSize: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  paperCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  paperHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectCode: {
    color: Colors.textPrimary,
  },
  badge: {
    backgroundColor: Colors.primaryGloss,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: Colors.secondary,
    fontSize: 12,
  },
  subjectName: {
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  paperMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaText: {
    color: Colors.textSecondary,
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

export default PreviousPapersScreen;
