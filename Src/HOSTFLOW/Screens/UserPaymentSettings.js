import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { toggleFavorite, selectIsFavorite } from '../Redux/slices/favoritesSlice';
import GoogleIcon from '../assets/icons/Google';
import AppleIcon from '../assets/icons/Apple';
import VisaIcon from '../assets/icons/Visa';
import MasterIcon from '../assets/icons/Mater';

// Enhanced responsive system with device orientation support
const getScreenDimensions = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

const UserPaymentSettingsContent = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);
  const [screenData, setScreenData] = useState(getScreenDimensions());
  
  // Enhanced responsive system with real-time updates
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenData({ width: window.width, height: window.height });
    });
    return () => subscription?.remove();
  }, []);

  // Enhanced responsive dimensions with device-specific optimization
  const { width, height } = screenData;
  const isTablet = width >= 768;
  const isSmallPhone = width < 350;
  const isLargePhone = width >= 414;
  const isLandscape = width > height;
  
  // Device-specific safe area multipliers
  const safeAreaMultiplier = {
    top: isTablet ? 0.8 : isSmallPhone ? 1.2 : 1.0,
    bottom: isTablet ? 0.6 : isSmallPhone ? 1.3 : 1.0,
    horizontal: isTablet ? 0.7 : isSmallPhone ? 1.1 : 1.0,
  };

  const dimensions = {
    spacing: {
      xs: Math.max(width * 0.01, isSmallPhone ? 3 : 4),
      sm: Math.max(width * 0.02, isSmallPhone ? 6 : 8),
      md: Math.max(width * 0.03, isSmallPhone ? 10 : 12),
      lg: Math.max(width * 0.04, isSmallPhone ? 14 : 16),
      xl: Math.max(width * 0.05, isSmallPhone ? 18 : 20),
      xxl: Math.max(width * 0.06, isSmallPhone ? 22 : 24),
    },
    fontSize: {
      small: Math.max(width * 0.03, isSmallPhone ? 11 : 12),
      body: Math.max(width * 0.035, isSmallPhone ? 13 : 14),
      title: Math.max(width * 0.04, isSmallPhone ? 15 : 16),
      header: Math.max(width * 0.045, isSmallPhone ? 17 : 18),
      large: Math.max(width * 0.05, isSmallPhone ? 19 : 20),
    },
    borderRadius: {
      sm: Math.max(width * 0.015, isSmallPhone ? 5 : 6),
      md: Math.max(width * 0.025, isSmallPhone ? 8 : 10),
      lg: Math.max(width * 0.04, isSmallPhone ? 12 : 15),
    },
    buttonHeight: Math.max(height * (isLandscape ? 0.08 : 0.06), isSmallPhone ? 48 : 50),
    iconSize: Math.max(width * 0.06, isSmallPhone ? 22 : 24),
    paymentIconSize: Math.max(width * 0.08, isSmallPhone ? 28 : 32),
    cardIconContainer: Math.max(width * 0.1, isSmallPhone ? 36 : 40),
    marginHorizontal: Math.max(width * 0.04, isSmallPhone ? 14 : 16),
    // Enhanced safe area calculations
    safeAreaTop: Math.max(insets.top * safeAreaMultiplier.top, isSmallPhone ? 16 : 20),
    safeAreaBottom: Math.max(insets.bottom * safeAreaMultiplier.bottom + 20, isSmallPhone ? 25 : 30),
    headerPadding: Math.max(insets.top * 0.3 + (isTablet ? 16 : 12), isSmallPhone ? 18 : 20),
  };
  
  // Get favorite status for each payment method
  const isGoogleFavorite = useSelector(state => selectIsFavorite(state, 'google'));
  const isAppleFavorite = useSelector(state => selectIsFavorite(state, 'apple'));
  const isVisaFavorite = useSelector(state => selectIsFavorite(state, 'visa'));
  const isMastercardFavorite = useSelector(state => selectIsFavorite(state, 'mastercard'));

  const handleFavoriteToggle = (paymentId) => {
    try {
      dispatch(toggleFavorite(paymentId));
      navigation.navigate('UserFavorite');
    } catch (error) {
      Alert.alert('Error', 'Failed to update favorite status');
      console.error('Error updating favorite:', error);
    }
  };

  return (
    <View style={[
      styles.container,
      {
        // Enhanced safe area handling with device-specific optimization
        paddingTop: Platform.OS === 'ios' ? 0 : Math.max(insets.top, StatusBar.currentHeight || 0),
      }
    ]}>
      {/* Enhanced Header with Improved Safe Area Handling */}
      <View style={[
        styles.header,
        {
          paddingTop: dimensions.headerPadding + (Platform.OS === 'ios' ? 10 : 0),
          paddingHorizontal: dimensions.marginHorizontal,
          paddingVertical: Math.max(dimensions.spacing.md, 12),
          minHeight: Math.max(height * 0.08, isSmallPhone ? 60 : 70),
        }
      ]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={[
            styles.backButton,
            {
              padding: Math.max(dimensions.spacing.sm, 8),
              borderRadius: dimensions.borderRadius.sm,
              minWidth: Math.max(width * 0.12, 44),
              minHeight: Math.max(width * 0.12, 44),
            }
          ]}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={dimensions.iconSize} color="#fff" />
        </TouchableOpacity>
        <Text style={[
          styles.headerTitle,
          {
            fontSize: Math.max(dimensions.fontSize.header, isTablet ? 22 : 18),
          }
        ]}>
          Payment Settings
        </Text>
        <View style={{ width: Math.max(width * 0.12, 44) }} />
      </View>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollViewContent,
          {
            paddingHorizontal: dimensions.marginHorizontal,
            paddingTop: Math.max(dimensions.spacing.lg, 20),
            // Enhanced bottom padding with device-specific safe area handling
            paddingBottom: Math.max(
              insets.bottom + (isLandscape ? 100 : 130), 
              isSmallPhone ? 120 : isTablet ? 150 : 140
            ),
          }
        ]}
        showsVerticalScrollIndicator={false}
        // Enhanced scroll behavior for better responsiveness
        bounces={Platform.OS === 'ios'}
        overScrollMode={Platform.OS === 'android' ? 'never' : 'auto'}
      >
        {/* Enhanced Google Pay with Improved Responsiveness */}
        <TouchableOpacity 
          style={[
            styles.paymentMethodCard,
            {
              borderRadius: dimensions.borderRadius.md,
              marginBottom: Math.max(dimensions.spacing.md, 10),
              minHeight: Math.max(height * 0.1, isSmallPhone ? 85 : 95),
            }
          ]}
          activeOpacity={0.8}
        >
          <View style={[
            styles.paymentMethodContent,
            {
              paddingVertical: Math.max(dimensions.spacing.lg, isSmallPhone ? 12 : 15),
              paddingHorizontal: Math.max(dimensions.spacing.lg, isSmallPhone ? 12 : 15),
            }
          ]}>
            <View style={[
              styles.paymentIconContainer,
              {
                width: dimensions.cardIconContainer,
                height: dimensions.cardIconContainer,
                marginRight: Math.max(dimensions.spacing.lg, isSmallPhone ? 12 : 15),
              }
            ]}>
              <GoogleIcon
                style={styles.paymentIcon}
                width={dimensions.paymentIconSize}
                height={dimensions.paymentIconSize}
              />
            </View>
            <View style={styles.paymentDetails}>
              <View style={[
                styles.paymentMethodTitleContainer,
                {
                  marginBottom: Math.max(dimensions.spacing.xs, 2),
                }
              ]}>
                <Text style={[
                  styles.paymentMethodTitle,
                  {
                    fontSize: Math.max(dimensions.fontSize.title, isTablet ? 18 : 16),
                  }
                ]}>
                  Google Pay
                </Text>
              </View>
              <View style={[
                styles.paymentMethodInfoContainer,
                {
                  marginBottom: Math.max(dimensions.spacing.xs, 2),
                }
              ]}>
                <Text style={[
                  styles.paymentMethodInfo,
                  {
                    fontSize: Math.max(dimensions.fontSize.body, isTablet ? 16 : 14),
                  }
                ]}>
                  f************n@gmail.com
                </Text>
              </View>
              <View style={[
                styles.paymentMethodBalanceContainer,
                {
                  marginTop: Math.max(dimensions.spacing.xs, 2),
                }
              ]}>
                <Text style={[
                  styles.paymentMethodBalance,
                  {
                    fontSize: Math.max(dimensions.fontSize.body, isTablet ? 16 : 14),
                  }
                ]}>
                  Balance: $1,234.00
                </Text>
              </View>
            </View>
            <View style={styles.editButtonContainer}>
              <TouchableOpacity 
                style={[
                  styles.editButton,
                  {
                    padding: Math.max(dimensions.spacing.sm, 8),
                    borderRadius: dimensions.borderRadius.sm,
                    minWidth: Math.max(width * 0.15, 60),
                    minHeight: Math.max(width * 0.1, 40),
                  }
                ]}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.editButtonText,
                  {
                    fontSize: Math.max(dimensions.fontSize.body, isTablet ? 16 : 14),
                  }
                ]}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* Enhanced Apple Pay with Improved Responsiveness */}
        <TouchableOpacity 
          style={[
            styles.paymentMethodCard,
            {
              borderRadius: dimensions.borderRadius.md,
              marginBottom: Math.max(dimensions.spacing.md, 10),
              minHeight: Math.max(height * 0.1, isSmallPhone ? 85 : 95),
            }
          ]}
          activeOpacity={0.8}
        >
          <View style={[
            styles.paymentMethodContent,
            {
              paddingVertical: Math.max(dimensions.spacing.lg, isSmallPhone ? 12 : 15),
              paddingHorizontal: Math.max(dimensions.spacing.lg, isSmallPhone ? 12 : 15),
            }
          ]}>
            <View style={[
              styles.paymentIconContainer,
              {
                width: dimensions.cardIconContainer,
                height: dimensions.cardIconContainer,
                marginRight: Math.max(dimensions.spacing.lg, isSmallPhone ? 12 : 15),
              }
            ]}>
              <AppleIcon
                style={styles.paymentIcon}
                width={dimensions.paymentIconSize}
                height={dimensions.paymentIconSize}
              />
            </View>
            <View style={styles.paymentDetails}>
              <View style={[
                styles.paymentMethodTitleContainer,
                {
                  marginBottom: Math.max(dimensions.spacing.xs, 2),
                }
              ]}>
                <Text style={[
                  styles.paymentMethodTitle,
                  {
                    fontSize: Math.max(dimensions.fontSize.title, isTablet ? 18 : 16),
                  }
                ]}>
                  Apple Pay
                </Text>
              </View>
              <View style={[
                styles.paymentMethodInfoContainer,
                {
                  marginBottom: Math.max(dimensions.spacing.xs, 2),
                }
              ]}>
                <Text style={[
                  styles.paymentMethodInfo,
                  {
                    fontSize: Math.max(dimensions.fontSize.body, isTablet ? 16 : 14),
                  }
                ]}>
                  f************n@gmail.com
                </Text>
              </View>
              <View style={[
                styles.paymentMethodBalanceContainer,
                {
                  marginTop: Math.max(dimensions.spacing.xs, 2),
                }
              ]}>
                <Text style={[
                  styles.paymentMethodBalance,
                  {
                    fontSize: Math.max(dimensions.fontSize.body, isTablet ? 16 : 14),
                  }
                ]}>
                  Balance: $2,766.00
                </Text>
              </View>
            </View>
            <View style={styles.editButtonContainer}>
              <TouchableOpacity 
                style={[
                  styles.editButton,
                  {
                    padding: Math.max(dimensions.spacing.sm, 8),
                    borderRadius: dimensions.borderRadius.sm,
                    minWidth: Math.max(width * 0.15, 60),
                    minHeight: Math.max(width * 0.1, 40),
                  }
                ]}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.editButtonText,
                  {
                    fontSize: Math.max(dimensions.fontSize.body, isTablet ? 16 : 14),
                  }
                ]}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* Enhanced Visa Card with Superior Responsiveness */}
        <TouchableOpacity 
          style={[
            styles.paymentMethodItem,
            {
              borderRadius: dimensions.borderRadius.md,
              marginBottom: Math.max(dimensions.spacing.md, 10),
              minHeight: Math.max(height * 0.1, isSmallPhone ? 85 : 95),
            }
          ]}
          onPress={() => setSelectedPaymentMethodId('visa')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#B15CDE', '#7952FC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.paymentMethodBackground, selectedPaymentMethodId !== 'visa' && { opacity: 0 }]}
          />
          <View style={[
            styles.paymentMethodContent,
            {
              paddingVertical: Math.max(dimensions.spacing.lg, isSmallPhone ? 12 : 15),
              paddingHorizontal: Math.max(dimensions.spacing.lg, isSmallPhone ? 12 : 15),
            }
          ]}>
            <View style={[
              styles.paymentMethodIconContainer,
              {
                width: dimensions.cardIconContainer,
                height: dimensions.cardIconContainer,
                marginRight: Math.max(dimensions.spacing.lg, isSmallPhone ? 12 : 15),
              }
            ]}>
              <VisaIcon
                width={Math.max(dimensions.paymentIconSize * 1.25, isSmallPhone ? 35 : 40)}
                height={Math.max(dimensions.paymentIconSize * 0.5, isSmallPhone ? 14 : 16)}
              />
            </View>
            <View style={styles.paymentMethodDetails}>
              <Text style={[
                styles.paymentMethodTitle,
                {
                  fontSize: Math.max(dimensions.fontSize.title, isTablet ? 18 : 16),
                }
              ]}>
                Visa
              </Text>
              <Text style={[
                styles.paymentMethodInfo,
                {
                  fontSize: Math.max(dimensions.fontSize.body, isTablet ? 16 : 14),
                  marginTop: Math.max(dimensions.spacing.xs, 2),
                }
              ]}>
                **** **** **** 1234
              </Text>
              <Text style={[
                styles.paymentMethodBalance,
                {
                  fontSize: Math.max(dimensions.fontSize.body, isTablet ? 16 : 14),
                  marginTop: Math.max(dimensions.spacing.xs, 2),
                }
              ]}>
                Balance: <Text style={{color: '#a95eff'}}>$1,876,766.00</Text>
              </Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={dimensions.iconSize} 
              color="#555" 
            />
          </View>
        </TouchableOpacity>

        {/* Enhanced Master Card with Superior Responsiveness */}
        <TouchableOpacity 
          style={[
            styles.paymentMethodItem,
            {
              borderRadius: dimensions.borderRadius.md,
              marginBottom: Math.max(dimensions.spacing.md, 10),
              minHeight: Math.max(height * 0.1, isSmallPhone ? 85 : 95),
            }
          ]}
          onPress={() => setSelectedPaymentMethodId('mastercard')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#B15CDE', '#7952FC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.paymentMethodBackground, selectedPaymentMethodId !== 'mastercard' && { opacity: 0 }]}
          />
          <View style={[
            styles.paymentMethodContent,
            {
              paddingVertical: Math.max(dimensions.spacing.lg, isSmallPhone ? 12 : 15),
              paddingHorizontal: Math.max(dimensions.spacing.lg, isSmallPhone ? 12 : 15),
            }
          ]}>
            <View style={[
              styles.paymentMethodIconContainer,
              {
                width: dimensions.cardIconContainer,
                height: dimensions.cardIconContainer,
                marginRight: Math.max(dimensions.spacing.lg, isSmallPhone ? 12 : 15),
              }
            ]}>
              <MasterIcon
                width={dimensions.paymentIconSize}
                height={dimensions.paymentIconSize}
              />
            </View>
            <View style={styles.paymentMethodDetails}>
              <Text style={[
                styles.paymentMethodTitle,
                {
                  fontSize: Math.max(dimensions.fontSize.title, isTablet ? 18 : 16),
                }
              ]}>
                Master Card
              </Text>
              <Text style={[
                styles.paymentMethodInfo,
                {
                  fontSize: Math.max(dimensions.fontSize.body, isTablet ? 16 : 14),
                  marginTop: Math.max(dimensions.spacing.xs, 2),
                }
              ]}>
                **** **** **** 1234
              </Text>
              <Text style={[
                styles.paymentMethodBalance,
                {
                  fontSize: Math.max(dimensions.fontSize.body, isTablet ? 16 : 14),
                  marginTop: Math.max(dimensions.spacing.xs, 2),
                }
              ]}>
                Balance: <Text style={{color: '#a95eff'}}>$2,876,766.00</Text>
              </Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={dimensions.iconSize} 
              color="#555" 
            />
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Enhanced Add Payment Method Button with Superior Safe Area Handling */}
      <TouchableOpacity 
        style={[
          styles.addPaymentButton,
          {
            marginHorizontal: dimensions.marginHorizontal,
            borderRadius: dimensions.borderRadius.md,
            // Enhanced bottom safe area with device-specific optimization
            marginBottom: dimensions.safeAreaBottom,
            minHeight: Math.max(dimensions.buttonHeight, isTablet ? 60 : 54),
            backgroundColor: '#B15CDE',
            paddingVertical: Math.max(dimensions.spacing.lg, isSmallPhone ? 12 : 15),
            alignItems: 'center',
            justifyContent: 'center',
          }
        ]} 
        onPress={() => navigation.navigate('AddPaymentMethodScreen')}
        activeOpacity={0.8}
      >
        <Text style={[
          styles.addPaymentButtonText,
          {
            fontSize: Math.max(dimensions.fontSize.header, isTablet ? 20 : 18),
          }
        ]}>
          Add Payment Method
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const UserPaymentSettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <UserPaymentSettingsContent navigation={navigation} />
    </SafeAreaProvider>
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
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  backButton: {
    // Enhanced touch target for better accessibility
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  paymentMethodItem: {
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
    // Enhanced shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentMethodBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  paymentMethodIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentMethodIcon: {
    width: '100%',
    height: '100%',
  },
  paymentMethodDetails: {
    flex: 1,
  },
  paymentMethodTitle: {
    fontWeight: 'bold',
    color: '#fff',
  },
  paymentMethodInfo: {
    color: '#aaa',
  },
  paymentMethodBalance: {
    color: '#aaa',
  },
  addPaymentButton: {
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // Enhanced shadow for button prominence
    shadowColor: '#7952FC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  gradientButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPaymentButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heartIconPlaceholder: {
    padding: 8,
    marginRight: 8,
  },
  paymentMethodCard: {
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
    // Enhanced shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentDetails: {
    flex: 1,
  },
  paymentMethodTitleContainer: {
    // Margin handled dynamically
  },
  paymentMethodInfoContainer: {
    // Margin handled dynamically
  },
  paymentMethodBalanceContainer: {
    // Margin handled dynamically
  },
  editButtonContainer: {
    marginLeft: 'auto',
  },
  editButton: {
    // Enhanced touch target for better accessibility
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default UserPaymentSettingsScreen; 