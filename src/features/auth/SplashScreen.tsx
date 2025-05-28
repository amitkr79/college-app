import {View, Text, Image} from 'react-native';
import React, {FC, useEffect} from 'react';
import {useStyles} from 'react-native-unistyles';
import {splashStyles} from '@unistyles/authStyles';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CustomText from '@components/global/CustomText';
import { resetAndNavigate } from '@utils/NavigationUtils';

const SplashScreen: FC = () => {
  const {styles} = useStyles(splashStyles);
  useEffect(()=>{
    const timeoutId = setTimeout(()=>{
      resetAndNavigate('GetStarted')
    },3000)
    return ()=> clearTimeout(timeoutId)
  })
  return (
    <View style={styles.container}>
      <Image
        source={require('@assets/images/logo.png')}
        style={styles.logoImage}
      />
      <Animated.View 
        style={styles.animatedContainer}
        entering={FadeInDown.delay(400).duration(800)}
      >
          <Image 
            source={require('@assets/images/student.png')}
            style={styles.treeImage}
          />
          <CustomText
            variant='h5'
            style={styles.msgText}
            fontFamily='Okra-Medium'
            color='#fff'
          >
           Sir M Visvesvaraya Institute Of Technology
          </CustomText>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
