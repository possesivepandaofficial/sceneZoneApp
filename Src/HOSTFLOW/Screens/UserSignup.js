import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  Dimensions,
  Switch,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import GoogleIcon from '../assets/icons/Google';
import AppleIcon from '../assets/icons/Apple';
import SignUpBackground from '../assets/Banners/SignUp';

const { width, height } = Dimensions.get('window');

const UserSignupScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignUp = () => {
    navigation.navigate('UserSignin');
  };

  return (
    <View style={styles.container}>
      <SignUpBackground 
        style={styles.backgroundSvg}
        width={width}
        height={height}
      />
      <SafeAreaView style={styles.overlay}>
        <View style={styles.inner}>
          <Text style={[styles.header, { color: '#fff' }]}>Create new{'\n'}user account</Text>

          <Text style={styles.signinText}>
            Already have an account?{' '}
            <Text 
              style={styles.signinLink} 
              onPress={() => navigation.navigate('UserSignin')}
            >
              Sign In
            </Text>
          </Text>

          <View style={styles.inputContainer}>
            <Icon name="person-outline" size={20} color="#aaa" style={styles.icon} />
            <TextInput
              style={[styles.input, { color: '#fff' }]}
              placeholder="Full Name"
              placeholderTextColor="#aaa"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="call-outline" size={20} color="#aaa" style={styles.icon} />
            <TextInput
              style={[styles.input, { color: '#fff' }]}
              placeholder="Mobile Number"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={setMobile}
            />
          </View>

          <View style={[styles.inputContainer, styles.passwordContainer]}>
            <Icon name="lock-closed-outline" size={20} color="#aaa" style={styles.icon} />
            <TextInput
              style={[styles.input, { color: '#fff' }]}
              placeholder="Create Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#aaa" />
            </TouchableOpacity>
          </View>

          <View style={styles.rememberMeRow}>
            <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
              thumbColor={rememberMe ? '#8A2BE2' : '#888'}
            />
            <Text style={{ color: '#fff' }}> Remember me</Text>
          </View>

          <TouchableOpacity onPress={handleSignUp}>
            <LinearGradient 
              colors={['#B15CDE', '#7952FC']} 
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0}}
              style={styles.signupButton}
            >
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={[styles.orText, { color: '#ccc' }]}>or sign up with</Text>

          <TouchableOpacity style={styles.socialButton}>
            <GoogleIcon style={styles.socialIcon} width={24} height={24} />
            <Text style={styles.socialButtonText}>Sign up with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <AppleIcon style={styles.socialIcon} width={24} height={24} />
            <Text style={styles.socialButtonText}>Sign up with Apple</Text>
          </TouchableOpacity>

          <Text style={[styles.termsText, { color: '#aaa' }]}>By clicking "Sign Up" you agree to Recognotes{' '}
            <Text style={styles.linkText}>Term of Use</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontFamily: 'Nunito Sans',
    fontWeight: '800',
    fontSize: 30,
    lineHeight: 40,
    letterSpacing: 0,
    marginTop: 0,
    marginBottom: 10,
  },
  signinText: {
    fontFamily: 'Nunito Sans',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    color: '#aaa',
    marginBottom: 40,
  },
  signinLink: {
    fontFamily: 'Nunito Sans',
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    color: '#A020F0',
  },
  inputContainer: {
    width: 361,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 48,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButton: {
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginBottom: 15,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  socialButton: {
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
    fontWeight: '500',
    fontSize: 14,
    color: '#fff',
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  linkText: {
    color: '#A020F0',
  },
  passwordContainer: {
    borderColor: 'rgba(141, 107, 252, 1)',
  },
});

export default UserSignupScreen; 