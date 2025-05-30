import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Modal,
  Linking,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import HeaderNav from '@components/global/HeaderNav';
import CustomText from '@components/global/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dropdown} from 'react-native-element-dropdown';
import {
  branchOptions,
  schemeOptions,
  streamOptions,
  yearOptions,
} from '@utils/dummyData';
import {Colors, Fonts} from '@unistyles/Constants';
import Pdf from 'react-native-pdf';

// Mock data loader - replace with your actual data fetching
const loadSyllabusData = async (
  stream: string,
  scheme: string,
  year: string,
  branch: string,
) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // This should be replaced with your actual data fetching
  // For now, we'll return the sample data you provided
  return {
    stream,
    scheme,
    year,
    branch,
    title: branchOptions.find(b => b.value === branch)?.label || '',
    subjects: [
      {
        code: 'BMATC101',
        title: 'Mathematics for Civil Engg Stream-I',
        pdfLink: 'https://vtu.ac.in/pdf/2022syll/BMATC101.pdf',
        date: '2025-03-06T12:00:00Z',
      },
      {
        code: 'BMATC201',
        title: 'Mathematics for Civil Engineering Stream-II',
        pdfLink: 'https://vtu.ac.in/pdf/2022syll/BMATC201.pdf',
        date: '2025-03-06T12:00:00Z',
      },
      {
        code: 'BPHYC102/202',
        title: 'Physics for Civil Engg Streams',
        pdfLink: 'https://vtu.ac.in/pdf/2022syll/BPHYC102.pdf',
        date: '2025-03-06T12:00:00Z',
      },
      {
        code: 'BCHEC102/202',
        title: 'Chemistry for Civil Engineering Stream',
        pdfLink: 'https://vtu.ac.in/pdf/2022syll/BCHEC102.pdf',
        date: '2025-03-06T12:00:00Z',
      },
      {
        code: 'BCIVC103/203',
        title: 'Engineering Mechanics',
        pdfLink: 'https://vtu.ac.in/pdf/2022syll/BCIVC103.pdf',
        date: '2025-03-06T12:00:00Z',
      },
    ],
  };
};

