import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {phoneStyles} from '@unistyles/phoneStyles';
import CustomText from '@components/global/CustomText';

const ContactPhone = () => {
  const {styles} = useStyles(phoneStyles);

  return (
    <View style={styles.socialContainer}>
      <TouchableOpacity style={styles.iconContainer}>
        <Image
          source={require('@assets/icons/phone.png')}
          style={styles.gimg}
        />
      </TouchableOpacity>
      <CustomText
        variant='h6'
        fontFamily='Okra-Black'
      >|  Contact office</CustomText>
    </View>
  );
};

export default ContactPhone;
