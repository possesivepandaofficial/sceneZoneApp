import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');
const boxSize = width / 7;

const CheckMailboxScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    if (text.length > 1) {
      const chars = text.split('').slice(0, 4);
      chars.forEach((char, i) => {
        newOtp[i] = char;
        if (inputs.current[i]) inputs.current[i].setNativeProps({ text: char });
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

  const handleConfirm = () => {
    navigation.navigate('CreateNewPassword'); // Adjust screen name if needed
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Image
          source={require('../assets/Images/CheckMail.png')}
          style={styles.mailIcon}
        />
        <Text style={styles.title}>Check Your Mailbox</Text>
        <Text style={styles.subtitle}>
          Please enter the 4 digit OTP code that we sent to your email (**********n@gmail.com)
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

        <TouchableOpacity onPress={() => navigation.navigate('CheckMailBox')} style={styles.resendButton}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handleConfirm}>
          <Text style={styles.primaryButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backIcon: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  content: {
    padding: 24,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  mailIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
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
  resendButton: {
    borderWidth: 1,
    borderColor: '#a95eff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  resendText: {
    color: '#a95eff',
    fontSize: 15,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#a95eff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CheckMailboxScreen;
