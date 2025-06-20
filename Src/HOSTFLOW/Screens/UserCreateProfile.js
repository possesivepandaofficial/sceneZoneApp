
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  selectToken,
  selectFullName,
  selectMobileNumber,
  selectUserEmail,
  selectUserData,
} from '../Redux/slices/authSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SignUpBackground from '../assets/Banners/SignUp';
import api from '../Config/api';
import * as ImagePicker from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

const UserCreateProfileScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const token = useSelector(selectToken);
  const userData = useSelector(selectUserData);
  const initialFullName = useSelector(selectFullName) || '';
  const initialPhoneNumber = useSelector(selectMobileNumber) || '';
  const initialEmail = useSelector(selectUserEmail) || '';
  const { userType = 'user' } = route.params || {};

  const [fullName, setFullName] = useState(initialFullName);
  const [dateOfBirth, setDateOfBirth] = useState(userData?.dateOfBirth || '');
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [email, setEmail] = useState(initialEmail);
  const [address, setAddress] = useState(userData?.address || '');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Initialize state with Redux data
  useEffect(() => {
    // Check if profile exists to determine if we're editing
    if (userData?.fullName && userData?.email) {
      setIsEditing(true); // Assume editing if key profile fields exist
    }
    setFullName(initialFullName);
    setPhoneNumber(initialPhoneNumber);
    setEmail(initialEmail);
    setDateOfBirth(userData?.dateOfBirth || '');
    setAddress(userData?.address || '');
    // If profileImageUrl exists in Redux or API, set it
    if (userData?.profileImageUrl) {
      setProfileImage({ uri: userData.profileImageUrl });
    }
  }, [initialFullName, initialPhoneNumber, initialEmail, userData]);

const handleImagePicker = () => {
  const options = {
    mediaType: 'photo',
    quality: 0.8,
    includeBase64: false,
  };

  ImagePicker.launchImageLibrary(options, (response) => {
    if (response.didCancel) return;
    if (response.errorCode) {
      Alert.alert('Error', response.errorMessage);
      return;
    }

    const selectedImage = response.assets && response.assets[0];
    if (selectedImage) {
      setProfileImage(selectedImage);
    }
  });
};




  // const handleImagePicker = () => {
  //   Alert.alert('Choose Image Source', 'Select image from', [
  //     { text: 'Camera', onPress: launchCamera },
  //     { text: 'Gallery', onPress: launchGallery },
  //     { text: 'Cancel', style: 'cancel' },
  //   ]);
  // };

  const launchCamera = () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: true,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
          return;
        }
        setProfileImage(response.assets[0]);
      }
    );
  };

  const launchGallery = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: true,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
          return;
        }
        setProfileImage(response.assets[0]);
      }
    );
  };

  const handleContinue = async () => {
    if (!fullName || !dateOfBirth || !phoneNumber || !email || !address) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!token) {
      Alert.alert('Error', 'Authentication token is missing. Please log in again.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('dateOfBirth', dateOfBirth);
      formData.append('phoneNumber', phoneNumber);
      formData.append('email', email);
      formData.append('address', address);
      
if (profileImage && profileImage.uri) {
  formData.append('profileImage', {
    uri: profileImage.uri,
    type: profileImage.type || 'image/jpeg',
    name: profileImage.fileName || 'profile.jpg',
  });
}



      // if (profileImage && profileImage.uri && !profileImage.uri.startsWith('http')) {
      //   formData.append('profileImage', {
      //     uri: profileImage.uri,
      //     type: profileImage.type || 'image/jpeg',
      //     name: profileImage.fileName || 'profile.jpg',
      //   });
      // }

      // Determine API endpoint based on whether we're editing or creating
      const endpoint = isEditing ? '/user/update-profile' : '/user/create-profile';
      const response = await api.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        // Update Redux state with new profile data
        dispatch(
          loginUser({
            id: response.data.data.user._id || userData?.id || 'user123',
            name: fullName,
            fullName: fullName,
            email: email,
            phone: phoneNumber,
            mobileNumber: phoneNumber,
            role: response.data.data.user.role || userType,
            token: response.data.data.token || token,
            dateOfBirth: dateOfBirth,
            address: address,
            profileImageUrl: response.data.data.user.profileImageUrl || userData?.profileImageUrl,
          })
        );

        Alert.alert('Success', response.data.message || `Profile ${isEditing ? 'updated' : 'created'} successfully!`);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'UserHome',
              params: { isLoggedIn: true },
            },
          ],
        });
      } else {
        Alert.alert('Error', response.data.message || `Failed to ${isEditing ? 'update' : 'create'} profile`);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} profile:`, error);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SignUpBackground style={styles.backgroundSvg} width={width} height={height} />
      <View style={[styles.overlay, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{isEditing ? 'Edit Profile' : 'Create Profile'}</Text>
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
            {/* <View style={styles.profileImageContainer}>
              <Image
                source={profileImage ? { uri: profileImage.uri } : require('../assets/Images/frame1.png')}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.cameraIconContainer} onPress={handleImagePicker}>
                <Ionicons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View> */}

            <View style={styles.profileImageContainer}>
  <Image
    source={profileImage ? { uri: profileImage.uri } : require('../assets/Images/frame1.png')}
    style={styles.profileImage}
  />
  <TouchableOpacity style={styles.cameraIconContainer} onPress={handleImagePicker}>
    <Ionicons name="camera" size={20} color="#fff" />
  </TouchableOpacity>
</View>


            {/* Input Fields */}
            <Text style={styles.label}>Full name</Text>
            <View style={styles.fullNameInputContainer}>
              <TextInput
                style={styles.fullNameInput}
                placeholder="Franklin Clinton"
                placeholderTextColor="#aaa"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

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
                keyboardType="default"
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
            <View style={styles.input}>
              <View style={styles.iconWrapper}>
                <Ionicons name="mail-outline" size={20} color="#aaa" />
              </View>
              <TextInput
                placeholder="scenezone@gmail.com"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{ flex: 1, color: '#fff', fontSize: 16 }}
              />
            </View>

            <Text style={styles.label}>Address</Text>
            <View style={styles.input}>
              <View style={styles.iconWrapper}>
                <Ionicons name="location-outline" size={20} color="#aaa" />
              </View>
              <TextInput
                placeholder="Address"
                placeholderTextColor="#aaa"
                value={address}
                onChangeText={setAddress}
                style={{ flex: 1, color: '#fff', fontSize: 16 }}
              />
            </View>
          </ScrollView>
          <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + 16 }]}>
            <TouchableOpacity onPress={handleContinue} disabled={loading}>
              <LinearGradient
                colors={['#B15CDE', '#7952FC']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={styles.continueButton}
              >
                <Text style={styles.continueButtonText}>
                  {loading ? 'Processing...' : isEditing ? 'Update' : 'Continue'}
                </Text>
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
    backgroundColor: '#333',
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
    marginRight: 120,
  },
  label: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 16,
    color: '#fff',
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#24242D',
    backgroundColor: '#121212',
  },
  iconWrapper: {
    marginRight: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    width: 361,
    height: 52,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  continueButtonText: {
    color: '#FFF',
    fontFamily: 'Nunito Sans',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    textAlign: 'center',
  },
  fullNameInputContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#8D6BFC',
    backgroundColor: '#121212',
    marginBottom: 20,
    paddingHorizontal: 16,
    height: 48,
    justifyContent: 'center',
  },
  fullNameInput: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
});

export default UserCreateProfileScreen;