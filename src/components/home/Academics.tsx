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
          <Text style={styles.label}>{key}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
)};

export default Academics;


//   container: {
//     marginHorizontal: 16,
//     marginTop: 24,
//     backgroundColor: Colors.primaryGloss,
//     borderRadius: 20,
//     paddingVertical: 16,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.8)',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     // elevation: 5,
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   // Pseudo glass effect using a white overlay
//   glassOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(255, 255, 255, 0.3)',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
//   title: {
//     color: Colors.black,
//     textShadowColor: 'rgba(0, 0, 0, 0.1)',
//     textShadowOffset: {width: 0, height: 1},
//     textShadowRadius: 2,
//   },
//   viewAllButton: {
//     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.7)',
//   },
//   viewAllText: {
//     color: Colors.primary,
//   },
//   grid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 4,
//   },
//   box: {
//     width: boxWidth,
//     alignItems: 'center',
//   },
//   iconContainer: {
//     width: boxWidth * 0.7,
//     height: boxWidth * 0.7,
//     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.7)',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     // elevation: 3,
//   },
//   icon: {
//     width: boxWidth * 0.4,
//     height: boxWidth * 0.4,
//     resizeMode: 'contain',
//   },
//   label: {
//     fontSize: 12,
//     fontWeight: '500',
//     color: Colors.black,
//     textAlign: 'center',
//     marginTop: 4,
//   },
// });