
import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from '@components/global/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@unistyles/Constants';

interface FilterSelectionModalProps {
  visible: boolean;
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

const FilterSelectionModal: React.FC<FilterSelectionModalProps> = ({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <CustomText variant="h5" fontFamily="Okra-Medium" fontSize={15} style={styles.modalTitle}>
            {title}
          </CustomText>
          
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.modalOption}
              onPress={() => onSelect(option)}
            >
              <CustomText variant="h5" fontFamily="Okra-Medium" fontSize={13}>
                {option}
              </CustomText>
              {selectedValue === option && (
                <Icon name="check" size={20} color={Colors.primary} />
              )}
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity
            style={styles.modalCancel}
            onPress={onClose}
          >
            <CustomText variant="h5" fontFamily="Okra-Medium" fontSize={15} style={{color: Colors.error}}>
              Cancel
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    width: '80%',
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  modalOption: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalCancel: {
    paddingVertical: 12,
    marginTop: 8,
    alignItems: 'center',
  },
});

export default FilterSelectionModal;