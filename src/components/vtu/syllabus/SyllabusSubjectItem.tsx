import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';

interface SyllabusSubjectItemProps {
  code?: string;
  title: string;
  onPress: () => void;
  loading?: boolean;
}

const SyllabusSubjectItem: React.FC<SyllabusSubjectItemProps> = ({
  title,
  onPress,
  loading,
}) => {
  return (
    <>
      {!loading ? (
        <TouchableOpacity
          style={styles.subjectItem}
          onPress={onPress}
          activeOpacity={0.7}
          disabled={loading}>
          <View style={styles.subjectContent}>
            <CustomText
              variant="h5"
              fontFamily="Okra-Medium"
              style={styles.subjectTitle}
              fontSize={13}
              color="black">
              {title}
            </CustomText>
          </View>

          <Icon name="picture-as-pdf" size={24} color={Colors.error} />
        </TouchableOpacity>
      ) : (
        <ActivityIndicator size="small" color={Colors.primary} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  subjectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    height: 80,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: {height: 2, width: 2},
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
});

export default SyllabusSubjectItem;
