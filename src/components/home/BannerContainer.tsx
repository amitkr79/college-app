import BannerModal from '@components/ui/BannerModal';
import { Colors } from '@unistyles/Constants';
import { bannerData } from '@utils/dummyData';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';

const BannerContainer = () => {
  const [selectedItem, setSelectedItem] = useState<{
    imageUrl: string | null;
    title?: string;
    description?: string;
    date?: string;
    type?: 'event' | 'notice';
  } | null>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const openModal = (item: {
    imageUrl: string;
    title?: string;
    description?: string;
    date?: string;
    type?: 'event' | 'notice';
  }) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(contentOffset / viewSize);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.bannerScroll}>
        {bannerData.map(item => (
          <View key={item.id} style={styles.bannerItem}>
            <TouchableOpacity onPress={() => openModal(item)}>
              <Image
                source={{uri: item.imageUrl}}
                style={styles.bannerImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.bannerTitle}>{item.title}</Text>
              <Text style={styles.bannerDescription}>{item.description}</Text>
              <View style={styles.metaContainer}>
                <Text style={styles.bannerDate}>{item.date}</Text>
                <Text
                  style={[
                    styles.bannerType,
                    item.type === 'event'
                      ? styles.eventType
                      : styles.noticeType,
                  ]}>
                  {item.type.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {bannerData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>

      {/* Reusable Image Modal */}
      <BannerModal
        visible={!!selectedItem}
        imageUrl={selectedItem?.imageUrl || null}
        title={selectedItem?.title}
        description={selectedItem?.description}
        date={selectedItem?.date}
        type={selectedItem?.type}
        onClose={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    backgroundColor: Colors.background,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 15,
    color: Colors.black,
  },
  bannerScroll: {
    height: 260,
  },
  bannerItem: {
    width: Dimensions.get('window').width - 38,
    marginHorizontal: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors.card,
    elevation: 3,
    shadowColor: Colors.darkCard,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bannerImage: {
    width: '100%',
    height: 140,
  },
  textContainer: {
    padding: 15,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.black,
  },
  bannerDescription: {
    fontSize: 14,
    color: Colors.lightText,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerDate: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  bannerType: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  eventType: {
    backgroundColor: Colors.primaryGloss,
    color: Colors.primary,
  },
  noticeType: {
    backgroundColor: Colors.secondaryLight,
    color: Colors.secondary,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.primary,
  },


});

export default BannerContainer;
