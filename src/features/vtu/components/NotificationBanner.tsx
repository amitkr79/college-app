import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import {Colors, Fonts} from '@unistyles/Constants';
import {navigate} from '@utils/NavigationUtils';
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  Dimensions,
  Animated,
} from 'react-native';

const {width} = Dimensions.get('window');

interface NotificationBannerProps {
  data: Array<{
    id: string;
    text: string;
    link: string;
    type: string;
    date: string;
  }>;
  autoScrollInterval?: number; // Optional prop to control scroll speed
}

const NotificationBanner = ({
  data,
  autoScrollInterval = 4000,
}: NotificationBannerProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidth = width - 30 + 15; // Width + marginRight

  const handlePress = async (link: string) => {
    navigate('CircularScreen');
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (data.length <= 1) return; // No need to auto-scroll if only one item

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * itemWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [currentIndex, data.length, autoScrollInterval]);

  // Handle manual scroll
  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / itemWidth);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={itemWidth}
        decelerationRate="normal">
        {data.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.bannerItem}
            onPress={() => handlePress(item.link)}
            activeOpacity={0.7}>
            <View style={styles.textContainer}>
              <View style={styles.notificationHeader}>
                <Icon
                  iconFamily="Ionicons"
                  name="notifications"
                  size={20}
                  color={Colors.primary}
                />
                <CustomText
                  variant="h6"
                  style={{marginLeft: 6}}
                  fontFamily="Okra-Bold"
                    fontSize={14}
                  >
                  Notifications
                </CustomText>
              </View>
              <CustomText
                variant="h5"
                fontFamily={Fonts.Regular}
                numberOfLines={2}
                fontSize={13}
                style={styles.notificationText}>
                {item.text}
              </CustomText>

              <View style={styles.footer}>
                <CustomText
                  variant="h7"
                  fontFamily={Fonts.Regular}
                  fontSize={10}
                  style={styles.dateText}>
                  {item.date}
                </CustomText>

                <View
                  style={[
                    styles.typeBadge,
                    item.type === 'pdf' && styles.pdfBadge,
                  ]}>
                  <CustomText
                    variant="h7"
                    fontFamily="Okra-Bold"
                    fontSize={10}
                    style={styles.typeText}>
                    {item.type.toUpperCase()}
                  </CustomText>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  scrollContent: {
    paddingRight: 15,
  },
  bannerItem: {
    width: Dimensions.get('window').width - 30,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: Colors.primaryGloss,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: Colors.background,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textContainer: {
    padding: 15,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  notificationText: {
    color: Colors.textPrimary,
    marginBottom: 10,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    color: Colors.textTertiary,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: Colors.background,
  },
  pdfBadge: {
    backgroundColor: Colors.error,
  },
  typeText: {
    color: Colors.white,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 12,
  },
  inactiveDot: {
    backgroundColor: Colors.border,
  },
});

export default NotificationBanner;
