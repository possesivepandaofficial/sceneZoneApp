import React, { useRef, useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');
const boxSize = width / 7;

const OtpResetPage = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [showSuccess, setShowSuccess] = useState(false);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    if (text.length > 1) {
      const chars = text.split('').slice(0, 4);
      chars.forEach((char, idx) => {
        newOtp[idx] = char;
        if (inputs.current[idx]) inputs.current[idx].setNativeProps({ text: char });
      });
      setOtp(newOtp);
      inputs.current[chars.length - 1]?.focus();
      return;
    }
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputs.current[index - 1].focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleVerify = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Navigate to the new password screen
      navigation.navigate('CreateNewPassword'); 
    }, 2000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#000' }]}>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Image
          source={require('../assets/Images/Verifyotp.png')}
          style={styles.iconImage}
        />
        <Text style={styles.title}>OTP for Password Reset</Text>
        <Text style={styles.subtitle}>
          Enter the 4 digit OTP code that we sent to your email to reset your password.
        </Text>

        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              textAlign="center"
              autoFocus={index === 0}
              selectionColor="#a95eff"
              returnKeyType="done"
              blurOnSubmit={false}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleVerify}>
          <Text style={styles.primaryButtonText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      </View>

      {/* ✅ Modal for Success Popup */}
      <Modal transparent visible={showSuccess} animationType="fade" statusBarTranslucent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require('../assets/Images/Success.png')}
              style={styles.successIcon}
            />
            <Text style={styles.successText}>Verification Success</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backIcon: { paddingHorizontal: 20, paddingTop: 10 },
  content: { padding: 24, alignItems: 'center' },
  iconImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    color: '#aaa',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  otpInput: {
    width: boxSize,
    height: boxSize,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#333',
    color: '#fff',
    backgroundColor: '#1a1a1a',
  },
  primaryButton: {
    backgroundColor: '#a95eff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendText: {
    color: '#a95eff',
    fontSize: 14,
    fontWeight: '500',
  },

  // ✅ Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '75%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  successIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default OtpResetPage; 