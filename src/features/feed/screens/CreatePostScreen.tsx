import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@unistyles/Constants';
import CustomText from '../../../components/global/CustomText';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data
const mockCurrentUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  avatarUrl: 'https://picsum.photos/100',
  headline: 'Software Engineer',
  type: 'student',
  connections: [],
  pendingConnections: [],
};

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [showAudienceModal, setShowAudienceModal] = useState(false);
  const [audience, setAudience] = useState('Anyone');

  const handlePost = () => {
    const newPost: FeedPost = {
      id: Date.now().toString(),
      authorId: mockCurrentUser.id,
      content,
      type: images.length > 0 ? 'image' : 'text',
      mediaUrls: images,
      createdAt: new Date(),
      likes: [],
      comments: [],
      shares: 0,
    };
    
    console.log('Creating post:', newPost);
    navigation.goBack();
  };

  const handleImageSelect = () => {
    setImages([...images, `https://picsum.photos/300/200?${images.length}`]);
  };

  const isPostDisabled = () => !content.trim();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Post Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <CustomText variant="h5" fontFamily="Okra-Medium">Create Post</CustomText>
        <TouchableOpacity
          onPress={handlePost}
          disabled={isPostDisabled()}
          style={[
            styles.postButton,
            isPostDisabled() && styles.disabledButton
          ]}>
          <CustomText
            variant="h6"
            fontFamily="Okra-Medium"
            style={styles.postButtonText}>
            Post
          </CustomText>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Author Info */}
        <View style={styles.authorContainer}>
          <Image
            source={{ uri: mockCurrentUser.avatarUrl }}
            style={styles.avatar}
          />
          <View style={styles.authorInfo}>
            <CustomText variant="h6" fontFamily="Okra-Medium">
              {mockCurrentUser.name}
            </CustomText>
            <TouchableOpacity 
              style={styles.audienceSelector}
              onPress={() => setShowAudienceModal(true)}>
              <Icon name="public" size={16} color={Colors.textSecondary} />
              <CustomText
                variant="h5"
                fontFamily="Okra-Regular"
                style={styles.audienceText}>
                {audience}
              </CustomText>
              <Icon
                name="arrow-drop-down"
                size={16}
                color={Colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Input */}
        <TextInput
          style={styles.input}
          placeholder="What do you want to share?"
          placeholderTextColor={Colors.textTertiary}
          value={content}
          onChangeText={setContent}
          multiline
          autoFocus
        />

        {/* Media Preview */}
        {images.length > 0 && (
          <View style={styles.section}>
            <CustomText style={styles.sectionTitle}>Media</CustomText>
            <View style={styles.mediaPreview}>
              {images.map((uri, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image source={{ uri }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() =>
                      setImages(images.filter((_, i) => i !== index))
                    }>
                    <Icon name="close" size={18} color={Colors.white} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Post Options */}
        <View style={styles.section}>
          <CustomText style={styles.sectionTitle}>
            Add to your post
          </CustomText>
          <View style={styles.optionButtons}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleImageSelect}>
              <Icon name="image" size={24} color={Colors.success} />
              <CustomText style={styles.optionText}>Photo</CustomText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionButton}>
              <Icon name="tag" size={24} color={Colors.info} />
              <CustomText style={styles.optionText}>Tag</CustomText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionButton}>
              <Icon name="location-on" size={24} color={Colors.error} />
              <CustomText style={styles.optionText}>Location</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Audience Modal */}
      <Modal
        visible={showAudienceModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAudienceModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <CustomText variant="h5" fontFamily="Okra-Medium" style={styles.modalTitle}>
              Select Audience
            </CustomText>
            
            {['Anyone', 'Friends Only'].map(item => (
              <TouchableOpacity
                key={item}
                style={styles.audienceOption}
                onPress={() => {
                  setAudience(item);
                  setShowAudienceModal(false);
                }}>
                <CustomText style={styles.audienceOptionText}>{item}</CustomText>
                {audience === item && (
                  <Icon name="check" size={20} color={Colors.primary} />
                )}
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowAudienceModal(false)}>
              <CustomText style={styles.cancelText}>Cancel</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  postButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  disabledButton: {
    backgroundColor: Colors.backgroundLight,
  },
  postButtonText: {
    color: Colors.white,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: Colors.backgroundLight,
  },
  authorInfo: {
    flex: 1,
  },
  audienceSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  audienceText: {
    marginHorizontal: 4,
    color: Colors.textSecondary,
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: Colors.textSecondary,
    marginBottom: 12,
    fontFamily: 'Okra-Medium',
    fontSize: 16,
  },
  input: {
    minHeight: 120,
    fontSize: 16,
    fontFamily: 'Okra-Regular',
    color: Colors.textPrimary,
    padding: 0,
    marginBottom: 20,
  },
  mediaPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.backgroundLight,
    minWidth: 100,
  },
  optionText: {
    marginTop: 4,
    color: Colors.textSecondary,
    fontSize: 12,
    fontFamily: 'Okra-Regular',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  audienceOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  audienceOptionText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontFamily: 'Okra-Regular',
  },
  cancelButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
  },
  cancelText: {
    color: Colors.textPrimary,
    fontFamily: 'Okra-Medium',
  },
});

// Types
export type UserType = 'student' | 'faculty' | 'alumni';
export type PostType = 'text' | 'image' | 'event' | 'job' | 'poll';
export type ConnectionStatus = 'connected' | 'pending' | 'not-connected';

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  headline: string;
  type: UserType;
  connections: string[];
  pendingConnections: string[];
}

export interface FeedPost {
  id: string;
  authorId: string;
  content: string;
  type: PostType;
  mediaUrls?: string[];
  eventId?: string;
  createdAt: Date;
  likes: string[];
  comments: Comment[];
  shares: number;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: Date;
  likes: string[];
}

export default CreatePostScreen;