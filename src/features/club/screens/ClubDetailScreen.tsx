import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from '@unistyles/Constants';
import {mockClubDetails} from '@utils/ClubMock';
import ClubHeader from '@features/club/components/ClubHeader';
import ClubTabs from '@features/club/components/ClubTabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@utils/naviagtionTypes';

// Temporary mock users data - should be moved to a separate file
const mockUsers: Record<string, {id: string; name: string; avatarUrl: string}> =
  {
    user1: {
      id: 'user1',
      name: 'Alex Johnson',
      avatarUrl: 'https://example.com/avatar1.jpg',
    },
    user2: {
      id: 'user2',
      name: 'Taylor Swift',
      avatarUrl: 'https://example.com/avatar2.jpg',
    },
    user3: {
      id: 'user3',
      name: 'Jamie Smith',
      avatarUrl: 'https://example.com/avatar3.jpg',
    },
    user4: {
      id: 'user4',
      name: 'Casey Williams',
      avatarUrl: 'https://example.com/avatar4.jpg',
    },
    currentUser: {
      id: 'currentUser',
      name: 'You',
      avatarUrl: 'https://example.com/avatar-you.jpg',
    },
  };

type ClubDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'ClubDetailScreen'>;

const ClubDetailScreen:React.FC<ClubDetailScreenProps> = ({route,navigation}) => {
  const clubId = route.params?.clubId || 'club1'; // Fallback to club1 if no ID provided
  const club = mockClubDetails[clubId];

  if (!club) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Club not found</Text>
      </View>
    );
  }

  const [isMember, setIsMember] = useState(
    club.members.some(m => m.userId === 'currentUser'),
  );

  const handleJoin = () => {
    setIsMember(true);
    // TODO: Add API call to join club
  };

  const handleLeave = () => {
    setIsMember(false);
    // TODO: Add API call to leave club
  };

  const membersWithUserData = club.members.map(member => ({
    ...member,
    user: mockUsers[member.userId] || {
      id: member.userId,
      name: 'Unknown User',
      avatarUrl: 'https://example.com/default-avatar.jpg',
    },
  }));

  return (
    <ScrollView style={styles.container}>
      <ClubHeader
        club={club}
        isMember={isMember}
        onJoin={handleJoin}
        onLeave={handleLeave}
      />

      <ClubTabs
        club={club}
        members={membersWithUserData}
        currentUserId="currentUser"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  notFoundText: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
});

export default ClubDetailScreen;
