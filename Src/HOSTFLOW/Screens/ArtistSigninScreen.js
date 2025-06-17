import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { loginArtist } from '../Redux/slices/authSlice';
import LinearGradient from 'react-native-linear-gradient';
import GoogleIcon from '../assets/icons/Google';
import AppleIcon from '../assets/icons/Apple';
import SignUpBackground from '../assets/Banners/SignUp';

const { width, height } = Dimensions.get('window');

// Enhanced responsive dimensions system for all Android devices
const isTablet = width >= 768;
const isSmallPhone = width < 350;

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
    large: Math.max(width * 0.065, 28),
  },
  borderRadius: {
    sm: Math.max(width * 0.015, 6),
    md: Math.max(width * 0.025, 10),
    lg: Math.max(width * 0.04, 15),
  },
  buttonHeight: Math.max(height * 0.06, 50),
  inputHeight: Math.max(height * 0.06, 50),
  iconSize: Math.max(width * 0.05, 20),
  socialIconSize: Math.max(width * 0.05, 20),
  marginHorizontal: Math.max(width * 0.04, 14),
};

const ArtistSigninScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const scheme = useColorScheme();
  const isDark = true; // force dark mode
  const dispatch = useDispatch();

  const background = '#000';
  const cardBg = '#1a1a1a';
  const text = '#fff';
  const border = '#333';
  const placeholder = '#aaa';

  const handleSignIn = () => {
    navigation.navigate('ArtistOtpVerificationScreen');
  };

  return (
    <View style={styles.container}>
      <SignUpBackground 
        style={styles.backgroundSvg}
        width={width}
        height={height}
      />
      <SafeAreaView style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.inner}>
          <Text style={[styles.title, { color: text }]}>Sign in to{'\n'}your account</Text>

          <Text style={[styles.subtitle, { color: placeholder }]}>Don't have an account?{' '}
            <Text style={styles.signup} onPress={() => navigation.navigate('ArtistSignupScreen')}>
              Sign Up
            </Text>
          </Text>

          {/* Phone Input */}
          <View style={[styles.inputContainer, { backgroundColor: cardBg, borderColor: border }]}>
            <Icon name="mobile" size={20} color={placeholder} style={styles.inputIcon} />
            <TextInput
              placeholder="+91 412-123-4215"
              placeholderTextColor={placeholder}
              style={[styles.input, { color: text }]}
              keyboardType="phone-pad"
            />
          </View>

          {/* Password Input */}
          <View style={[styles.inputContainer, styles.passwordContainer, { backgroundColor: cardBg }]}>
            <Feather name="lock" size={20} color={placeholder} style={styles.inputIcon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor={placeholder}
              secureTextEntry={!passwordVisible}
              style={[styles.input, { color: text, flex: 1 }]}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Feather name={passwordVisible ? 'eye' : 'eye-off'} size={20} color={placeholder} />
            </TouchableOpacity>
          </View>

          {/* Remember / Forgot Row */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Icon name="check-square-o" size={16} color="#a95eff" />
              <Text style={[styles.rememberText, { color: text }]}> Remember me</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ArtistForgotPasswordScreen')}>
              <Text style={styles.forgot}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity onPress={handleSignIn}>
            <LinearGradient 
              colors={['#B15CDE', '#7952FC']} 
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0}}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={[styles.orText, { color: placeholder }]}>or sign in with</Text>

          {/* Google Sign In */}
          <TouchableOpacity style={styles.socialButton}>
            <GoogleIcon style={styles.socialIcon} width={24} height={24} />
            <Text style={styles.socialButtonText}>Sign in with Google</Text>
          </TouchableOpacity>

          {/* Apple Sign In */}
          <TouchableOpacity style={styles.socialButton}>
            <AppleIcon style={styles.socialIcon} width={24} height={24} />
            <Text style={styles.socialButtonText}>Sign in with Apple</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
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
  inner: { 
    padding: 14,
    marginTop: 60,
  },
  title: { 
    fontFamily: 'Nunito Sans',
    fontWeight: '800',
    fontSize: 30,
    lineHeight: 40,
    letterSpacing: 0,
    marginBottom: 15 
  },
  subtitle: { 
    fontFamily: 'Nunito Sans',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    marginBottom: 45 
  },
  signup: { 
    fontFamily: 'Nunito Sans',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    color: '#a95eff' 
  },

  inputContainer: {
    width: 361,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 16,
  },
  passwordContainer: {
    borderColor: 'rgba(141, 107, 252, 1)',
  },
  inputIcon: { marginRight: 8 },
  input: {
    fontSize: 16,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: 14,
  },
  forgot: {
    color: '#a95eff',
    fontSize: 14,
    fontWeight: '500',
  },
  primaryButton: {
    width: 361,
    height: 52,
    gap: 10,
    borderRadius: 14,
    paddingRight: 16,
    paddingLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  primaryButtonText: {
    fontFamily: 'Nunito Sans',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'rgba(255, 255, 255, 1)',
  },
  orText: {
    textAlign: 'center',
    marginBottom: 65,
  },
  socialButton: {
    width: 361,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  socialButtonText: {
    marginLeft: 10,
    fontFamily: 'Nunito Sans',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    color: '#C6C5ED',
  },
});

export default ArtistSigninScreen; 