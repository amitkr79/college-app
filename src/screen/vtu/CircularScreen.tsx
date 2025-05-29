import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderNav from '@components/global/HeaderNav';
import CustomText from '@components/global/CustomText';
import { examCircular } from '@utils/dummyData';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@unistyles/Constants';

const CircularScreen = () => {
  const handleDownload = (item: any) => {
    // Handle download logic here
    console.log('Downloading:', item.text);
    // You can use Linking.openURL() for external links
    // or implement local file download logic
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <CustomText 
          variant="h5" 
          fontFamily='Okra-Regular'
          style={styles.itemText}
          fontSize={12}
          numberOfLines={2}
        >
          {item.text}
        </CustomText>
        <View style={styles.metaContainer}>
          <CustomText 
            variant="h7" 
            fontFamily='Okra-Medium'
            style={styles.dateText}
            fontSize={10}
          >
            {item.Date}
          </CustomText>
          <View style={[styles.typeBadge, item.type === 'pdf' && styles.pdfBadge]}>
            <CustomText 
              variant="h7" 
              fontFamily='Okra-Regular'
              fontSize={9}
              style={styles.typeText}
            >
              {item.type.toUpperCase()}
            </CustomText>
          </View>
        </View>
      </View>
      <TouchableOpacity 
        onPress={() => handleDownload(item)}
        style={styles.downloadButton}
      >
        <Icon name="cloud-download" size={24} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNav text='Circular List' />
      
      <FlatList
        data={examCircular}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  itemText: {
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    color: Colors.textTertiary,
    marginRight: 10,
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
  downloadButton: {
    padding: 8,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
});

export default CircularScreen;