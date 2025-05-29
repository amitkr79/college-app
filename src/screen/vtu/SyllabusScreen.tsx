import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderNav from '@components/global/HeaderNav';
import CustomText from '@components/global/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@unistyles/Constants';

const departments = [
  { id: '1', name: 'Artificial Intelligence and Machine Learning' },
  { id: '2', name: 'Chemistry' },
  { id: '3', name: 'Civil Engineering' },
  { id: '4', name: 'Computer Science & Engineering' },
  { id: '5', name: 'Electronics & Communication Engineering' },
  { id: '6', name: 'Electronics And Computer Engineering' },
  { id: '7', name: 'Information Science & Engineering' },
  { id: '8', name: 'MBA' },
  { id: '9', name: 'Mathematics' },
  { id: '10', name: 'Robotics and Artificial Intelligence' },
  { id: '11', name: 'Biotechnology' },
  { id: '12', name: 'Computer Science & Engineering (Data Science)' },
  { id: '13', name: 'CSE (IOT & Cybersecurity including Blockchain Technology)' },
  { id: '14', name: 'Electrical & Electronics Engineering' },
  { id: '15', name: 'Electronics & Telecommunication Engineering' },
  { id: '16', name: 'Department Of Humanities' },
  { id: '17', name: 'Mechanical Engineering' },
  { id: '18', name: 'MCA' },
  { id: '19', name: 'Physics' },
];

const SyllabusScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDepartmentPress = (department) => {
    navigation.navigate('DepartmentDocuments', { department });
  };

  const renderDepartmentItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.departmentCard}
      onPress={() => handleDepartmentPress(item)}
      activeOpacity={0.7}
    >
      <BlurView
        style={styles.glassCard}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      >
        <CustomText variant="h5" fontFamily='Okra-Regular' style={styles.departmentName}>
          {item.name}
        </CustomText>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="description" size={24} color={Colors.primary} />
            <CustomText variant="h7" style={styles.iconLabel}>Scheme</CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="menu-book" size={24} color={Colors.secondary} />
            <CustomText variant="h7" style={styles.iconLabel}>Syllabus</CustomText>
          </TouchableOpacity>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNav text="Scheme & Syllabus" showSearch onSearch={setSearchQuery} />
      
      <FlatList
        data={filteredDepartments}
        renderItem={renderDepartmentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  departmentCard: {
    width: '48%', // Slightly less than half to allow space between
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  glassCard: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  departmentName: {
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    alignItems: 'center',
  },
  iconLabel: {
    marginTop: 4,
    color: Colors.textSecondary,
  },
});

export default SyllabusScreen;