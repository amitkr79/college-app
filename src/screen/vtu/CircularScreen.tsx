import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderNav from '@components/global/HeaderNav';
import CustomText from '@components/global/CustomText';
import {examCircular} from '@services/circular/syllabus.api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '@unistyles/Constants';
import PdfModal from '@components/vtu/PdfModal';
import { downloadPdf } from '@utils/downloadUtils';
import { showMessage } from 'react-native-flash-message';

const CircularScreen = () => {
  const [circulars, setCirculars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCircular, setSelectedCircular] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchCirculars = async () => {
      try {
        const data = await examCircular();
        setCirculars(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch circulars');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCirculars();
  }, []);

  const handleItemPress = (item: any) => {
    setSelectedCircular(item);
    setModalVisible(true);
  };

  // Inside your component
  const handleDownload = (item: any) => {
    if (!item.link) {
      showMessage({
        message: 'No download link available',
        type: 'warning',
      });
      return;
    }

    downloadPdf(item?.link, item.text.substring(0, 50)); // Truncate long names
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCircular(null);
  };

  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleItemPress(item)}>
      <View style={styles.textContainer}>
        <CustomText
          variant="h5"
          fontFamily="Okra-Regular"
          style={styles.itemText}
          fontSize={12}
          numberOfLines={2}>
          {item.text}
        </CustomText>
        <View style={styles.metaContainer}>
          <CustomText
            variant="h7"
            fontFamily="Okra-Medium"
            style={styles.dateText}
            fontSize={10}>
            {item.Date}
          </CustomText>
          <View
            style={[styles.typeBadge, item.type === 'pdf' && styles.pdfBadge]}>
            <CustomText
              variant="h7"
              fontFamily="Okra-Regular"
              fontSize={9}
              style={styles.typeText}>
              {item.type.toUpperCase()}
            </CustomText>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={e => {
          e.stopPropagation(); // Prevent triggering the parent TouchableOpacity
          handleDownload(item);
        }}
        style={styles.downloadButton}>
        <Icon name="cloud-download" size={24} color={Colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderNav text="Circular List" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderNav text="Circular List" />
        <View style={styles.errorContainer}>
          <CustomText variant="h5" style={styles.errorText}>
            {error}
          </CustomText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNav text="Circular List" />

      <FlatList
        data={circulars}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <PdfModal
        visible={modalVisible}
        paper={{
          paperUrl: selectedCircular?.link,
          title: selectedCircular?.text,
          year: selectedCircular?.date,
        }}
        onClose={closeModal}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: Colors.error,
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  itemText: {
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    color: Colors.textTertiary,
    marginRight: 10,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: Colors.background,
  },
  pdfBadge: {
    backgroundColor: Colors.error,
  },
  typeText: {
    color: Colors.white,
  },
  downloadButton: {
    padding: 8,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
});

export default CircularScreen;
