import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/slices/authSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LinearGradient from 'react-native-linear-gradient';
import SignUpBackground from '../assets/Banners/SignUp';

const UserProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    // Dispatch logout action to clear auth state
    dispatch(logout());
    // Completely reset navigation stack - no previous login history
    navigation.reset({
      index: 0,
      routes: [{ name: 'Onboard1' }],
    });
    // Additional cleanup: ensure no cached navigation state
    // This prevents users from using back button to return to authenticated screens
  };

  return (
    <SafeAreaView style={[styles.container, {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }]}>
      {/* SVG Background */}
      <View style={styles.backgroundSvgContainer} pointerEvents="none">
        <SignUpBackground style={styles.backgroundSvg} width="100%" height="100%" />
      </View>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={require('../assets/Images/Profile1.png')} style={styles.profileBg} resizeMode="cover" />
          <View style={styles.profileContent}>
            <Image source={require('../assets/Images/frame1.png')} style={styles.avatar} />
            <View style={{ marginLeft: 16 }}>
              <Text style={styles.profileName}>Kevin Richards</Text>
              <Text style={styles.profileEmail}>contact@yourdomain.com</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('UserEditProfileScreen')}>
            <MaterialIcons name="person-outline" size={24} color="#a95eff" />
            <Text style={styles.menuItemText}>Edit Profile</Text>
            <MaterialIcons name="chevron-right" size={24} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('UserAccountSecurityScreen')}>
            <MaterialCommunityIcons name="shield-check-outline" size={24} color="#a95eff" />
            <Text style={styles.menuItemText}>Account Security</Text>
            <MaterialIcons name="chevron-right" size={24} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('UserPaymentSettingsScreen')}>
            <MaterialIcons name="payment" size={24} color="#a95eff" />
            <Text style={styles.menuItemText}>Payment Settings</Text>
            <MaterialIcons name="chevron-right" size={24} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('UserGeneralSettingsScreen')}>
            <Ionicons name="settings-outline" size={24} color="#a95eff" />
            <Text style={styles.menuItemText}>General Settings</Text>
            <MaterialIcons name="chevron-right" size={24} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('UserHelpCentreScreen')}>
            <MaterialIcons name="help-outline" size={24} color="#a95eff" />
            <Text style={styles.menuItemText}>Help Centre</Text>
            <MaterialIcons name="chevron-right" size={24} color="#555" />
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <Text style={styles.appVersionText}>App version 1.0.0.1</Text>

        {/* Log Out Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
           <Text style={styles.logoutButtonText}>Log Out</Text>
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
    paddingTop:40,
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
    flex: 1, // Allow title to take up space
    textAlign: 'center', // Center the text
  },
  profileCard: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 16,
    overflow: 'hidden',
    height: 100,
    justifyContent: 'flex-end',
  },
  profileBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileEmail: {
    fontSize: 14,
    color: '#ccc',
  },
  profileWaveIcon: {
    marginLeft: 'auto',
  },
  menuContainer: {
    marginHorizontal: 16,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuItemText: {
    flex: 1,
    overflow: 'hidden',
    color: '#C6C5ED',
    textOverflow: 'ellipsis',
    fontFamily: 'Nunito Sans',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21,
    marginLeft: 15,
  },
  appVersionText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    marginHorizontal: 16,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#a95eff',
  },
  logoutButtonText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: 'Nunito Sans',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21,
    color: '#B15CDE',
  },
  backgroundSvgContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  backgroundSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export default UserProfileScreen; 