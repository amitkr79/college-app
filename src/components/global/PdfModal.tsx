// @components/academic/PdfModal.tsx
import React, {FC} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import {StyleSheet} from 'react-native';
import {PdfModalProps} from 'src/types/dummyData';
import {SafeAreaView} from 'react-native-safe-area-context';

const PdfModal: FC<PdfModalProps> = ({visible, paper, onClose}) => {
  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}
      hardwareAccelerated={true}
      presentationStyle="fullScreen"
      statusBarTranslucent={true}>
      <SafeAreaView style={styles.pdfContainer}>
        <View style={styles.pdfHeader}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.pdfHeaderText}>
            <CustomText variant="h5" fontFamily="Okra-Bold" numberOfLines={1}>
              {paper?.subjectName}{paper?.subjectCode} 
            </CustomText>
            <CustomText variant="h7" fontFamily="Okra-Regular">
              {paper?.department} • Sem {paper?.semester} • {paper?.year} Year
            </CustomText>
          </View>
          <TouchableOpacity
            onPress={() => paper?.paperUrl && Linking.openURL(paper.paperUrl)}>
            <Icon name="cloud-download" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {paper && (
          <Pdf
            trustAllCerts={false}
            source={{uri: paper.paperUrl, cache: true}}
            style={styles.pdf}
            onError={error => {
              console.log('PDF error:', error);
              // Fallback to browser if in-app viewer fails
              Linking.openURL(paper.paperUrl);
            }}
            renderActivityIndicator={() => <ActivityIndicator size={'small'} />}
            enableDoubleTapZoom={true}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  pdfContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  pdfHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    elevation: 2,
  },
  pdfHeaderText: {
    flex: 1,
    marginHorizontal: 16,
  },
  pdf: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
});

export default PdfModal;
