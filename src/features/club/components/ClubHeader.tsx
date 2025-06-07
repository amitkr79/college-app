import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import CustomText from '../../../components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Club} from '../../../types/clubTypes';

const club: Club = {
  id: 'club1',
  name: 'Robotics Club',
  description: 'We build robots and compete in national competitions.',
  category: 'technology',
  logoUrl: 'https://example.com/robotics-logo.jpg',
  coverImageUrl: 'https://example.com/robotics-cover.jpg',
  advisors: ['faculty1'],
  admins: ['user2'],
  members: ['user1', 'user2', 'user3', 'user4'],
  createdAt: new Date('2022-01-15'),
  isOfficial: true,
  socialLinks: {website: 'robotics.uni.edu', instagram: '@unirobotics'},
};

interface ClubHeaderProps {
  club: Club;
  isMember: boolean;
  onJoin: () => void;
  onLeave: () => void;
}

const ClubHeader = ({club, isMember, onJoin, onLeave}: ClubHeaderProps) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: club.coverImageUrl}} style={styles.coverImage} />
      <View style={styles.infoContainer}>
        <Image source={{uri: club.logoUrl}} style={styles.logo} />
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <CustomText variant="h4" fontFamily="Okra-Bold">
              {club.name}
            </CustomText>
            {club.isOfficial && (
              <Icon
                name="verified"
                size={20}
                color={Colors.primary}
                style={styles.verified}
              />
            )}
          </View>
          <CustomText variant="h7" color="secondary">
            {club.category.charAt(0).toUpperCase() + club.category.slice(1)}{' '}
            Club
          </CustomText>
        </View>
      </View>
      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.actionButton, styles.joinButton]}>
          <Icon name="add" size={20} color={Colors.primary} />
          <CustomText
            variant="h7"
            fontFamily="Okra-Medium"
            style={styles.actionText}>
            Join Club
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="share" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  coverImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    padding: 15,
    marginTop: -40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    marginTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verified: {
    marginLeft: 5,
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  joinButton: {
    backgroundColor: Colors.primaryGloss,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  actionText: {
    marginLeft: 8,
    color: Colors.primary,
  },
  iconButton: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
  },
});

export default ClubHeader;
