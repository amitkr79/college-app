import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@unistyles/Constants';
import CustomText from '@components/global/CustomText';

interface ReactionBarProps {
  isLiked: boolean;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

const ReactionBar = ({ isLiked, onLike, onComment, onShare }: ReactionBarProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onLike}>
        <Icon 
          name={isLiked ? "thumb-up" : "thumb-up-off-alt"} 
          size={20} 
          color={isLiked ? Colors.primary : Colors.textSecondary} 
        />
        <CustomText 
          variant="h5" 
          fontFamily="Okra-Medium" 
          style={[ isLiked ? styles.activeText: styles.buttonText]}
           fontSize={11}
        >
          Like
        </CustomText>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={onComment}>
        <Icon 
          name="comment" 
          size={20} 
          color={Colors.textSecondary} 
        />
        <CustomText variant="h5"  fontSize={12} fontFamily="Okra-Medium" style={styles.buttonText}>
          Comment
        </CustomText>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={onShare}>
        <Icon 
          name="share" 
          size={20} 
          color={Colors.textSecondary} 
        />
        <CustomText variant="h5"  fontSize={12} fontFamily="Okra-Medium" style={styles.buttonText}>
          Share
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonText: {
    marginLeft: 6,
    color: Colors.textSecondary,
  },
  activeText: {
    color: Colors.primary,
    marginLeft: 6,
  },
});

export default ReactionBar;