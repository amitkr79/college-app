import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import CustomText from '../../components/global/CustomText';
// import styles from './jobsScreenStyles';
import { Colors } from '@unistyles/Constants';
import styles from '@unistyles/jobScreenStyles'
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={Colors.primary} />
    <CustomText variant="h7" style={styles.loadingText}>
      Loading...
    </CustomText>
  </View>
);

export default LoadingScreen;