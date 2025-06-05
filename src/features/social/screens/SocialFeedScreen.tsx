import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SocialFeedScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Social Feed</Text>
      <FlatList
        data={[]}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            {/* Post content will go here */}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default SocialFeedScreen; 