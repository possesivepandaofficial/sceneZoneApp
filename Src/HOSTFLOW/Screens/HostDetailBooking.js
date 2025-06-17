import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

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
    tiny: Math.max(width * 0.025, 10),
    small: Math.max(width * 0.03, 12),
    body: Math.max(width * 0.035, 14),
    title: Math.max(width * 0.04, 16),
    header: Math.max(width * 0.045, 18),
    large: Math.max(width * 0.05, 20),
  },
  borderRadius: {
    sm: Math.max(width * 0.015, 6),
    md: Math.max(width * 0.025, 10),
    lg: Math.max(width * 0.04, 15),
    xl: Math.max(width * 0.06, 20),
  },
  buttonHeight: Math.max(height * 0.065, 50),
  iconSize: Math.max(width * 0.06, 20),
  imageHeight: Math.min(height * 0.25, 200),
  cardMargin: Math.max(width * 0.04, 16),
};

const HostDetailBookingContent = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  // Sample data for booking details
  const bookingDetails = {
    subtotal: '50.00',
    platformFees: '1.50',
    tax: '2.00', // Assuming 4% tax on subtotal
    total: '53.50', // subtotal + platformFees + tax
  };

  return (
    <View style={[
      styles.container,
      {
        // Comprehensive safe area handling for main container
        paddingTop: Math.max(insets.top, 0),
      }
    ]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            // Enhanced content padding with proper safe area consideration
            paddingBottom: Math.max(insets.bottom + 30, 50),
          }
        ]}
        showsVerticalScrollIndicator={false}
        bounces={true}
        scrollEventThrottle={16}
      >
        {/* Enhanced Header with comprehensive safe area handling */}
        <View style={[
          styles.header,
          {
            // Dynamic header positioning based on safe area
            paddingTop: Math.max(dimensions.spacing.lg, 16),
            paddingBottom: Math.max(dimensions.spacing.sm, 8),
            marginTop: Math.max(dimensions.spacing.sm, 8),
          }
        ]}>
          <TouchableOpacity 
            style={[
              styles.backButton,
              {
                // Enhanced back button with proper touch target
                minWidth: Math.max(dimensions.buttonHeight * 0.7, 44),
                minHeight: Math.max(dimensions.buttonHeight * 0.7, 44),
              }
            ]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Feather name="arrow-left" size={Math.max(dimensions.iconSize, 24)} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Booking Payment</Text>
          <View style={{ width: Math.max(dimensions.iconSize, 24) }} />
        </View>

        {/* Enhanced Separator Line */}
        <View style={[
          styles.separator,
          {
            marginVertical: Math.max(dimensions.spacing.xs, 5),
          }
        ]} />

        {/* Enhanced Event Image Section with responsive sizing */}
        <View style={[
          styles.imageCard,
          {
            marginHorizontal: dimensions.cardMargin,
            marginTop: Math.max(dimensions.spacing.lg, 16),
            marginBottom: Math.max(dimensions.spacing.md, 12),
          }
        ]}>
          <Image
            source={require('../assets/Images/fff.jpg')} // Replace with actual image source if available
            style={[
              styles.eventImage,
              {
                height: dimensions.imageHeight,
              }
            ]}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.eventTitle}>Sounds of Celebration</Text>
          </View>
        </View>

        {/* Enhanced Payment Details Section with responsive spacing */}
        <View style={[
          styles.detailsCard,
          {
            marginHorizontal: dimensions.cardMargin,
            marginTop: Math.max(dimensions.spacing.lg, 16),
            marginBottom: Math.max(dimensions.spacing.md, 12),
            padding: Math.max(dimensions.spacing.lg, 16),
          }
        ]}>
          <View style={[
            styles.detailRow,
            {
              marginBottom: Math.max(dimensions.spacing.sm, 8),
            }
          ]}>
            <Text style={styles.detailLabel}>Subtotal</Text>
            <Text style={styles.detailValue}>${bookingDetails.subtotal}</Text>
          </View>
          <View style={[
            styles.detailRow,
            {
              marginBottom: Math.max(dimensions.spacing.sm, 8),
            }
          ]}>
            <Text style={styles.detailLabel}>Platform Fees</Text>
            <Text style={styles.detailValue}>${bookingDetails.platformFees}</Text>
          </View>
          <View style={[
            styles.detailRow,
            {
              marginBottom: Math.max(dimensions.spacing.sm, 8),
            }
          ]}>
            <Text style={styles.detailLabel}>Tax (4%)</Text>
            <Text style={styles.detailValue}>${bookingDetails.tax}</Text>
          </View>
          {/* Enhanced Total Line */}
          <View style={[
            styles.totalSeparator,
            {
              marginVertical: Math.max(dimensions.spacing.md, 10),
            }
          ]} />
          <View style={styles.detailRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${bookingDetails.total}</Text>
          </View>
        </View>

        {/* Enhanced Negotiation Available Button with responsive design */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('HostNegotiationAvailable')} 
          style={[
            styles.negotiationButton,
            {
              marginHorizontal: dimensions.cardMargin,
              marginTop: Math.max(dimensions.spacing.lg, 16),
              marginBottom: Math.max(dimensions.spacing.md, 12),
              padding: Math.max(dimensions.spacing.lg, 16),
              minHeight: Math.max(dimensions.buttonHeight * 0.8, 48),
            }
          ]}
          activeOpacity={0.8}
        >
          <Text style={styles.negotiationButtonText}>Negotiation Available</Text>
          <Feather name="chevron-right" size={Math.max(dimensions.iconSize * 0.8, 20)} color="#999" />
        </TouchableOpacity>

        {/* Enhanced Confirm Booking Button with comprehensive safe area handling */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('HostShortBookPaymentMethod')} 
          style={[
            styles.confirmButton,
            {
              marginHorizontal: dimensions.cardMargin,
              marginTop: Math.max(dimensions.spacing.xl, 24),
              marginBottom: Math.max(dimensions.spacing.lg, 16),
            }
          ]}
          activeOpacity={0.9}
        >
          <View
            style={[
              styles.confirmButtonGradient,
              {
                paddingVertical: Math.max(dimensions.spacing.lg, 16),
                minHeight: Math.max(dimensions.buttonHeight, 54),
                backgroundColor: '#7952FC',
              }
            ]}
          >
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const HostDetailBookingScreen = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <HostDetailBookingContent navigation={navigation} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e', // Dark background color from image
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: dimensions.cardMargin,
  },
  backButton: {
    padding: Math.max(dimensions.spacing.sm, 8),
    borderRadius: dimensions.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Math.max(dimensions.fontSize.header, 18),
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    // Enhanced text shadow for better readability
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#333',
    marginHorizontal: dimensions.cardMargin,
  },
  imageCard: {
    borderRadius: dimensions.borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: '#282828', // Darker background for card
    // Enhanced shadow for better depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  eventImage: {
    width: '100%',
    backgroundColor: '#333', // Fallback color
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Enhanced overlay for better text readability
    padding: Math.max(dimensions.spacing.md, 12),
    // Enhanced gradient overlay
    backgroundImage: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
  },
  eventTitle: {
    fontSize: Math.max(dimensions.fontSize.header, 18),
    fontWeight: '700',
    color: '#fff',
    // Enhanced text shadow for better readability
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  detailsCard: {
    borderRadius: dimensions.borderRadius.lg,
    backgroundColor: '#282828', // Darker background for card
    // Enhanced shadow for better visual hierarchy
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: Math.max(dimensions.fontSize.body, 16),
    color: '#ccc', // Light gray text
    fontWeight: '400',
  },
  detailValue: {
    fontSize: Math.max(dimensions.fontSize.body, 16),
    color: '#fff', // White text
    fontWeight: '600',
  },
  totalSeparator: {
    height: 1,
    backgroundColor: '#444',
  },
  totalLabel: {
    fontSize: Math.max(dimensions.fontSize.header, 18),
    fontWeight: '700',
    color: '#fff',
  },
  totalValue: {
    fontSize: Math.max(dimensions.fontSize.header, 18),
    fontWeight: '700',
    color: '#fff',
  },
  negotiationButton: {
    backgroundColor: '#282828', // Darker background for button
    borderRadius: dimensions.borderRadius.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // Enhanced shadow for better visual feedback
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  negotiationButtonText: {
    fontSize: Math.max(dimensions.fontSize.body, 16),
    color: '#fff',
    fontWeight: '500',
  },
  confirmButton: {
    borderRadius: dimensions.borderRadius.lg,
    overflow: 'hidden', // Clip gradient to border radius
    // Enhanced shadow for better visual prominence
    shadowColor: '#7952FC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmButtonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    // Enhanced text shadow for better contrast
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default HostDetailBookingScreen; 