import React from 'react';
import { View, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@unistyles/Constants';
// import CustomText from '../global/CustomText';
import { Comment, User } from '../../../types/socialTypes';
import CustomText from '@components/global/CustomText';

interface CommentSectionProps {
  comments: Comment[];
  users: Record<string, User>;
  commentText: string;
  setCommentText: (text: string) => void;
  onSubmit: () => void;
}

const CommentSection = ({ 
  comments, 
  users, 
  commentText, 
  setCommentText, 
  onSubmit 
}: CommentSectionProps) => {
  return (
    <View style={styles.container}>
      {/* Comment List */}
      {comments.length > 0 && (
        <FlatList
          data={comments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const user = users[item.userId];
            return (
              <View style={styles.commentContainer}>
                <Image 
                  source={{ uri: user.avatarUrl }} 
                  style={styles.commentAvatar} 
                />
                <View style={styles.commentContent}>
                  <CustomText variant="h5" fontSize={10} fontFamily="Okra-Medium">
                    {user.name}
                  </CustomText>
                  <CustomText variant="h5" fontSize={10} fontFamily="Okra-Regular">
                    {item.text}
                  </CustomText>
                  {/* <View style={styles.commentActions}>
                    <CustomText variant="h5" fontSize={10} color="secondary">
                      {item.createdAt.toLocaleDateString()}
                    </CustomText>
                    <TouchableOpacity>
                      <CustomText variant="h5" fontFamily="Okra-Medium">
                        Like
                      </CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <CustomText variant="h5" fontFamily="Okra-Medium">
                        Reply
                      </CustomText>
                    </TouchableOpacity>
                  </View> */}
                </View>
              </View>
            );
          }}
          style={styles.commentList}
        />
      )}
      
      {/* Comment Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          placeholderTextColor={Colors.textTertiary}
          value={commentText}
          onChangeText={setCommentText}
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={onSubmit}
          disabled={!commentText.trim()}
        >
          <Icon 
            name="send" 
            size={20} 
            color={commentText.trim() ? Colors.primary : Colors.textTertiary} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  commentList: {
    maxHeight: 200,
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,

  },
  commentActions: {
    flexDirection: 'row',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    borderRadius: 20,
    paddingHorizontal: 15,
    // paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'Okra-Regular',
    color: Colors.textPrimary,
    maxHeight: 100,
  },
  sendButton: {
    padding: 5,
  },
});

export default CommentSection;