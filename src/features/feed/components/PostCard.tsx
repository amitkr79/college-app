import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Or switch to Ionicons
import { Colors } from '@unistyles/Constants';
import { FeedPost, User, Club } from '../../../types/socialTypes';
import CustomText from '@components/global/CustomText';
import ReactionBar from './ReactionBar';
import CommentSection from './CommentSection';

interface PostCardProps {
  post: FeedPost;
  users: Record<string, User>;
  clubs: Record<string, Club>;
  currentUserId: string;
  onLike: (postId: string) => void;
  onComment: (postId: string, text: string) => void;
  onRSVP?: (postId: string) => void; // Optional RSVP handler
}

const PostCard = ({
  post,
  users,
  clubs,
  currentUserId,
  onLike,
  onComment,
  onRSVP,
}: PostCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  const author = users[post.authorId] || clubs[post.authorId];
  const isLiked = post.likes.includes(currentUserId);
  
  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Author Header */}
      <View style={styles.header}>
        <Image source={{ uri: author.avatarUrl }} style={styles.avatar} />
        <View style={styles.authorInfo}>
          <CustomText variant="h6" fontFamily="Okra-Medium">
            {author.name}
          </CustomText>
          {'headline' in author && (
            <CustomText variant="h5" fontSize={10} color="secondary">
              {author.headline}
            </CustomText>
          )}
          <CustomText variant="h7" color="tertiary" fontSize={10}>
            {post.createdAt.toLocaleDateString()} • {post.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </CustomText>
        </View>
        <TouchableOpacity>
          <Icon name="more-vert" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      {/* Post Content */}
      <View style={styles.content}>
        <CustomText variant="h5" fontSize={11} fontFamily="Okra-Regular">
          {post.content}
        </CustomText>
        
        {post.mediaUrls?.map((url, index) => (
          <Image key={index} source={{ uri: url }} style={styles.media} resizeMode="cover" />
        ))}
        
        {post.type === 'event' && post.clubId && (
          <View style={styles.eventPreview}>
            <Image source={{ uri: clubs[post.clubId].logoUrl }} style={styles.eventLogo} />
            <View style={styles.eventInfo}>
              <CustomText variant="h6" fontFamily="Okra-Medium">
                {clubs[post.clubId].name} Event
              </CustomText>
              <CustomText variant="h5" fontSize={11} color="secondary">
                Friday, December 22 • 3:00 PM
              </CustomText>
              <TouchableOpacity style={styles.rsvpButton} onPress={() => onRSVP?.(post.id)}>
                <CustomText variant="h5" fontSize={12} fontFamily="Okra-Medium" style={styles.rsvpText}>
                  RSVP
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      
      {/* Stats Bar */}
      <View style={styles.statsBar}>
        <View style={styles.statsItem}>
          <Icon name="thumb-up" size={16} color={Colors.textSecondary} />
          <CustomText variant="h7" color="secondary">
            {post.likes.length}
          </CustomText>
        </View>
        <View style={styles.statsItem}>
          <CustomText variant="h7" color="secondary">
            {post.comments.length} comments
          </CustomText>
          <CustomText variant="h7" color="secondary" style={styles.statsDivider}>
            •
          </CustomText>
          <CustomText variant="h7" color="secondary">
            {post.shares} shares
          </CustomText>
        </View>
      </View>
      
      <ReactionBar
        isLiked={isLiked}
        onLike={() => onLike(post.id)}
        onComment={() => setExpanded(!expanded)}
        onShare={() => console.log('Share')}
      />
      
      {expanded && (
        <CommentSection
          comments={post.comments}
          users={users}
          commentText={commentText}
          setCommentText={setCommentText}
          onSubmit={handleCommentSubmit}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  content: {
    marginBottom: 15,
  },
  media: {
    width: '100%',
    height: 400,
    borderRadius: 8,
    marginTop: 10,
  },
  eventPreview: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundLight,
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  eventLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  rsvpButton: {
    backgroundColor: Colors.primary,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  rsvpText: {
    color: Colors.white,
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 8,
    marginBottom: 10,
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsDivider: {
    marginHorizontal: 8,
  },
});

export default PostCard;