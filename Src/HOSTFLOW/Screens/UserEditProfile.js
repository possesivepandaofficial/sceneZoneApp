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
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Enhanced responsive dimensions system for all Android devices
const dimensions = {
  spacing: {
    xs: Math.max(width * 0.01, 4),
    sm: Math.max(width * 0.02, 8),
    md: Math.max(width * 0.03, 12),
    lg: Math.max(width * 0.04, 16),
    xl: Math.max(width * 0.05, 20),
    xxl: Math.max(width * 0.06, 24),
  },
  fontSize: {
    small: Math.max(width * 0.03, 12),
    body: Math.max(width * 0.035, 14),
    title: Math.max(width * 0.04, 16),
    header: Math.max(width * 0.045, 18),
  },
  borderRadius: {
    sm: Math.max(width * 0.015, 6),
    md: Math.max(width * 0.025, 10),
    lg: Math.max(width * 0.04, 15),
    xl: Math.max(width * 0.06, 20),
  },
  buttonHeight: Math.max(height * 0.06, 44),
  inputHeight: Math.max(height * 0.055, 40),
  iconSize: Math.max(width * 0.06, 20),
  profileImageSize: Math.max(width * 0.25, 100),
};

const UserEditProfileScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('Franklin Clinton');
  const [email, setEmail] = useState('franklinclinton@gmail.com');
  const [location, setLocation] = useState('Noida');
  const [phoneNumber, setPhoneNumber] = useState('123456789');
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[
        styles.header,
        {
          paddingTop: Math.max(insets.top + 10, 20),
        }
      ]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={dimensions.iconSize} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: dimensions.iconSize }} />
      </View>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollViewContent,
          {
            paddingBottom: Math.max(insets.bottom + 120, 140),
          }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Image Section */}
        <View style={[
          styles.profileImageContainer,
          {
            marginTop: Math.max(dimensions.spacing.xl, 15),
          }
        ]}>
          <Image
            source={require('../assets/Images/frame1.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.cameraIconContainer}
            onPress={() => {
              console.log('Camera button pressed');
            }}>
            <MaterialIcons name="camera-alt" size={28} color="#fff" />
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
            style={[styles.input, { borderColor: '#24242D' }]}
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
            style={[styles.input, { borderColor: '#24242D' }]}
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
              <Text style={styles.countryCodeText}>+91</Text>
              <MaterialIcons name="keyboard-arrow-down" size={dimensions.iconSize} color="#fff" />
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
      <TouchableOpacity 
        style={[
          styles.saveButton,
          {
            marginBottom: Math.max(insets.bottom + 20, 30),
          }
        ]}
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={['#B15CDE', '#7952FC']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 14,
            flexDirection: 'row',
            gap: 10,
          }}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 393,
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#121212',
    borderBottomWidth: 1,
    borderBottomColor: '#C6C5ED',
    // Box shadow for iOS
    shadowColor: 'rgba(104, 59, 252, 0.05)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 12,
    // Box shadow for Android
    elevation: 4,
    minHeight: undefined, // Remove minHeight to allow padding to control height
  },
  backButton: {
    padding: dimensions.spacing.sm,
    borderRadius: dimensions.borderRadius.md,
    minWidth: dimensions.iconSize + 8,
    minHeight: dimensions.iconSize + 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: dimensions.fontSize.header,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16, // gap between back button and title
    flex: 1,
    textAlign: 'center',
    marginRight:170,
  },
  scrollViewContent: {
    paddingHorizontal: dimensions.spacing.lg,
    paddingTop: dimensions.spacing.xl,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: dimensions.spacing.xxl,
    justifyContent: 'center',
    position: 'relative',
  },
  profileImage: {
    width: dimensions.profileImageSize,
    height: dimensions.profileImageSize,
    borderRadius: dimensions.profileImageSize / 2,
    backgroundColor: '#ddd',
  },
  cameraIconContainer: {
    marginRight:110,
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#B15CDE',
    borderRadius: 32,
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 4,
  },
  inputContainer: {
    marginBottom: dimensions.spacing.xl,
  },
  inputLabel: {
    color: '#7A7A90',
    fontFamily: 'Nunito Sans',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    marginBottom: dimensions.spacing.sm,
  },
  input: {
    display: 'flex',
    height: 48,
    paddingVertical: 0,
    paddingHorizontal: 16,
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#8D6BFC',
    backgroundColor: '#121212',
    color: '#fff',
    fontSize: dimensions.fontSize.title,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: dimensions.borderRadius.md,
    alignItems: 'center',
    minHeight: dimensions.inputHeight,
  },
  countryCodePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: dimensions.spacing.lg,
    borderRightWidth: 1,
    borderColor: '#333',
    paddingVertical: Math.max(dimensions.spacing.md, 12),
    minHeight: dimensions.inputHeight,
    justifyContent: 'center',
  },
  countryCodeText: {
    color: '#fff',
    marginRight: dimensions.spacing.xs,
    fontSize: dimensions.fontSize.title,
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    color: '#fff',
    paddingVertical: Math.max(dimensions.spacing.md, 12),
    paddingHorizontal: dimensions.spacing.lg,
    fontSize: dimensions.fontSize.title,
    minHeight: dimensions.inputHeight,
  },
  saveButton: {
    display: 'flex',
    width: '90%',
    maxWidth: 361,
    height: 52,
    paddingVertical: 0,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    flexShrink: 0,
    borderRadius: 14,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: dimensions.spacing.xl,
  },
  saveButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Nunito Sans',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 21,
  },
});

export default UserEditProfileScreen; 