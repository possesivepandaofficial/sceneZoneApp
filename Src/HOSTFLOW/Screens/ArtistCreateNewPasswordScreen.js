import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Modal,
  Image,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const ArtistCreateNewPasswordScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleResetPassword = () => {
    // Show modal first
    setShowSuccessModal(true);

    // After delay, close modal and navigate
    setTimeout(() => {
      setShowSuccessModal(false);
      // Navigate to the artist sign-in screen after password reset
      navigation.navigate('ArtistSigninScreen');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 30 }]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Create New Artist Password</Text>
          <Text style={styles.subtitle}>
            Create a new strong password for your artist account.
          </Text>

          {/* New Password Field */}
          <View style={styles.inputWrapper}>
            <Icon name="lock" size={20} color="#aaa" />
            <TextInput
              style={styles.input}
              placeholder="New password"
              placeholderTextColor="#666"
              secureTextEntry={!showPass1}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPass1(!showPass1)}>
              <Icon name={showPass1 ? 'eye' : 'eye-off'} size={20} color="#aaa" />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Field */}
          <View style={styles.inputWrapper}>
            <Icon name="lock" size={20} color="#aaa" />
            <TextInput
              style={styles.input}
              placeholder="Confirm new password"
              placeholderTextColor="#666"
              secureTextEntry={!showPass2}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowPass2(!showPass2)}>
              <Icon name={showPass2 ? 'eye' : 'eye-off'} size={20} color="#aaa" />
            </TouchableOpacity>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity style={styles.fixedButton} onPress={handleResetPassword}>
            <LinearGradient colors={['#a95eff', '#b33bf6']} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Confirm Reset Password</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ✅ Success Modal */}
      <Modal transparent visible={showSuccessModal} animationType="fade" statusBarTranslucent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Image
              source={require('../assets/Images/Reset.png')} // ✅ your local success image
              style={styles.successImage}
            />
            <Text style={styles.successTitle}>Reset Password Success!</Text>
            <Text style={styles.successSubtitle}>Please login to your artist account again with your new password</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  backIcon: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 8,
    color: '#aaa',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#1a1a1a',
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 10,
    color: '#fff',
  },
  fixedButton: {
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },

  // ✅ Modal Styles
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000cc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
  },
  successImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  successSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#aaa',
  },
});

export default ArtistCreateNewPasswordScreen; 