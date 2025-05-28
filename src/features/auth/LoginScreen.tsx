import {View, Image, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useStyles} from 'react-native-unistyles';
import {loginStyles} from '@unistyles/authStyles';
import BreakerText from '@components/ui/BreakerText';
import CustomText from '@components/global/CustomText';
import CustomInput from '@components/global/CustomInput';
import Icon from '@components/global/Icon';
import {Colors} from '@unistyles/Constants';
import CustomButton from '@components/global/CustomButton';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import { resetAndNavigate } from '@utils/NavigationUtils';
import ContactPhone from '@components/ui/ContactPhone';

const LoginScreen = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {styles} = useStyles(loginStyles);

  useEffect(()=>{
    if(keyboardOffsetHeight==0){
      Animated.timing(animatedValue,{
        toValue:0,
        duration:500,
        useNativeDriver:true
      }).start()
    }else{
      Animated.timing(animatedValue,{
        toValue:-keyboardOffsetHeight * 0.25,
        duration:500,
        useNativeDriver:true
      }).start()
    }
  },[keyboardOffsetHeight])

  // todo: login logic
  const handleLogin = () => {
    resetAndNavigate('AnimatedTab')
  };

  const handleContact = ()=>{

  }

  return (
    <View style={styles.container}>
      <Image
        source={require('@assets/images/cover.png')}
        style={styles.cover}
      />
      <Animated.ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={{transform:[{translateY:animatedValue}],}}
        contentContainerStyle={styles.bottomContainer}
        >
        <CustomText
          variant="h5"
          fontFamily="Okra-Medium"
          fontSize={22}
          style={styles.title}>
          Welcome!
        </CustomText>
        <BreakerText text="Log in with your college email" />

        <View>
          {/* Email Input with Clear Icon */}
          <View style={styles.email}>
            <CustomInput
              onChangeText={text => setEmail(text)}
              value={email}
              placeholder="Enter your email..."
              inputMode="email"
              type="email"
              left={
                <CustomText
                  style={styles.email}
                  variant="h6"
                  fontFamily="Okra-Regular">
                  Email :
                </CustomText>
              }
              right={
                email.length > 0 && (
                  <TouchableOpacity onPress={() => setEmail('')}>
                    <Icon
                      iconFamily="MaterialIcons"
                      name="close"
                      size={20}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                )
              }
            />
          </View>

          {/* Password Input with Eye Toggle */}
          <View style={styles.email}>
            <CustomInput
              onChangeText={text => setPassword(text)}
              value={password}
              placeholder="Enter your password"
              inputMode="text"
              type="password"
              secureTextEntry={!showPassword}
              left={
                <CustomText
                  style={styles.email}
                  variant="h6"
                  fontFamily="Okra-Regular">
                  Password :
                </CustomText>
              }
              right={
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    iconFamily="Ionicons"
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              }
            />
            <CustomButton
              onPress={() => handleLogin()}
              disabled={false}
              loading={false}
              buttonStyle={styles.signinBtn}>
              <CustomText variant="h6" fontFamily="Okra-Bold" color="#fff">
                Sign in
              </CustomText>
            </CustomButton>
          </View>
        </View>
       <BreakerText text="or" />
       <View>              
       <ContactPhone/>
       </View>
      </Animated.ScrollView>

      <View style={styles.footer}>
        <CustomText>By continuing, you agree to our</CustomText>
        <View style={styles.footerTextContainer}>
          <CustomText style={styles.footerText}>Terms of Service</CustomText>
          <CustomText style={styles.footerText}>Privacy Policy</CustomText>
          <CustomText style={styles.footerText}>Content Policies</CustomText>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
