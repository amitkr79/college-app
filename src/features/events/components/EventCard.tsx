import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import {Event} from '../../../types/eventTypes'; // Create a types.ts file for shared types

type EventCardProps = {
  event: Event;
  onRegister: () => void;
  onInfo: () => void;
};

const EventCard = ({event, onRegister, onInfo}: EventCardProps) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.eventCard}>
      <Image source={{uri: event.imageUrl}} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <CustomText
            variant="h5"
            fontFamily="Okra-Bold"
            style={styles.eventTitle}>
            {event.title}
          </CustomText>
          <View
            style={[
              styles.statusBadge,
              event.status === 'upcoming' && styles.upcomingBadge,
              event.status === 'ongoing' && styles.ongoingBadge,
            ]}>
            <CustomText
              variant="h7"
              fontFamily="Okra-Bold"
              style={styles.badgeText}>
              {event.status.toUpperCase()}
            </CustomText>
          </View>
        </View>

        <View style={styles.eventMeta}>
          <View style={styles.metaItem}>
            <Icon name="calendar-today" size={16} color={Colors.textSecondary} />
            <CustomText
              variant="h7"
              fontFamily="Okra-Regular"
              style={styles.metaText}>
              {formatDate(event.date)}
            </CustomText>
          </View>

          <View style={styles.metaItem}>
            <Icon name="location-on" size={16} color={Colors.textSecondary} />
            <CustomText
              variant="h7"
              fontFamily="Okra-Regular"
              style={styles.metaText}>
              {event.location}
            </CustomText>
          </View>

          <View style={styles.metaItem}>
            <Icon name="groups" size={16} color={Colors.textSecondary} />
            <CustomText
              variant="h7"
              fontFamily="Okra-Regular"
              style={styles.metaText}>
              {event.organizer}
            </CustomText>
          </View>
        </View>

        <CustomText
          variant="h6"
          fontFamily="Okra-Regular"
          style={styles.eventDescription}>
          {event.description}
        </CustomText>

        <View style={styles.tagsContainer}>
          {event.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <CustomText
                variant="h7"
                fontFamily="Okra-Medium"
                style={styles.tagText}>
                {tag}
              </CustomText>
            </View>
          ))}
        </View>

        <View style={styles.eventFooter}>
          <View style={styles.attendingContainer}>
            <Icon name="people" size={20} color={Colors.primary} />
            <CustomText
              variant="h7"
              fontFamily="Okra-Bold"
              style={styles.attendingText}>
              {event.attendingCount} attending
            </CustomText>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={styles.registerButton} 
              onPress={onRegister}>
              <CustomText
                variant="h7"
                fontFamily="Okra-Bold"
                fontSize={10}
                style={styles.registerText}>
                REGISTER
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.infoButton} 
              onPress={onInfo}>
              <CustomText
                variant="h7"
                fontFamily="Okra-Bold"
                fontSize={10}
                style={styles.infoText}>
                MORE INFO
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: Colors.darkCard,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  eventImage: {
    width: '100%',
    height: 180,
  },
  eventContent: {
    padding: 20,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventTitle: {
    flex: 1,
    color: Colors.textPrimary,
    marginRight: 12,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  upcomingBadge: {
    backgroundColor: Colors.primaryGloss,
  },
  ongoingBadge: {
    backgroundColor: Colors.primaryGloss,
  },
  badgeText: {
    fontSize: 12,
    color: Colors.primary,
  },
  eventMeta: {
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  metaText: {
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  eventDescription: {
    color: Colors.textSecondary,
    marginBottom: 16,
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  tag: {
    backgroundColor: Colors.background,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  tagText: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 16,
  },
  attendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendingText: {
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  registerButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    width: 100,
    height: 40,
    justifyContent: 'center',
  },
  infoButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    width: 100,
    height: 40,
    justifyContent: 'center',
  },
  registerText: {
    color: Colors.white,
    textAlign: 'center',
  },
  infoText: {
    color: Colors.primary,
    textAlign: 'center',
  },
});

export default EventCard;