// components/ImageModal.tsx
import React from 'react';
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Colors, screenHeight} from '@unistyles/Constants';

interface ImageModalProps {
  visible: boolean;
  imageUrl: string | null;
  title?: string;
  description?: string;
  date?: string;
  type?: 'event' | 'notice';
  onClose: () => void;
}

const BannerModal = ({
  visible,
  imageUrl,
  title,
  description,
  date,
  type,
  onClose,
}: ImageModalProps) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide"  >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        <ScrollView
          style={styles.modalContent}
          contentContainerStyle={{paddingBottom: 40}}>
          {imageUrl && (
            <Image
              source={{uri: imageUrl}}
              style={styles.fullImage}
              resizeMode="cover"
            />
          )}

          <View style={styles.detailsContainer}>
            {title && <Text style={styles.modalTitle}>{title}</Text>}
            {description && (
              <Text style={styles.modalDescription}>{description}</Text>
            )}

            {(date || type) && (
              <View style={styles.metaContainer}>
                {date && <Text style={styles.modalDate}>{date}</Text>}
                {type && (
                  <Text
                    style={[
                      styles.modalType,
                      type === 'event' ? styles.eventType : styles.noticeType,
                    ]}>
                    {type.toUpperCase()}
                  </Text>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingTop: 40,
  },
  modalContent: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  fullImage: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 12,
    lineHeight: 22,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalDate: {
    fontSize: 14,
    color: Colors.textTertiary,
  },
  modalType: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventType: {
    backgroundColor: Colors.primaryGloss,
    color: Colors.primary,
  },
  noticeType: {
    backgroundColor: Colors.secondaryLight,
    color: Colors.secondary,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 10,
    zIndex: 2,
    backgroundColor: Colors.backgroundLight,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.textPrimary,
  },
  closeButtonText: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default BannerModal;
