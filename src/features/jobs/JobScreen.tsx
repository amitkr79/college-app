import React, { useState } from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@unistyles/Constants';
import CustomText from '../../components/global/CustomText';
import { mockNotifications, mockJobListings } from '@utils/JobData';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '@components/ui/SearchBar';
// import NotificationScreen from './NotificationScreen';
import JobScreen from './JobScreen';
// import LoadingScreen from './LoadingScreen';
import styles from '@unistyles/jobScreenStyles'
import NotificationScreen from '@screen/job/PlacementCell';
import LoadingScreen from '@components/ui/LoadingScreen';
import JobOppurtunites from '@screen/job/JobOppurtunites';

const JobsScreen = () => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'jobs'>('notifications');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Filtering logic
  const filteredNotifications = mockNotifications.filter(notif => 
    notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notif.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredJobs = mockJobListings.filter(job => 
    job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handle tab switching with loading state
  const handleTabSwitch = (tab: 'notifications' | 'jobs') => {
    setIsLoading(true);
    setActiveTab(tab);
    
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <CustomText variant="h4" fontFamily="Okra-Bold">
          Placement Cell
        </CustomText>
        <TouchableOpacity>
          <Icon name="notifications" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
      
      {/* Search Bar */}
      <SearchBar
        placeholder='Search notification, jobs, companies...'
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'notifications' && styles.activeTab]}
          onPress={() => handleTabSwitch('notifications')}
        >
          <CustomText 
            variant="h6" 
            fontFamily="Okra-Medium"
            style={[styles.tabText, activeTab === 'notifications' && styles.activeTabText]}
          >
            Notifications
          </CustomText>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'jobs' && styles.activeTab]}
          onPress={() => handleTabSwitch('jobs')}
        >
          <CustomText 
            variant="h6" 
            fontFamily="Okra-Medium"
            style={[styles.tabText, activeTab === 'jobs' && styles.activeTabText]}
          >
            Job Opportunities
          </CustomText>
        </TouchableOpacity>
      </View>
      
      {/* Content */}
      {isLoading ? (
        <LoadingScreen />
      ) : activeTab === 'notifications' ? (
        <NotificationScreen data={filteredNotifications} />
      ) : (
        <JobOppurtunites data={filteredJobs} />
      )}
    </SafeAreaView>
  );
};

export default JobsScreen;