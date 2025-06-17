import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const UserEditProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  const [fullName, setFullName] = useState('Franklin Clinton');
  const [email, setEmail] = useState('franklinclinton@gmail.com');
  const [location, setLocation] = useState('Noida');
  const [phoneNumber, setPhoneNumber] = useState('123456789');

  return (
    <SafeAreaView style={[
      styles.container,
      {
        paddingBottom: Math.max(insets.bottom, 20),
      }
    ]}>
      {/* Header */}
      <View style={[
        styles.header,
        {
          paddingTop: Math.max(insets.top, Platform.OS === 'ios' ? 10 : 20),
        }
      ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>
        <Text style={styles.headerSpacer}> </Text>
      </View>

      <ScrollView contentContainerStyle={[
        styles.scrollViewContent,
        {
          paddingTop: Platform.OS === 'ios' ? 10 : 20,
        }
      ]}>
        {/* Profile Image Section */}
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../assets/Images/frame1.png')} // User Avatar
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraIconContainer}>
            <MaterialIcons name="camera-alt" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Full name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Location</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
            placeholderTextColor="#888"
          />
        </View>

        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone number</Text>
          <View style={styles.phoneInputContainer}>
            {/* Country Code Picker Placeholder */}
            <View style={styles.countryCodePicker}>
              <Text style={styles.countryCodeText}>📞</Text>
              <MaterialIcons name="keyboard-arrow-down" size={20} color="#fff" />
            </View>
            <TextInput
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Phone Number"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </ScrollView>

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
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
  headerSpacer: {
    width: 24,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Add padding at the bottom for the button
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd', // Placeholder background
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#a95eff', // Purple background
    borderRadius: 15,
    padding: 6,
    borderWidth: 2,
    borderColor: '#000', // Border to match the image
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1a1a1a', // Dark input background
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a', // Dark input background
    borderRadius: 10,
    alignItems: 'center',
  },
  countryCodePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRightWidth: 1,
    borderColor: '#333',
    paddingVertical: 12,
  },
  phoneInput: {
    flex: 1,
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  countryCodeText: {
    color: '#fff',
    marginRight: 5,
  },
  saveButton: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#B15CDE',
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default UserEditProfileScreen; 