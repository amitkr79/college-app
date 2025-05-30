import React, {useState} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomText from '@components/global/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Pdf from 'react-native-pdf';
import {Colors} from '@unistyles/Constants';

interface SyllabusItem {
  id: string;
  title: string;
  pdfUrl: string;
  semester: string;
  type: 'scheme' | 'syllabus';
}

interface SyllabusModalProps {
  visible: boolean;
  onClose: () => void;
  department: string;
  year: string;
  data: SyllabusItem[];
}

const SyllabusModal = ({
  visible,
  onClose,
  department,
  year,
  data,
}: SyllabusModalProps) => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [pdfVisible, setPdfVisible] = useState(false);

  const handleItemPress = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
    setPdfVisible(true);
  };

  const handlePdfClose = () => {
    setPdfVisible(false);
    setSelectedPdf(null);
  };

  const renderItem = ({item}: {item: SyllabusItem}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleItemPress(item.pdfUrl)}
      activeOpacity={0.7}>
      <View style={styles.itemContent}>
        <CustomText
          variant="h5"
          fontFamily="Okra-Light"
          style={styles.itemTitle}>
          {item.title}
        </CustomText>
        <View style={styles.itemMeta}>
          <CustomText
            variant="h7"
            fontFamily="Okra-Light"
            style={styles.itemSemester}>
            {item.semester}
          </CustomText>
          <View
            style={[
              styles.typeBadge,
              item.type === 'scheme'
                ? styles.schemeBadge
                : styles.syllabusBadge,
            ]}>
            <CustomText
              variant="h7"
              fontFamily="Okra-Light"
              style={styles.typeText}>
              {item.type.toUpperCase()}
            </CustomText>
          </View>
        </View>
      </View>
      <Icon name="chevron-right" size={24} color={Colors.textTertiary} />
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <CustomText variant="h4" fontFamily="Okra-Light">
              {department}
            </CustomText>
            <CustomText variant="h6" fontFamily="Okra-Light">
              {year} Year
            </CustomText>
          </View>
          <View style={{width: 24}} /> {/* Spacer for alignment */}
        </View>

        {/* Syllabus List */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />

        {/* PDF Viewer Modal */}
        <Modal
          visible={pdfVisible}
          transparent={false}
          animationType="slide"
          onRequestClose={handlePdfClose}>
          <SafeAreaView style={styles.pdfContainer}>
            <View style={styles.pdfHeader}>
              <TouchableOpacity onPress={handlePdfClose}>
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
                source={{uri: selectedPdf}}
                style={styles.pdf}
                onError={error => console.log('PDF error:', error)}
              />
            )}
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  itemContent: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemSemester: {
    color: Colors.textTertiary,
    marginRight: 10,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  schemeBadge: {
    backgroundColor: Colors.primaryGloss,
  },
  syllabusBadge: {
    backgroundColor: Colors.primaryGloss,
  },
  typeText: {
    fontSize: 10,
    color: Colors.textPrimary,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  pdfContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  pdfHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  downloadButton: {
    padding: 8,
  },
  pdf: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default SyllabusModal;
