import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, StatusBar} from 'react-native';
import HeaderNav from '@components/global/HeaderNav';
import PdfModal from '@components/global/PdfModal';
import {
  branchOptions,
  schemeOptions,
  streamOptions,
  yearOptions,
} from '@utils/dummyData';
import {fetchSyllabus} from '@features/vtu/service/syllabus.api';
import {Colors} from '@unistyles/Constants';
import SyllabusDropdown from '@components/vtu/syllabus/SyllabusDropdown';
import SyllabusSubmitButton from '@components/vtu/syllabus/SyllabusSubmitButton';
import CustomText from '@components/global/CustomText';
import SyllabusHeader from '@components/vtu/syllabus/SyllabusHeader';
import SyllabusSubjectItem from '@components/vtu/syllabus/SyllabusSubjectItem';
import FlashMessage, {showMessage} from 'react-native-flash-message';

const SyllabusScreen = () => {
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
  const [selectedPdf, setSelectedPdf] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showError = (message: string) => {
    setError(message);
    showMessage({
      message: 'Error',
      description: message,
      type: 'danger',
      icon: 'auto',
      duration: 3000,
      floating: true,
    });
  };

  const handleViewSyllabus = async () => {
    if (!stream || !scheme || !year || !branch) return;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchSyllabus({stream, scheme, year, branch});
      if (data) {
        setSyllabusData(data);
      } else {
        showError('No syllabus data found');
      }
    } catch (err) {
      showError('Failed to fetch syllabus data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectPress = (item: any) => {
    setSelectedPdf({
      paperUrl: item.pdfLink,
      subjectCode: item.code,
      subjectName: item.title,
      department: syllabusData.branch,
      year: syllabusData.year,
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPdf(null);
  };

  return (
    <>
      <View style={{paddingTop: StatusBar.currentHeight}}>
        <HeaderNav text="Syllabus" />
      </View>
      <View style={styles.container}>
        <View style={styles.dropdownContainer}>
          <SyllabusDropdown
            label="Stream"
            data={streamOptions}
            value={stream}
            onChange={item => setStream(item.value)}
            isFocus={isFocus.stream}
            setIsFocus={focus => setIsFocus({...isFocus, stream: focus})}
            iconName="school"
          />

          <SyllabusDropdown
            label="Scheme"
            data={schemeOptions}
            value={scheme}
            onChange={item => setScheme(item.value)}
            isFocus={isFocus.scheme}
            setIsFocus={focus => setIsFocus({...isFocus, scheme: focus})}
            iconName="date-range"
          />

          <SyllabusDropdown
            label="Year"
            data={yearOptions}
            value={year}
            onChange={item => setYear(item.value)}
            isFocus={isFocus.year}
            setIsFocus={focus => setIsFocus({...isFocus, year: focus})}
            iconName="class"
          />

          <SyllabusDropdown
            label="Branch"
            data={branchOptions}
            value={branch}
            onChange={item => setBranch(item.value)}
            isFocus={isFocus.branch}
            setIsFocus={focus => setIsFocus({...isFocus, branch: focus})}
            iconName="account-tree"
            search
          />
        </View>

        <SyllabusSubmitButton
          loading={loading}
          disabled={!stream || !scheme || !year || !branch || loading}
          onPress={handleViewSyllabus}
          text="View Syllabus"
        />

        <FlashMessage position="top" />

        {syllabusData && (
          <View style={styles.syllabusContainer}>
            <SyllabusHeader
              title={syllabusData.title || syllabusData.branch}
              subtitle={`${syllabusData.stream} - ${syllabusData.scheme} Scheme - Year ${syllabusData.year}`}
            />

            {syllabusData.fullsyllabus &&
            syllabusData.fullsyllabus.length > 0 ? (
              <FlatList
                data={syllabusData.fullsyllabus}
                renderItem={({item}) => (
                  <SyllabusSubjectItem
                    code={item.code}
                    title={item.title}
                    onPress={() => handleSubjectPress(item)}
                    loading={loading}
                  />
                )}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <CustomText
                variant="h5"
                fontFamily="Okra-Regular"
                style={styles.noSubjectsText}>
                No Syllabus found for this selection
              </CustomText>
            )}
          </View>
        )}

        <PdfModal
          visible={modalVisible}
          onClose={closeModal}
          paper={selectedPdf}
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
  dropdownContainer: {
    marginTop: 10,
  },
  syllabusContainer: {
    flex: 1,
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
  },
  errorText: {
    color: Colors.error,
    marginTop: 16,
    textAlign: 'center',
  },
  noSubjectsText: {
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SyllabusScreen;
