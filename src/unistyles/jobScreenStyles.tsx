import { StyleSheet } from 'react-native';
import { Colors } from '@unistyles/Constants';

export default StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  searchInput: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 50,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Okra-Regular',
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    top: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
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
  listContent: {
    paddingBottom: 30,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: Colors.textSecondary,
  },
  notificationCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 10,
  },
  driveBadge: {
    backgroundColor: Colors.primaryGloss,
  },
  announcementBadge: {
    backgroundColor: Colors.activeLight,
  },
  trainingBadge: {
    backgroundColor: Colors.warning,
  },
  resultBadge: {
    backgroundColor: Colors.success,
  },
  categoryText: {
    color: Colors.textPrimary,
  },
  importantIcon: {
    marginRight: 'auto',
    marginLeft: 10,
  },
  dateText: {
    marginLeft: 'auto',
  },
  notificationTitle: {
    marginBottom: 8,
  },
  notificationContent: {
    lineHeight: 22,
    marginBottom: 15,
  },
  attachmentsContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 15,
  },
  attachmentsTitle: {
    marginBottom: 8,
    color: Colors.textSecondary,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  attachmentText: {
    marginLeft: 8,
    color: Colors.primary,
  },
  jobCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featuredJob: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
  featuredBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  featuredText: {
    color: Colors.white,
    marginLeft: 4,
  },
  jobHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 15,
    backgroundColor: Colors.backgroundLight,
  },
  jobInfo: {
    flex: 1,
  },
  jobMeta: {
    flexDirection: 'row',
    marginTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tag: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  applyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  applyText: {
    color: Colors.white,
  },
  // ... (all other styles from original file)
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: Colors.textSecondary,
  },
});