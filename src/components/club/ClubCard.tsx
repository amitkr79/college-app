import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CustomText from '../global/CustomText';
import { Colors } from '@unistyles/Constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Club } from '../../types/clubTypes';


const club: Club = {
  id: 'club1',
  name: 'Robotics Club',
  description: 'We build robots and compete in national competitions.',
  category: 'technology',
  logoUrl: 'https://img.icons8.com/color/96/microphone.png',
  coverImageUrl: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa',
  advisors: ['faculty1'],
  admins: ['user2'],
  members: ['user1', 'user2', 'user3', 'user4'],
  createdAt: new Date('2022-01-15'),
  isOfficial: true,
  socialLinks: { website: 'robotics.uni.edu', instagram: '@unirobotics' },
};

interface ClubCardProps {
  club: Club;
  memberCount: number;
  onPress: () => void;
}

const ClubCard = ({ club, memberCount, onPress }: ClubCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: club.logoUrl }} style={styles.logo} />
      <View style={styles.info}>
        <CustomText variant="h6" fontFamily="Okra-Medium">
          {club.name}
        </CustomText>
        <CustomText variant="h7" color="secondary">
          {club.category.charAt(0).toUpperCase() + club.category.slice(1)}
        </CustomText>
        <View style={styles.memberInfo}>
          <Icon name="people" size={18} color={Colors.textSecondary} />
          <CustomText variant="h7" fontSize={10} color="secondary" style={{marginLeft:5}}>
            {club.members.length} members
          </CustomText>
        </View>
      </View>
      {club.isOfficial && (
        <View style={styles.badge}>
          <Icon name="verified" size={16} color={Colors.white} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  badge: {
    backgroundColor: Colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClubCard;