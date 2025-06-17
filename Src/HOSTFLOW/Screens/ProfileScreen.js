import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/slices/authSlice';
import HostEditProfileScreen from './HostEditProfile';

const settings = [
  { icon: 'user', label: 'Edit Profile', nav: 'HostEditProfile' },
  { icon: 'star', label: 'Ticket Settings', nav: 'HostTicketSetting' },
  { icon: 'shield', label: 'Account Security', nav: 'HostAccountSecurity' },
  { icon: 'credit-card', label: 'Payment Settings', nav: 'hostPaymentSetting' },
  { icon: 'settings', label: 'General Settings', nav: 'HostGeneralSetting' },
  { icon: 'message-square', label: 'Help Centre', nav: 'HostHelpCentre' },
];

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.container, { flexGrow: 1, paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.headerTitle}>Profile</Text>
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
        {/* Settings List */}
        <View style={styles.settingsList}>
          {settings.map((item, idx) => (
            <TouchableOpacity
              key={item.label}
              style={styles.settingsRow}
              activeOpacity={0.7}
              onPress={() => {
                if (item.nav) navigation.navigate(item.nav);
              }}
            >
              <View style={styles.settingsIconCircle}>
                <Feather name={item.icon} size={22} color="#a95eff" />
              </View>
              <Text style={styles.settingsLabel}>{item.label}</Text>
              <Feather name="chevron-right" size={22} color="#b3b3cc" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
          ))}
        </View>
        {/* Version */}
        <Text style={styles.versionText}>App version 1.0.0.1</Text>
        {/* Log Out Button - scrolls with content */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111018',
  },
  container: {
    backgroundColor: '#111018',
  },
  headerTitle: {
    paddingTop: 30,
    color: '#d1cfff',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 12,
    marginLeft: 18,
    marginBottom: 10,
  },
  profileCard: {
    marginHorizontal: 18,
    marginBottom: 18,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    height: 110,
    marginTop: 6,
  },
  profileBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 110,
    paddingHorizontal: 18,
    zIndex: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  profileName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  profileEmail: {
    color: '#e0dfff',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 2,
  },
  profileWaveIcon: {
    marginLeft: 'auto',
    opacity: 0.7,
  },
  settingsList: {
    marginHorizontal: 10,
    marginTop: 8,
    marginBottom: 18,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1F',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#34344A',
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(169,94,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingsLabel: {
    color: '#C6C5ED',
    fontFamily: 'Nunito Sans',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  versionText: {
    color: '#44435a',
    fontSize: 13,
    alignSelf: 'center',
    marginVertical: 10,
    fontWeight: '400',
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#B15CDE',
    borderRadius: 16,
    backgroundColor: '#1A1A1F',
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#C6C5ED',
    fontFamily: 'Nunito Sans',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export default ProfileScreen;