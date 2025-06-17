import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

// Responsive dimensions system for all Android devices
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
    tiny: Math.max(width * 0.025, 10),
    small: Math.max(width * 0.03, 12),
    body: Math.max(width * 0.035, 14),
    title: Math.max(width * 0.04, 16),
    header: Math.max(width * 0.045, 18),
    large: Math.max(width * 0.05, 20),
  },
  borderRadius: {
    sm: Math.max(width * 0.015, 5),
    md: Math.max(width * 0.025, 10),  
    lg: Math.max(width * 0.04, 16),
    xl: Math.max(width * 0.05, 20),
  },
  buttonHeight: Math.max(height * 0.06, 44),
  iconSize: Math.max(width * 0.06, 20),
  inputHeight: Math.max(height * 0.055, 44),
  headerHeight: Math.max(height * 0.08, 60),
  qrCodeHeight: Math.max(height * 0.18, 150),
};

const ArtistPaymentSettingsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={dimensions.iconSize} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Settings</Text>
      </View>
      <ScrollView 
        style={styles.scrollViewContent}
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 20, 40) }}
        showsVerticalScrollIndicator={false}
      >
        {/* UPI ID */}
        <Text style={styles.label}>UPI ID</Text>
        <TextInput
          style={styles.input}
          placeholder="user01@ybl"
          placeholderTextColor="#aaa"
        />

        {/* Account Number */}
        <Text style={styles.label}>Account Number</Text>
        <TextInput
          style={styles.input}
          placeholder="1234 5678 9012 3456"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
        />

        {/* Account Holder and IFSC */}
        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Account Holder</Text>
            <TextInput
              style={styles.halfInput}
              placeholder="User 001"
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>IFSC</Text>
            <TextInput
              style={styles.halfInput}
              placeholder="BKYD"
              placeholderTextColor="#aaa"
            />
          </View>
        </View>

        {/* Upload QR Code */}
        <Text style={styles.label}>Upload Your QR Code</Text>
        <TouchableOpacity style={styles.uploadQrCodeContainer}>
          <View style={styles.uploadQrCodeContent}>
            <Ionicons name="camera-outline" size={Math.max(dimensions.iconSize * 1.4, 28)} color="#a95eff" />
            <Text style={styles.uploadQrCodeText}>Upload QR Code</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Save Details Button - Updated to match UserProfile style */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Details</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingHorizontal: dimensions.spacing.lg,
    paddingVertical: dimensions.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    minHeight: dimensions.headerHeight,
  },
  backButton: {
    minWidth: dimensions.iconSize,
    minHeight: dimensions.iconSize,
    justifyContent: 'center',
    alignItems: 'center',
    padding: dimensions.spacing.xs,
  },
  headerTitle: {
    fontSize: dimensions.fontSize.header,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: dimensions.spacing.lg,
  },
  scrollViewContent: {
    paddingHorizontal: dimensions.spacing.lg,
    paddingVertical: dimensions.spacing.xl,
  },
  label: {
    fontSize: dimensions.fontSize.body,
    color: '#aaa',
    marginBottom: dimensions.spacing.sm,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: dimensions.borderRadius.md,
    paddingHorizontal: dimensions.spacing.lg,
    paddingVertical: dimensions.spacing.md,
    fontSize: dimensions.fontSize.title,
    marginBottom: dimensions.spacing.xl,
    minHeight: dimensions.inputHeight,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: dimensions.spacing.xl,
    gap: dimensions.spacing.md,
  },
  halfInputContainer: {
    flex: 1,
  },
  halfInput: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: dimensions.borderRadius.md,
    paddingHorizontal: dimensions.spacing.lg,
    paddingVertical: dimensions.spacing.md,
    fontSize: dimensions.fontSize.title,
    minHeight: dimensions.inputHeight,
  },
  uploadQrCodeContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: dimensions.borderRadius.md,
    borderWidth: 1,
    borderColor: '#a95eff',
    height: dimensions.qrCodeHeight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: dimensions.spacing.md,
  },
  uploadQrCodeContent: {
    alignItems: 'center',
  },
  uploadQrCodeText: {
    fontSize: dimensions.fontSize.title,
    color: '#a95eff',
    marginTop: dimensions.spacing.sm,
    fontWeight: '500',
  },
  saveButtonContainer: {
    paddingHorizontal: dimensions.spacing.lg,
    paddingBottom: Math.max(dimensions.spacing.xl, 20),
  },
  saveButton: {
    paddingVertical: dimensions.spacing.lg,
    alignItems: 'center',
    borderRadius: dimensions.borderRadius.md,
    borderWidth: 1,
    borderColor: '#a95eff',
    backgroundColor: 'transparent',
  },
  saveButtonText: {
    fontSize: dimensions.fontSize.header,
    fontWeight: 'bold',
    color: '#a95eff',
  },
});

export default ArtistPaymentSettingsScreen;
