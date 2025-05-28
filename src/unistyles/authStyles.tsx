import {createStyleSheet} from 'react-native-unistyles';
import {Colors} from './Constants';

export const splashStyles = createStyleSheet(({colors, device}) => ({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    // backgroundColor: "#FFFFFF",
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: device.width * 0.6,
    height: device.height * 0.5,
    resizeMode: 'contain',
    // marginTop: 40,
  },
  treeImage: {
    width: device.width * 0.4,
    height: device.height * 0.14,
    resizeMode: 'contain',
  },
  msgText: {
    textAlign: 'center',
  },
  animatedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
}));

export const loginStyles = createStyleSheet(({colors, device, border}) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  cover: {
    width: '100%',
    height: device.height * 0.42,
    resizeMode: 'cover',
    borderRadius: 25,
  },
  bottomContainer: {
    width: '100%',
    backgroundColor: Colors.background,
  },
  email: {
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  breakerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    overflow: 'hidden',
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
  },
  horizontalLine: {
    height: 1,
    width: '100%',
    position: 'absolute',
    backgroundColor: colors.border,
    zIndex: -1,
  },
  breakerText: {
    opacity: 0.8,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 45,
    marginVertical: 5,
    borderRadius: border.md,
  },
  signinBtn: {
    borderRadius: 30,
    backgroundColor: Colors.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 26,
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerTextContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  footerText: {
    textDecorationLine: 'underline',
    fontSize: 10,
  },
}));

export const getStartedStyles = createStyleSheet(({colors, device}) => ({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  bannerImage: {
    width: device.width,
    height: device.height * 0.5,
    marginTop: device.height * 0.1,
  },
  text: {
    textAlign: 'center',
  },
  btnContainer: {},
  getStartedbutton: {
    top: 120,
    paddingHorizontal: 50,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
}));
