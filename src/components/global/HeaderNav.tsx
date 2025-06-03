import {View, Text, TouchableOpacity} from 'react-native';
import React, {FC, use} from 'react';
import {useStyles} from 'react-native-unistyles';
import {dashboardStyle} from '@unistyles/dashboardStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from './CustomText';
import { Colors } from '@unistyles/Constants';
import { goBack } from '@utils/NavigationUtils';
import Icon from './Icon';
type HeaderNavProps={
  text:string,
  onPress?:()=>void,
  rightAction?:boolean
}
const HeaderNav:FC<HeaderNavProps> = ({text,onPress,rightAction}) => {
  const {styles} = useStyles(dashboardStyle);
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.black} />
          <CustomText
            variant="h6"
            fontFamily="Okra-Medium"
            style={styles.headerTitle}>
            {text}
          </CustomText>
        </TouchableOpacity>
        

      </View>
    </View>
  );
};

export default HeaderNav;
