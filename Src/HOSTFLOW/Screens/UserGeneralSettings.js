import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const UserGeneralSettingsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[
        styles.header,
        {
          paddingTop: Math.max(insets.top, 20),
        }
      ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>General Settings</Text>
        <View style={{ width: 24 }} />{/* Spacer to center the title */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Language Setting */}
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Language Setting</Text>
          <Text style={styles.menuItemValue}>English</Text>
          <MaterialIcons name="chevron-right" size={24} color="#555" />
        </TouchableOpacity>

        {/* Notification Setting */}
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Notification Setting</Text>
          <MaterialIcons name="chevron-right" size={24} color="#555" />
        </TouchableOpacity>

        {/* About EVNC */}
         <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>About EVNC</Text>
          <Text style={styles.menuItemValue}>Version 1.0.0.1</Text>
          <MaterialIcons name="chevron-right" size={24} color="#555" />
        </TouchableOpacity>

        {/* Term of Use */}
         <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Term of Use</Text>
          <MaterialIcons name="chevron-right" size={24} color="#555" />
        </TouchableOpacity>

         {/* Privacy Policy */}
         <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Privacy Policy</Text>
          <MaterialIcons name="chevron-right" size={24} color="#555" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
   scrollViewContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a', // Dark background
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuItemText: {
    flex: 1, // Take up available space
    fontSize: 16,
    color: '#fff',
  },
  menuItemValue: {
      fontSize: 16,
      color: '#a95eff', // Purple color for values
      marginRight: 10,
  },
});

export default UserGeneralSettingsScreen; 