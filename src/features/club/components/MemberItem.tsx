import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from '../../../components/global/CustomText';
import { Colors } from '@unistyles/Constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ClubMember } from '../../../types/clubTypes';
import { User } from '../../../types/socialTypes';

const member: ClubMember = {
  userId: 'user2',
  role: 'admin',
  joinedAt: new Date('2022-03-15'),
};

const user: User = {
  id: 'user2',
  name: 'User Name',
  avatarUrl: 'https://example.com/avatar.jpg',
};

const MemberItem = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      <View style={styles.info}>
        <CustomText variant="h6" fontFamily="Okra-Medium">
          {user.name}
        </CustomText>
        <CustomText variant="h7" color="secondary">
          {member.role.charAt(0).toUpperCase() + member.role.slice(1)} • You
        </CustomText>
      </View>
      {member.role === 'admin' && (
        <View style={styles.badge}>
          <Icon name="star" size={16} color={Colors.white} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  info: {
    flex: 1,
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

export default MemberItem;