import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  // Force dark mode appearance
  const background = '#000';
  const cardBg = '#1a1a1a';
  const text = '#fff';
  const placeholder = '#aaa';
  const border = '#333';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color={text} />
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Top Icon */}
        <View style={styles.iconCircle}>
          <Icon name="lock-question" size={26} color="#fff" />
        </View>

        <Text style={[styles.title, { color: text }]}>Forgot Your Password?</Text>
        <Text style={[styles.subtitle, { color: placeholder }]}>
          Please enter your email address account to send the OTP verification to reset your password
        </Text>

        {/* Email Input */}
        <View style={[styles.inputContainer, { backgroundColor: cardBg, borderColor: border }]}>
          <Icon name="email-outline" size={20} color={placeholder} style={styles.inputIcon} />
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={placeholder}
            style={[styles.input, { color: text }]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Confirm Button */}
        <TouchableOpacity onPress={() => navigation.navigate('CheckMailBox')} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const boxWidth = width * 0.9;

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
  },
  iconCircle: {
    backgroundColor: '#a95eff',
    padding: 14,
    borderRadius: 50,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    height: 50,
    width: boxWidth,
    marginBottom: 24,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    fontSize: 16,
    flex: 1,
  },
  primaryButton: {
    width: boxWidth,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#a95eff',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
