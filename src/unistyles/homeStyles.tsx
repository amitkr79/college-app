import {RFValue} from 'react-native-responsive-fontsize';
import {createStyleSheet} from 'react-native-unistyles';
import {Colors, isBannerHeight} from './Constants';
import {Dimensions, Platform, StatusBar} from 'react-native';

const {width} = Dimensions.get('window');
const boxWidth = (width - 5 * 20) / 4;
export const homeStyles = createStyleSheet(({colors, device, border}) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 4,
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: border.full,
    resizeMode: 'contain',
  },
  profileAvatar: {
    width: 35,
    marginHorizontal: 5,
    height: 35,
    borderRadius: border.full,
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryGloss,
    padding: 5,
    borderRadius: 10,
    width: 100,
    height:90,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  icon: {
    width: 35,
    height: 35,
    marginBottom: 8,
  },
}));

export const academicStyle=createStyleSheet(({colors,device,border})=>({
    container: {
      marginHorizontal: 16,
      marginTop: 24,
      backgroundColor: Colors.primaryGloss,
      borderRadius: 20,
      paddingVertical: 16,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.8)',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      overflow: 'hidden',
      position: 'relative',
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    title: {
      color: Colors.black,
    },
    viewAllButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.7)',
    },
    viewAllText: {
      color: Colors.primary,
    },
    grid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 4,
    },
    box: {
      width: boxWidth,
      alignItems: 'center',
    },
    iconContainer: {
      width: boxWidth * 0.7,
      height: boxWidth * 0.7,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.7)',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      // elevation: 3,
    },
    icon: {
      width: boxWidth * 0.4,
      height: boxWidth * 0.4,
      resizeMode: 'contain',
    },
    label: {
      fontSize: 12,
      fontWeight: '500',
      color: Colors.black,
      textAlign: 'center',
      marginTop: 4,
    },
}))
