// components/Academics.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Colors} from '@unistyles/Constants';
import CustomText from '@components/global/CustomText';
import { navigate } from '@utils/NavigationUtils';
import { useStyles } from 'react-native-unistyles';
import { academicStyle } from '@unistyles/homeStyles';

const ICONS = [
  {key: 'Circular', src: require('@assets/academic/Noticeboard.png')},
  {key: 'Academic', src: require('@assets/academic/Calendar.png')},
  {key: 'Time Table', src: require('@assets/academic/Timesheet.png')},
  {key: 'LMS', src: require('@assets/academic/BooksFolder.png')},
];
const SCREEN_MAP: {[key: string]: string} = {
  Circular: 'CircularScreen',
  Academic: 'AcademicCalendarScreen',
  'Time Table': 'TimeTableScreen',
  LMS: 'LmsScreen',
};
const Academics = () =>{
  const {styles} = useStyles(academicStyle)
  return  (
  <View style={styles.container}>
    {/* Header row */}
    <View style={styles.header}>
      <CustomText variant="h5" fontFamily="Okra-Bold" fontSize={14} style={styles.title}>
        Academics
      </CustomText>
      <TouchableOpacity 
        onPress={() => navigate('MvitScreen')}
        style={styles.viewAllButton}
      >
        <CustomText variant="h7" fontFamily="Okra-Medium" fontSize={12} style={styles.viewAllText}>
          View All
        </CustomText>
      </TouchableOpacity>
    </View>

    {/* Icons row */}
    <View style={styles.grid}>
      {ICONS.map(({key, src}) => (
        <TouchableOpacity
          key={key}
          style={styles.box}
          activeOpacity={0.7}
          onPress={() => navigate(SCREEN_MAP[key])}>
          <View style={styles.iconContainer}>
            <Image source={src} style={styles.icon} />
          </View>
          <CustomText fontFamily='Okra-Medium' style={styles.label}>{key}</CustomText>
        </TouchableOpacity>
      ))}
    </View>
  </View>
)};

export default Academics;

