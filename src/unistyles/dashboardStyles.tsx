import {Dimensions} from 'react-native';
import {createStyleSheet} from 'react-native-unistyles';
import {Colors} from './Constants';
const {width} = Dimensions.get('window');
const BOX_GAP = 14;
const BOX_SIZE = (width - 5 * 16) / 4;
const ICON_SIZE = BOX_SIZE * 0.5;
export const dashboardStyle = createStyleSheet(({colors, device}) => ({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 8,
    bottom:3
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    marginRight: 12,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  body: {
    paddingBottom: 24,
  },
  notificationCard: {
    margin: 16,
    marginBottom: 24,
    backgroundColor: Colors.primaryGloss,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingVertical:20
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginLeft: 8,
  },
  notificationText: {
    color: Colors.black,
    lineHeight: 20,
    fontSize: 14,
  },
  linkText: {
    color: Colors.primary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 12,
    justifyContent: 'flex-start',
    left: 7,
  },
  box: {
    width: BOX_SIZE,
    marginBottom: BOX_GAP,
    marginRight: BOX_GAP,
    alignItems: 'center',
  },
  iconContainer: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: Colors.primaryGloss,
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
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    resizeMode: 'contain',
  },
  boxLabel: {
    color: Colors.black,
    textAlign: 'center',
  },
}));
