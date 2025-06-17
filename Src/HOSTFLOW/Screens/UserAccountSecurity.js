import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const UserAccountSecurityScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [isFingerprintEnabled, setIsFingerprintEnabled] = useState(false);

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
        <Text style={styles.headerTitle}>Account Security</Text>
        <View style={{ width: 24 }} />{/* Spacer to center the title */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Update Password Item */}
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Update Password</Text>
          <MaterialIcons name="chevron-right" size={24} color="#555" />
        </TouchableOpacity>

        {/* Fingerprint Log In Section */}
        <View style={styles.fingerprintSection}>
          <View style={styles.fingerprintTextContainer}>
            <Text style={styles.fingerprintTitle}>Fingerprint Log In</Text>
            <Text style={styles.fingerprintDescription}>
              Activation will allow anyone with Fingerprint
              access to this device, to login to your account
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isFingerprintEnabled ? "#a95eff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsFingerprintEnabled}
            value={isFingerprintEnabled}
          />
        </View>
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
    justifyContent: 'space-between', // To push the arrow to the right
  },
  menuItemText: {
    fontSize: 16,
    color: '#fff',
  },
  fingerprintSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a', // Dark background
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between', // To push the switch to the right
  },
  fingerprintTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  fingerprintTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  fingerprintDescription: {
    fontSize: 12,
    color: '#888',
  },
});

export default UserAccountSecurityScreen; 