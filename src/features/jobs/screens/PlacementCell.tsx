import React from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomText from '@components/global/CustomText';
import styles from '@unistyles/jobScreenStyles'
import { Colors } from '@unistyles/Constants';
import { JobNotification } from '../../../types/jobType';

const PlacementCell = ({ data }: { data: JobNotification[] }) => {
  const renderNotificationItem = ({ item }: { item: JobNotification }) => (
    <View style={styles.notificationCard}>
      <View style={styles.notificationHeader}>
        <View style={[
          styles.categoryBadge,
          item.category === 'drive' && styles.driveBadge,
          item.category === 'announcement' && styles.announcementBadge,
          item.category === 'training' && styles.trainingBadge,
          item.category === 'result' && styles.resultBadge,
        ]}>
          <CustomText variant="h7" style={styles.categoryText}>
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </CustomText>
        </View>
        {item.isImportant && (
          <Icon name="error" size={18} color={Colors.warning} style={styles.importantIcon} />
        )}
        <CustomText variant="h7" color="secondary" style={styles.dateText}>
          {item.date.toLocaleDateString()}
        </CustomText>
      </View>
      
      <CustomText variant="h6" fontFamily="Okra-Medium" style={styles.notificationTitle}>
        {item.title}
      </CustomText>
      <CustomText variant="h7" style={styles.notificationContent}>
        {item.content}
      </CustomText>
      
      {item.attachments && item.attachments.length > 0 && (
        <View style={styles.attachmentsContainer}>
          <CustomText variant="h7" fontFamily="Okra-Medium" style={styles.attachmentsTitle}>
            Attachments:
          </CustomText>
          {item.attachments.map((attachment, index) => (
            <TouchableOpacity key={index} style={styles.attachmentItem}>
              <Icon name="insert-drive-file" size={18} color={Colors.textSecondary} />
              <CustomText variant="h7" style={styles.attachmentText}>
                {attachment}
              </CustomText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderNotificationItem}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <CustomText variant="h7" style={styles.emptyText}>
          No notifications found
        </CustomText>
      }
    />
  );
};

export default PlacementCell;