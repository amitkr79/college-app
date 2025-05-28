import {View, Text, Image, TextInput} from 'react-native';
import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {getStartedStyles} from '@unistyles/authStyles';
import CustomText from '@components/global/CustomText';
import CustomButton from '@components/global/CustomButton';
import {resetAndNavigate} from '@utils/NavigationUtils';
import Icon from '@components/global/Icon';
import {Colors} from '@unistyles/Constants';

const GetStarted = () => {
  const {styles} = useStyles(getStartedStyles);
  const redirect = () => {
    resetAndNavigate('LoginScreen');
  };
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('@assets/images/getstarted.png')}
          style={styles.bannerImage}
        />
        <CustomText
          variant="h5"
          fontFamily="Okra-Bold"
          style={styles.text}
          color="#fff"
          fontSize={25}>
          Incampus
        </CustomText>
        <CustomText
          variant="h5"
          fontFamily="Okra-Regular"
          style={styles.text}
          color="#fff"
          fontSize={10}>
          A complete solution
        </CustomText>
        <CustomText
          variant="h5"
          fontFamily="Okra-Regular"
          style={[styles.text, {marginTop: 50, paddingHorizontal: 30}]}
          color="#fff"
          fontSize={10}
          numberOfLines={2}>
          Your college upadates right in your pocket. Join the club, register
          for new events, and much more!
        </CustomText>
      </View>
      <View style={styles.btnContainer}>
        <CustomButton
          onPress={() => redirect()}
          disabled={false}
          loading={false}
          buttonStyle={styles.getStartedbutton}
          icon={{
            name: 'arrow-forward',
            iconFamily: 'MaterialIcons',
            position: 'right',
            color: Colors.primary, // Custom icon color
            size: 30,
            style: {left: 35},
          }}>
          <CustomText
            variant="h6"
            fontFamily="Okra-Bold"
            color={Colors.primary}>
            Start Your Journey
          </CustomText>
        </CustomButton>
      </View>
    </View>
  );
};

export default GetStarted;
