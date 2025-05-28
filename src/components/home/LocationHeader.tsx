import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {FC} from 'react';
import {useSharedState} from '@features/tabs/SharedContext';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import Icon from '@components/global/Icon';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import {navigate} from '@utils/NavigationUtils';

const LocationHeader: FC = () => {
  const {scrollYGlobal} = useSharedState();
  const {styles} = useStyles(homeStyles);
  const opacityFadingStyles = useAnimatedStyle(() => {
    const opacity = interpolate(scrollYGlobal.value, [0, 80], [1, 0]);
    return {
      opacity: opacity,
    };
  });
  return (
    <Animated.View style={opacityFadingStyles}>
      <View style={styles.flexRowBetween}>
        <View style={styles.flexRowGap}>
          <Icon
            name="map-marker"
            color={Colors.info}
            iconFamily="MaterialCommunityIcons"
            size={28}
          />
          {/* locationsection */}
          <View>
            <TouchableOpacity style={styles.flexRow}>
              <CustomText
                variant="h5"
                color={Colors.info}
                fontFamily="Okra-Bold"
                fontSize={15}>
                Sir MVIT
              </CustomText>
              <Icon
                name="chevron-down"
                color={Colors.info}
                iconFamily="MaterialCommunityIcons"
                size={18}
              />
            </TouchableOpacity>
            <CustomText
              color={Colors.info}
              fontFamily="Okra-Medium"
              fontSize={10}>
              Bangalore, Karnataka
            </CustomText>
          </View>
        </View>
        {/* profile section  */}
        <View style={styles.flexRowGap}>
          <TouchableOpacity
            style={styles.profileAvatar}
            onPress={() => navigate('ProfileScreen')}>
            <Image
              source={require('@assets/images/user.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileAvatar}
            onPress={() => navigate('Notification')}>
            <Icon
              name="bell-outline"
              iconFamily="MaterialCommunityIcons"
              size={30}
              color={Colors.info}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default LocationHeader;
