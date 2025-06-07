// ClubTabs.tsx
import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import CustomText from '../../../components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import MemberItem from './MemberItem';
import {ClubDetail, ClubMember, User} from '../../../types/clubTypes';

interface ClubTabsProps {
  club: ClubDetail;
  members: (ClubMember & {user: User})[];
  currentUserId: string;
}

const ClubTabs = ({club, members, currentUserId}: ClubTabsProps) => {
  const [activeTab, setActiveTab] = useState('About');

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContainer}>
        {['About', 'Posts', 'Events', 'Members', 'Gallery'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}>
            <CustomText
              variant="h7"
              fontFamily="Okra-Medium"
              style={[
                styles.tabText,
                activeTab === tab ? styles.activeTabText : styles.tabText,
              ]}>
              {tab}
            </CustomText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.tabContent}>
        {activeTab === 'About' && (
          <>
            <CustomText variant="h7" style={styles.description}>
              {club.description}
            </CustomText>
            {club.socialLinks.website && (
              <View style={styles.socialLink}>
                <Icon name="link" size={20} color={Colors.textSecondary} />
                <CustomText
                  variant="h7"
                  fontFamily="Okra-Medium"
                  style={styles.linkText}>
                  {club.socialLinks.website}
                </CustomText>
              </View>
            )}
            <View style={styles.infoSection}>
              <CustomText
                variant="h6"
                fontFamily="Okra-Medium"
                style={styles.sectionTitle}>
                Club Admins
              </CustomText>
              <View style={styles.adminsContainer}>
                {members
                  .filter(m => m.role === 'admin')
                  .map(member => (
                    <MemberItem
                      key={member.userId}
                      member={member}
                      user={member.user}
                      isCurrentUser={member.userId === currentUserId}
                    />
                  ))}
              </View>
            </View>
          </>
        )}

        {activeTab === 'Members' && (
          <View style={styles.adminsContainer}>
            {members.map(member => (
              <MemberItem
                key={member.userId}
                member={member}
                user={member.user}
                isCurrentUser={member.userId === currentUserId}
              />
            ))}
          </View>
        )}

        {/* TODO: Add Posts, Events, Gallery tab contents */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  tabButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: Colors.backgroundLight,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.white,
  },
  tabContent: {
    padding: 15,
  },
  description: {
    marginBottom: 20,
    lineHeight: 22,
  },
  socialLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  linkText: {
    marginLeft: 8,
    color: Colors.primary,
  },
  infoSection: {
    marginTop: 15,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  adminsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 15,
  },
});

export default ClubTabs;