const SchemeSyllabusScreen = () => {
  const [stream, setStream] = useState<string | null>(null);
  const [scheme, setScheme] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [branch, setBranch] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState({
    stream: false,
    scheme: false,
    year: false,
    branch: false,
  });
  const [syllabusData, setSyllabusData] = useState<any>(null);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleViewSyllabus = async () => {
    if (!stream || !scheme || !year || !branch) return;

    setLoading(true);
    try {
      const data = await loadSyllabusData(stream, scheme, year, branch);
      setSyllabusData(data);
    } catch (error) {
      console.error('Error loading syllabus data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderDropdownItem = (item: {label: string; value: string}) => {
    return (
      <View style={styles.item}>
        <CustomText
          variant="h5"
          fontFamily="Okra-Regular"
          fontSize={10}
          style={styles.textItem}>
          {item.label}
        </CustomText>
        {item.value === stream ||
        item.value === scheme ||
        item.value === year ||
        item.value === branch ? (
          <Icon name="check" size={20} color={Colors.primary} />
        ) : null}
      </View>
    );
  };

  const renderSubjectItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.subjectItem}
      onPress={() => setSelectedPdf(item.pdfLink)}
      activeOpacity={0.7}>
      <View style={styles.subjectContent}>
        <CustomText
          variant="h5"
          fontFamily="Okra-Medium"
          fontSize={14}
          style={styles.subjectCode}>
          {item.code}
        </CustomText>
        <CustomText
          variant="h5"
          fontFamily="Okra-Regular"
          style={styles.subjectTitle}
          fontSize={12}>
          {item.title}
        </CustomText>
      </View>
      <Icon name="picture-as-pdf" size={24} color={Colors.error} />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={{paddingTop: StatusBar.currentHeight}}>
        <HeaderNav text="Syllabus" />
      </View>
      <View style={styles.container}>
        <View style={styles.dropdownContainer}>
          {/* Stream Dropdown */}
          <View style={styles.dropdownWrapper}>
            <CustomText
              variant="h7"
              fontFamily="Okra-Light"
              style={styles.label}>
              Stream
            </CustomText>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus.stream && {borderColor: Colors.primary},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={streamOptions}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus.stream ? 'Select Stream' : '...'}
              value={stream}
              onFocus={() => setIsFocus({...isFocus, stream: true})}
              onBlur={() => setIsFocus({...isFocus, stream: false})}
              onChange={item => {
                setStream(item.value);
                setIsFocus({...isFocus, stream: false});
              }}
              renderItem={renderDropdownItem}
              renderLeftIcon={() => (
                <Icon
                  name="school"
                  size={20}
                  color={isFocus.stream ? Colors.primary : Colors.textTertiary}
                  style={styles.leftIcon}
                />
              )}
            />
          </View>

          {/* Scheme Dropdown */}
          <View style={styles.dropdownWrapper}>
            <CustomText
              variant="h7"
              fontFamily="Okra-Light"
              style={styles.label}>
              Scheme
            </CustomText>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus.scheme && {borderColor: Colors.primary},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={schemeOptions}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus.scheme ? 'Select Scheme' : '...'}
              value={scheme}
              onFocus={() => setIsFocus({...isFocus, scheme: true})}
              onBlur={() => setIsFocus({...isFocus, scheme: false})}
              onChange={item => {
                setScheme(item.value);
                setIsFocus({...isFocus, scheme: false});
              }}
              renderItem={renderDropdownItem}
              renderLeftIcon={() => (
                <Icon
                  name="date-range"
                  size={20}
                  color={isFocus.scheme ? Colors.primary : Colors.textTertiary}
                  style={styles.leftIcon}
                />
              )}
            />
          </View>

          {/* Year Dropdown */}
          <View style={styles.dropdownWrapper}>
            <CustomText
              variant="h7"
              fontFamily="Okra-Light"
              style={styles.label}>
              Year
            </CustomText>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus.year && {borderColor: Colors.primary},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={yearOptions}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus.year ? 'Select Year' : '...'}
              value={year}
              onFocus={() => setIsFocus({...isFocus, year: true})}
              onBlur={() => setIsFocus({...isFocus, year: false})}
              onChange={item => {
                setYear(item.value);
                setIsFocus({...isFocus, year: false});
              }}
              renderItem={renderDropdownItem}
              renderLeftIcon={() => (
                <Icon
                  name="class"
                  size={20}
                  color={isFocus.year ? Colors.primary : Colors.textTertiary}
                  style={styles.leftIcon}
                />
              )}
            />
          </View>

          {/* Branch Dropdown */}
          <View style={styles.dropdownWrapper}>
            <CustomText
              variant="h7"
              fontFamily="Okra-Light"
              style={styles.label}>
              Branch
            </CustomText>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus.branch && {borderColor: Colors.primary},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={branchOptions}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus.branch ? 'Select Branch' : '...'}
              searchPlaceholder="Search branch..."
              value={branch}
              onFocus={() => setIsFocus({...isFocus, branch: true})}
              onBlur={() => setIsFocus({...isFocus, branch: false})}
              onChange={item => {
                setBranch(item.value);
                setIsFocus({...isFocus, branch: false});
              }}
              renderItem={renderDropdownItem}
              renderLeftIcon={() => (
                <Icon
                  name="account-tree"
                  size={20}
                  color={isFocus.branch ? Colors.primary : Colors.textTertiary}
                  style={styles.leftIcon}
                />
              )}
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!stream || !scheme || !year || !branch) &&
              styles.submitButtonDisabled,
          ]}
          disabled={!stream || !scheme || !year || !branch || loading}
          onPress={handleViewSyllabus}>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            <>
              <CustomText
                variant="h5"
                fontFamily="Okra-Light"
                style={styles.submitButtonText}>
                View Syllabus
              </CustomText>
              <Icon name="arrow-forward" size={20} color={Colors.white} />
            </>
          )}
        </TouchableOpacity>

        {/* Syllabus Data Display */}
        {syllabusData && (
          <View style={styles.syllabusContainer}>
            <CustomText
              variant="h4"
              fontFamily="Okra-Medium"
              fontSize={17}
              style={styles.title}>
              {syllabusData.title}
            </CustomText>
            <CustomText
              variant="h6"
              fontFamily="Okra-Regular"
              fontSize={12}
              style={styles.subtitle}>
              {syllabusData.stream} - {syllabusData.scheme} Scheme - Year{' '}
              {syllabusData.year}
            </CustomText>

            <FlatList
              data={syllabusData.subjects}
              renderItem={renderSubjectItem}
              keyExtractor={item => item.code}
              contentContainerStyle={styles.listContent}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {/* PDF Viewer Modal */}
        <Modal
          visible={!!selectedPdf}
          transparent={false}
          animationType="slide"
          onRequestClose={() => setSelectedPdf(null)}
          statusBarTranslucent={true}
          hardwareAccelerated={true}>
          <View style={styles.pdfContainer}>
            <View style={styles.pdfHeader}>
              <TouchableOpacity onPress={() => setSelectedPdf(null)}>
                <Icon name="arrow-back" size={24} color={Colors.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => selectedPdf && Linking.openURL(selectedPdf)}>
                <Icon name="cloud-download" size={24} color={Colors.primary} />
              </TouchableOpacity>
            </View>

            {selectedPdf && (
              <Pdf
                trustAllCerts={false}
                source={{uri: selectedPdf,cache:true}}
                style={styles.pdf}
                onError={error => console.log('PDF error:', error)}
                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`Current page: ${page}`);
                }}
                renderActivityIndicator={() => (
                  <ActivityIndicator size={'small'} />
                )}
                enableDoubleTapZoom={true}
              />
            )}
          </View>
        </Modal>
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
  dropdownContainer: {
    marginTop: 20,
  },
  dropdownWrapper: {
    marginBottom: 20,
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
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
    opacity: 0.9,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: Colors.white,
    marginRight: 8,
  },
  syllabusContainer: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  subjectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  subjectContent: {
    flex: 1,
    marginRight: 12,
  },
  subjectCode: {
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subjectTitle: {
    color: Colors.textSecondary,
  },
  listContent: {
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
  },
  pdfContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: StatusBar.currentHeight,
  },
  pdfHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  downloadButton: {
    padding: 8,
  },
  pdf: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default SchemeSyllabusScreen;
