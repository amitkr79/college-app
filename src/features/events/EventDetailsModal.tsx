import React from 'react';
import {
  Modal,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import {Event} from '../../types/eventTypes';


type UserType = 'student' | 'faculty' | 'admin';
type EventDetailsModalProps = {
  visible: boolean;
  event: Event | null;
  onClose: () => void;
  onRegister: () => void;
  userType: UserType; // Add this prop
};

const EventDetailsModal = ({
  visible,
  event,
  onClose,
  onRegister,
  userType,
}: EventDetailsModalProps) => {
  if (!event) return null;

  const isAdmin = userType === 'admin';

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  //logic for edit the events
  const editEvents = ()=>{
    
  }
  // todo:delete the events logic 
  const deleteEvents = ()=>{

  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      hardwareAccelerated={true}
      statusBarTranslucent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color={Colors.white} />
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Image source={{uri: event.imageUrl}} style={styles.modalImage} />

            <View style={styles.modalHeader}>
              <CustomText
                variant="h3"
                fontSize={17}
                fontFamily="Okra-Bold"
                style={styles.modalTitle}>
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

            <View style={styles.detailSection}>
              <CustomText
                variant="h5"
                fontSize={15}
                fontFamily="Okra-Bold"
                style={styles.sectionTitle}>
                Event Details
              </CustomText>

              <View style={styles.detailItem}>
                <Icon name="calendar-today" size={20} color={Colors.primary} />
                <CustomText
                  variant="h6"
                  fontSize={13}
                  fontFamily="Okra-Medium"
                  style={styles.detailText}>
                  {formatDate(event.date)}
                </CustomText>
              </View>

              <View style={styles.detailItem}>
                <Icon name="location-on" size={20} color={Colors.primary} />
                <CustomText
                  variant="h6"
                  fontSize={13}
                  fontFamily="Okra-Medium"
                  style={styles.detailText}>
                  {event.location}
                </CustomText>
              </View>

              <View style={styles.detailItem}>
                <Icon name="groups" size={20} color={Colors.primary} />
                <CustomText
                  variant="h6"
                  fontSize={13}
                  fontFamily="Okra-Medium"
                  style={styles.detailText}>
                  Organized by {event.organizer}
                </CustomText>
              </View>

              <View style={styles.detailItem}>
                <Icon name="local-offer" size={20} color={Colors.primary} />
                <CustomText
                  variant="h6"
                  fontSize={13}
                  fontFamily="Okra-Medium"
                  style={styles.detailText}>
                  Price: {event.price === '0' ? 'Free' : `$${event.price}`}
                </CustomText>
              </View>
            </View>

            <View style={styles.detailSection}>
              <CustomText
                variant="h5"
                fontSize={15}
                fontFamily="Okra-Bold"
                style={styles.sectionTitle}>
                Description
              </CustomText>
              <CustomText
                variant="h6"
                fontSize={13}
                fontFamily="Okra-Regular"
                style={styles.description}>
                {event.description}
              </CustomText>
            </View>

            <View style={styles.detailSection}>
              <CustomText
                variant="h5"
                fontSize={15}
                fontFamily="Okra-Bold"
                style={styles.sectionTitle}>
                Tags
              </CustomText>
              <View style={styles.tagsContainer}>
                {event.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <CustomText
                      variant="h7"
                      fontSize={11}
                      fontFamily="Okra-Medium"
                      style={styles.tagText}>
                      {tag}
                    </CustomText>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.footer}>
              <View style={styles.attendingContainer}>
                <Icon name="people" size={20} color={Colors.primary} />
                <CustomText
                  variant="h5"
                  fontSize={12}
                  fontFamily="Okra-Bold"
                  style={styles.attendingText}>
                  {event.attendingCount} attending
                </CustomText>
              </View>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={onRegister}>
                <CustomText
                  variant="h5"
                  fontSize={10}
                  fontFamily="Okra-Bold"
                  style={styles.registerText}>
                  REGISTER NOW
                </CustomText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>

      {!isAdmin && (
        <View style={styles.adminActions}>

          <TouchableOpacity style={styles.editButton} onPress={() => editEvents()}>
            <Icon name="edit" size={20} color={Colors.white} />
            <CustomText style={styles.editButtonText}>Edit Event</CustomText>
          </TouchableOpacity>
          {/* todo: delete the event card  */}
          <TouchableOpacity style={styles.deleteButton} onPress={() => deleteEvents()}>
            <Icon name="delete" size={20} color={Colors.white} />
            <CustomText style={styles.deleteButtonText}>Delete</CustomText>
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 10,
    zIndex: 10,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 8,
    elevation: 3,
  },
  modalImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 16,
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
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
  detailSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    color: Colors.textSecondary,
    marginLeft: 12,
    flex: 1,
  },
  description: {
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    backgroundColor: Colors.background,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  tagText: {
    color: Colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 16,
    marginTop: 8,
  },
  attendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendingText: {
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  registerButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  registerText: {
    color: Colors.white,
  },

    adminActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 16,
    backgroundColor:Colors.background,
    marginBottom:13,
    paddingHorizontal:15

  },
  editButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: Colors.error,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  editButtonText: {
    color: Colors.white,
    marginLeft: 8,
  },
  deleteButtonText: {
    color: Colors.white,
    marginLeft: 8,
  },
});

export default EventDetailsModal;
