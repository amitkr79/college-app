import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';

interface SyllabusHeaderProps {
  title: string;
  subtitle: string;
}

const SyllabusHeader: React.FC<SyllabusHeaderProps> = ({title, subtitle}) => {
  return (
    <View style={styles.headerContainer}>
      <CustomText
        variant="h4"
        fontFamily="Okra-Medium"
        fontSize={17}
        style={styles.title}>
        {title}
      </CustomText>
      <CustomText
        variant="h6"
        fontFamily="Okra-Regular"
        fontSize={12}
        style={styles.subtitle}>
        {subtitle}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 16,
  },
  title: {
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    color: Colors.textSecondary,
  },
});

export default SyllabusHeader;