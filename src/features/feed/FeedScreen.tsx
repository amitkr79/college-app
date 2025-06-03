import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import { mockFeedState } from '../../mocks/socialMocks';
// import PostCard from '../../components/social/PostCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@unistyles/Constants';
import CustomText from '@components/global/CustomText';
import { mockFeedState } from '@utils/socialMock';
import PostCard from './PostCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigate } from '@utils/NavigationUtils';

const FeedScreen = () => {
  const [feedData, setFeedData] = useState(mockFeedState);
  const [refreshing, setRefreshing] = useState(false);

  const handleLike = (postId: string) => {
    setFeedData(prev => {
      const updatedPosts = prev.posts.map(post => {
        if (post.id === postId) {
          const alreadyLiked = post.likes.includes(prev.currentUserId);
          return {
            ...post,
            likes: alreadyLiked
              ? post.likes.filter(id => id !== prev.currentUserId)
              : [...post.likes, prev.currentUserId]
          };
        }
        return post;
      });
      
      return { ...prev, posts: updatedPosts };
    });
  };

  const handleComment = (postId: string, text: string) => {
    setFeedData(prev => {
      const updatedPosts = prev.posts.map(post => {
        if (post.id === postId) {
          const newComment = {
            id: `comment-${Date.now()}`,
            userId: prev.currentUserId,
            text,
            createdAt: new Date(),
            likes: []
          };
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      });
      
      return { ...prev, posts: updatedPosts };
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // In a real app, this would fetch new data from the server
    setTimeout(() => setRefreshing(false), 1000);
  };

  const navigateToCreatePost = () => {
    // Navigation to create post screen
    navigate('CreatePostScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search posts, people, clubs..."
          placeholderTextColor={Colors.textTertiary}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter-list" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
      
      {/* Feed Content */}
      <FlatList
        data={feedData.posts}
        keyExtractor={item => item.id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <PostCard 
            post={item} 
            users={feedData.users} 
            clubs={feedData.clubs}
            currentUserId={feedData.currentUserId}
            onLike={handleLike}
            onComment={handleComment}
          />
        )}
        ListHeaderComponent={
          <TouchableOpacity 
            style={styles.createPostButton} 
            onPress={navigateToCreatePost}
          >
            <Icon name="edit" size={20} color={Colors.white} />
            <CustomText variant="h6" fontFamily="Okra-Medium" style={styles.createPostText}>
              Create a post
            </CustomText>
          </TouchableOpacity>
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    backgroundColor: Colors.primaryGloss,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: 'Okra-Regular',
    color: Colors.textPrimary,
  },
  filterButton: {
    padding: 10,
    marginLeft: 10,
  },
  createPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 15,
    margin: 15,
  },
  createPostText: {
    color: Colors.white,
    marginLeft: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default FeedScreen;