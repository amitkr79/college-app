import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Colors} from '@unistyles/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {goBack, navigate} from '@utils/NavigationUtils';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStyles} from 'react-native-unistyles';
import {dashboardStyle} from '@unistyles/dashboardStyles';
import CustomText from '@components/global/CustomText';

const ICONS = [
  {key: 'Circular', src: require('@assets/academic/Noticeboard.png')},
  {key: 'Academic', src: require('@assets/academic/Calendar.png')},
  {key: 'Time Table', src: require('@assets/academic/Timesheet.png')},
  {key: 'LMS', src: require('@assets/academic/BooksFolder.png')},
  {key: 'Transport', src: require('@assets/academic/Bus.png')},
  {key: 'Exam', src: require('@assets/academic/Exam.png')},
  {key: 'Fees', src: require('@assets/academic/CardWallet.png')},
  {key: 'Scholarship', src: require('@assets/academic/BankSafe.png')},
  {key: 'Attendance', src: require('@assets/academic/EditAccount.png')},
  {key: 'Results', src: require('@assets/academic/TestPassed.png')},
  {key: 'News', src: require('@assets/academic/News.png')},
];
const SCREEN_MAP: {[key: string]: string} = {
  Circular: 'CircularScreen',
  Academic: 'AcademicCalendarScreen',
  'Time Table': 'TimeTableScreen',
  LMS: 'LmsScreen',
  Transport: 'TransportScreen',
  Exam: 'ExamScreen',
  Fees: 'FeesScreen',
  Scholarship: 'ScholarshipScreen',
  Attendance: 'AttendanceScreen',
  Results: 'ResultsScreen',
  News: 'NewsScreen',
};

const MvitScreen = () => {
  const {styles} = useStyles(dashboardStyle);
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.black} />
          <CustomText
            variant="h6"
            fontFamily="Okra-Medium"
            style={styles.headerTitle}>
            Dashboard
          </CustomText>
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <CustomText
            variant="h7"
            fontFamily="Okra-Light"
            style={{marginRight: 8}}>
            Jone doe
          </CustomText>
          <Image
            source={require('@assets/images/user.png')}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}>
        {/* Notification Card */}
        <View style={styles.notificationCard}>
          <View style={styles.notificationHeader}>
            <Ionicons name="notifications" size={20} color={Colors.primary} />
            <CustomText
              variant="h6"
              style={{marginLeft: 6}}
              fontFamily="Okra-Light">
              Notifications
            </CustomText>
          </View>
          <TouchableOpacity>
            <CustomText
              variant="h7"
              fontFamily="Okra-Regular"
              style={styles.notificationText}>
              <CustomText
                numberOfLines={2}
                variant="h7"
                fontFamily="Okra-Regular"
                fontSize={11}>
                Induction Programme for 1st year will commence 1st December
                2022…
              </CustomText>
              <CustomText fontFamily="Okra-Medium" style={styles.linkText}>
                {' '}
                Click Here{'>'}
              </CustomText>
            </CustomText>
          </TouchableOpacity>
        </View>

        {/* Features Grid */}
        <View style={styles.grid}>
          {ICONS.map(({key, src}) => (
            <TouchableOpacity
              key={key}
              style={styles.box}
              onPress={() => navigate(SCREEN_MAP[key])}
              activeOpacity={0.8}>
              <View style={styles.iconContainer}>
                <Image source={src} style={styles.icon} />
              </View>
              {/* <Text style={styles.boxLabel}>{key}</Text> */}
              <CustomText
                variant="h6"
                fontSize={10}
                fontFamily="Okra-Medium"
                style={styles.boxLabel}>
                {key}
              </CustomText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MvitScreen;
