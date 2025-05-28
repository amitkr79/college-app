import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '@components/home/HeaderSection';
import Animated from 'react-native-reanimated';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import {Colors} from '@unistyles/Constants';
import BannerContainer from '@components/home/BannerContainer';
import {navigate} from '@utils/NavigationUtils';
import CustomText from '@components/global/CustomText';
import Academics from '@components/home/Academics';

const HomeScreen: FC = () => {
  const {styles} = useStyles(homeStyles);
  return (
    <>
      <ScrollView bounces={false} style={styles.container}>
        <SafeAreaView />
        <StatusBar barStyle="dark-content" />

        {/* firs section i.e header  */}
        <Animated.View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: Colors.border,
            bottom: 10,
          }}>
          <Header />
        </Animated.View>

        {/* second section i.e banner  */}
        <BannerContainer />

        {/* third section  */}

        <View style={styles.secondContainer}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigate('MvitScreen')}>
            <Image
              source={require('@assets/academic/Graduate.png')}
              resizeMode="contain"
              style={styles.icon}
            />
            <CustomText variant="h7" fontFamily="Okra-Medium" fontSize={10}>
              MVIT
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.box}
            onPress={() => navigate('MvitScreen')}>
            <Image
              source={require('@assets/academic/Cap.png')}
              resizeMode="contain"
              style={styles.icon}
            />
            <CustomText variant="h7" fontFamily="Okra-Medium" fontSize={10}>
              VTU
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.box}
            onPress={() => navigate('MvitScreen')}>
            <Image
              source={require('@assets/academic/University.png')}
              resizeMode="contain"
              style={styles.icon}
            />
            <CustomText variant="h7" fontFamily="Okra-Medium" fontSize={10}>
              AICTE
            </CustomText>
          </TouchableOpacity>
        </View>

        {/* fourth section  */}

        <Academics/>


      </ScrollView>
    </>
  );
};

export default HomeScreen;
