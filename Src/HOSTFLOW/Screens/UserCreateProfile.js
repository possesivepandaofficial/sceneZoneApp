import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Redux/slices/authSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SignUpBackground from '../assets/Banners/SignUp';

const { width, height } = Dimensions.get('window');

const UserCreateProfileScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const handleContinue = () => {
    // Dispatch login action for user
    dispatch(loginUser({
      id: 'user123',
      name: fullName || 'Kevin Richards',
      email: email || 'user@example.com',
      phone: phoneNumber || '+91 412-123-4215'
    }));
    
    // Navigate to UserHome
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'UserHome',
          params: { isLoggedIn: true }
        }
      ]
    });
  };

  return (
    <View style={styles.container}>
      <SignUpBackground 
        style={styles.backgroundSvg}
        width={width}
        height={height}
      />
      <View style={[styles.overlay, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Profile</Text>
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Profile Image and Camera Icon */}
            <View style={styles.profileImageContainer}>
              <Image
                source={require('../assets/Images/frame1.png')}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.cameraIconContainer}>
                <Ionicons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Input Fields */}
            <Text style={styles.label}>Full name</Text>
            <TextInput
              style={styles.input}
              placeholder="Franklin Clinton"
              placeholderTextColor="#aaa"
              value={fullName}
              onChangeText={setFullName}
            />

            <Text style={styles.label}>Date of Birth</Text>
            <View style={styles.input}>
              <View style={styles.iconWrapper}>
                <Ionicons name="calendar-outline" size={20} color="#aaa" />
              </View>
              <TextInput
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#aaa"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                keyboardType="numeric"
                style={{ flex: 1, color: '#fff', fontSize: 16 }}
              />
            </View>

            <Text style={styles.label}>Phone number</Text>
            <View style={styles.input}>
              <View style={styles.iconWrapper}>
                <Ionicons name="call-outline" size={20} color="#aaa" />
              </View>
              <TextInput
                placeholder="412-123-4215"
                placeholderTextColor="#aaa"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                style={{ flex: 1, color: '#fff', fontSize: 16 }}
              />
            </View>

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="scenezone@gmail.com"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Address</Text>
            <View style={styles.input}>
              <View style={styles.iconWrapper}>
                <Ionicons name="location-outline" size={20} color="#aaa" />
              </View>
              <TextInput
                placeholder="Location"
                placeholderTextColor="#aaa"
                value={address}
                onChangeText={setAddress}
                style={{ flex: 1, color: '#fff', fontSize: 16 }}
              />
            </View>
          </ScrollView>
          <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + 16 }]}>
            <TouchableOpacity onPress={handleContinue}>
              <LinearGradient
                colors={['#B15CDE', '#7952FC']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={styles.continueButton}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  backgroundSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 100, // Space for fixed button
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333', // Placeholder background
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#a95eff',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
  label: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 16,
    paddingVertical: 0,
    color: '#fff',
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#24242D',
    backgroundColor: '#121212',
    alignSelf: 'stretch',
  },
  iconWrapper: {
    marginRight: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagIcon: {
    width: 24,
    height: 16,
    marginRight: 5,
  },
  continueButton: {
    display: 'flex',
    width: 361,
    height: 52,
    padding: 0,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexShrink: 0,
    borderRadius: 14,
  },
  continueButtonText: {
    color: '#FFF',
    fontFamily: 'Nunito Sans',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 21,
    textAlign: 'center',
  },
});

export default UserCreateProfileScreen; 