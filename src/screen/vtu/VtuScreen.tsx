import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderNav from '@components/global/HeaderNav';
import NotificationBanner from './NotificationBanner';
import { vtuNotificationData } from '@utils/dummyData';
import CustomText from '@components/global/CustomText';
import { Colors } from '@unistyles/Constants';
import { push } from '@utils/NavigationUtils';

const { width } = Dimensions.get('window');

const VtuScreen = () => {
  const iconData = [
    { 
      id: 1,
      source: require("@assets/academic/circular.png"),
      label: "Circulars",
      onPress: () => push('CircularScreen')
    },
    { 
      id: 2,
      source: require("@assets/academic/papers.png"),
      label: "Prevous Year",
      onPress: () => push('PreviousPapersScreen')
    },
    { 
      id: 3,
      source: require("@assets/academic/newspaper.png"),
      label: "Syllabus",
      onPress: () => push('SyllabusScreen')
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNav text='back' />
      <NotificationBanner data={vtuNotificationData} />
      
      <View style={styles.content}>
        <CustomText variant='h5' fontFamily='Okra-Medium' style={styles.sectionTitle}>
          Circular & Resources
        </CustomText>
        
        <View style={styles.iconGrid}>
          {iconData.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.iconBox}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.glassBox}>
                <Image 
                  source={item.source}
                  resizeMode='contain'
                  style={styles.icon}
                />
                <CustomText 
                  variant='h7' 
                  fontFamily='Okra-Light'
                  style={styles.iconLabel}
                  fontSize={11}
                >
                  {item.label}
                </CustomText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    marginBottom: 20,
    paddingLeft: 5,
  },
  iconGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  iconBox: {
    width: (width - 50) / 3, // 3 items with spacing
    marginBottom: 20,
    alignItems: 'center',
  },
  glassBox: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    // Glass morphism effect
    backgroundColor: Colors.primaryGloss,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
    // Shadow
    shadowColor: Colors.background,
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  iconLabel: {
    color: Colors.textPrimary,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default VtuScreen;