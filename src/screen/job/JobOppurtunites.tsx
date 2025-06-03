import React from 'react';
import { FlatList, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomText from '../../components/global/CustomText';
import styles from '@unistyles/jobScreenStyles'
import { Colors } from '@unistyles/Constants';
import { JobListing } from '../../types/jobType';

const JobOppurtunites = ({ data }: { data: JobListing[] }) => {
  const renderJobItem = ({ item }: { item: JobListing }) => (
    <View style={[styles.jobCard, item.isFeatured && styles.featuredJob]}>
      {item.isFeatured && (
        <View style={styles.featuredBadge}>
          <Icon name="star" size={16} color={Colors.white} />
          <CustomText variant="h7" fontFamily="Okra-Medium" style={styles.featuredText}>
            Featured
          </CustomText>
        </View>
      )}
      
      <View style={styles.jobHeader}>
        <Image source={{ uri: item.company.logoUrl }} style={styles.companyLogo} />
        <View style={styles.jobInfo}>
          <CustomText variant="h6" fontFamily="Okra-Medium">
            {item.position}
          </CustomText>
          <CustomText variant="h7" fontFamily="Okra-Medium" color="primary">
            {item.company.name}
          </CustomText>
          <View style={styles.jobMeta}>
            <View style={styles.metaItem}>
              <Icon name="location-on" size={16} color={Colors.textSecondary} />
              <CustomText variant="h7" color="secondary">
                {item.location}
              </CustomText>
            </View>
            <View style={styles.metaItem}>
              <Icon name="work" size={16} color={Colors.textSecondary} />
              <CustomText variant="h7" color="secondary">
                {item.type}
              </CustomText>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.jobDetails}>
        {item.salary && (
          <View style={styles.detailItem}>
            <Icon name="attach-money" size={18} color={Colors.success} />
            <CustomText variant="h7" fontFamily="Okra-Medium">
              {item.salary}
            </CustomText>
          </View>
        )}
        
        <View style={styles.detailItem}>
          <Icon name="schedule" size={18} color={Colors.textSecondary} />
          <CustomText variant="h7">
            Posted {Math.floor((new Date().getTime() - item.postedAt.getTime()) / (1000 * 60 * 60 * 24))} days ago
          </CustomText>
        </View>
      </View>
      
      <View style={styles.tagsContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <CustomText variant="h7" fontFamily="Okra-Medium">
              {tag}
            </CustomText>
          </View>
        ))}
      </View>
      
      <TouchableOpacity style={styles.applyButton}>
        <CustomText variant="h7" fontFamily="Okra-Bold" style={styles.applyText}>
          Apply Now
        </CustomText>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderJobItem}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <CustomText variant="h7" style={styles.emptyText}>
          No job listings found
        </CustomText>
      }
    />
  );
};

export default JobOppurtunites;