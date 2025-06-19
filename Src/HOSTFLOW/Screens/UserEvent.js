import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const UserEvent = ({ navigation }) => {
  // Add state for sound system availability
  const [soundSystemAvailable, setSoundSystemAvailable] = React.useState(true);
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#18151f',
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }}>
      <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 120}}>
        {/* Event Image with overlay and floating buttons */}
        <View style={styles.eventImageWrapper}>
          <Image
            source={require('../assets/Images/ffff.jpg')}
            style={styles.eventImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["rgba(0,0,0,0)", "#18151f"]}
            style={styles.eventImageGradient}
          />
          <TouchableOpacity style={styles.fabLeft} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={26} color="#C6C5ED" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.fabRight}>
            <Ionicons name="share-social-outline" size={22} color="#C6C5ED" />
          </TouchableOpacity>
        </View>

        {/* Organizer Row */}
        <View style={styles.organizerRow}>
          <Image source={require('../assets/Images/Avatar.png')} style={styles.organizerAvatar} />
          <View style={{flex: 1, marginLeft: 14}}>
            <Text style={styles.organizerName}>Michael De Santa</Text>
            <Text style={styles.organizerSubtitle}>Organizer</Text>
          </View>
          <View style={styles.upcomingPill}>
            <LinearGradient
              colors={["#7952FC", "#B15CDE"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.upcomingPill}
            >
              <Ionicons name="musical-notes-outline" size={16} color="#fff" style={{marginRight: 4}} />
              <Text style={styles.upcomingPillText}>Upcoming</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Timing pill and price */}
        <View style={styles.timingPriceRow}>
          <View style={styles.timingPill}>
            <Ionicons name="musical-notes-outline" size={16} color="#a95eff" style={{marginRight: 6}} />
            <Text style={styles.timingPillLabel}>Timing :</Text>
            <Text style={styles.timingPillTime}>08:30PM</Text>
          </View>
          <Text style={styles.priceText}>$400-$500</Text>
        </View>

        {/* Event Title */}
        <Text style={styles.eventTitle}>Sounds of Celebration</Text>

        {/* Category Pills */}
        <View style={styles.categoryPillsRow}>
          {['Rock', 'Classical', 'Jazz', 'Piano', 'Guitar'].map(tag => (
            <View key={tag} style={styles.categoryPill}>
              <Text style={styles.categoryPillText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Event Details Card */}
        <View style={styles.eventDetailsCard}>
          <View style={styles.eventDetailsCol}>
            <Ionicons name="calendar-outline" size={18} color="#a95eff" />
            <Text style={styles.eventDetailsLabel}>Date</Text>
            <Text style={styles.eventDetailsValue}>May 20</Text>
          </View>
          <View style={styles.eventDetailsCol}>
            <Ionicons name="location-outline" size={18} color="#a95eff" />
            <Text style={styles.eventDetailsLabel}>Location</Text>
            <Text style={styles.eventDetailsValue}>Yogyakarta</Text>
          </View>
          <View style={styles.eventDetailsCol}>
            <Ionicons name="people-outline" size={18} color="#a95eff" />
            <Text style={styles.eventDetailsLabel}>Crowd Capacity</Text>
            <Text style={styles.eventDetailsValue}>500</Text>
          </View>
        </View>

        {/* Sound System Availability */}
        <Text style={styles.sectionTitle}>Sound System Availability</Text>
        <View style={styles.soundSystemRow}>
          <TouchableOpacity style={[styles.checkboxPill, soundSystemAvailable && styles.checkboxPillActive]} onPress={() => setSoundSystemAvailable(true)}>
            <View style={[styles.customCheckbox, soundSystemAvailable && styles.customCheckboxChecked]}>
              {soundSystemAvailable && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={[styles.checkboxPillText, soundSystemAvailable && styles.checkboxPillTextActive]}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.checkboxPill, !soundSystemAvailable && styles.checkboxPillActive]} onPress={() => setSoundSystemAvailable(false)}>
            <View style={[styles.customCheckbox, !soundSystemAvailable && styles.customCheckboxCheckedNo]}>
              {!soundSystemAvailable && <Text style={styles.checkmarkNo}></Text>}
            </View>
            <Text style={[styles.checkboxPillText, !soundSystemAvailable && styles.checkboxPillTextActive]}>No</Text>
          </TouchableOpacity>
        </View>

        {/* About this event */}
        <Text style={styles.sectionTitle}>About this event:</Text>
        <Text style={styles.aboutText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec lorem a justo pulvinar suscipit.
        </Text>

        {/* Heart and Sold Out Buttons (moved from fixed to scrollable) */}
        <View style={styles.fixedBottomButtonsContainer}>
          <View style={styles.heartButtonOuter}>
            <TouchableOpacity style={styles.heartButton}>
              <Ionicons name="heart-outline" size={32} color="#a95eff" />
            </TouchableOpacity>
          </View>
          <LinearGradient
            colors={["#B15CDE", "#7952FC"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.soldOutButton}
          >
            <TouchableOpacity style={styles.soldOutButtonInner} onPress={() => navigation.navigate('UserFormBookingScreen', { eventDetails: { title: 'Sounds of Celebration', price: '$400-$500', location: 'Yogyakarta', image: require('../assets/Images/ffff.jpg') } })}>
              <Text style={styles.soldOutButtonText}>Continue</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18151f',
  },
  eventImageWrapper: {
    width: '100%',
    height: 320,
    position: 'relative',
    marginBottom: -30,
  },
  eventImage: {
    width: '100%',
    height: 320,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  eventImageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 180,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  fabLeft: {
    position: 'absolute',
    top: 36,
    left: 18,
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C6C5ED',
    backgroundColor: 'rgba(24,21,31,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  fabRight: {
    position: 'absolute',
    top: 36,
    right: 18,
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C6C5ED',
    backgroundColor: 'rgba(24,21,31,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  organizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  organizerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 0,
    borderWidth: 2,
    borderColor: '#fff',
  },
  organizerName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#C6C5ED',
    fontFamily: 'Nunito Sans',
  },
  organizerSubtitle: {
    fontSize: 14,
    color: '#b3b3cc',
    marginTop: 2,
    fontFamily: 'Nunito Sans',
  },
  upcomingPill: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    paddingTop: 0,
    paddingRight: 18,
    paddingBottom: 0,
    paddingLeft: 12,
    gap: 4,
    borderRadius: 360,
    marginLeft: 'auto',
    overflow: 'hidden',
  },
  upcomingPillText: {
    color: '#fff',
    fontFamily: 'Nunito Sans',
    fontWeight: '600',
    fontSize: 14,
  },
  timingPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  timingPill: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    paddingTop: 0,
    paddingRight: 18,
    paddingBottom: 0,
    paddingLeft: 12,
    gap: 4,
    borderRadius: 360,
    borderWidth: 1,
    borderColor: '#7952FC',
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
  },
  timingPillLabel: {
    textAlign: 'center',
    fontFamily: 'Nunito Sans',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21,
    // Gradient text workaround for React Native
    color: '#B15CDE', // fallback
  },
  timingPillLabelGradient: {
    // This style is for gradient text using react-native-linear-gradient and MaskedView
    // Not directly usable in StyleSheet, but for reference
    textAlign: 'center',
    fontFamily: 'Nunito Sans',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21,
  },
  timingPillTime: {
    color: '#D9D8F3',
    fontFamily: 'Nunito Sans',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21,
    textAlign: 'center',
  },
  priceText: {
    color: '#B15CDE',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Nunito Sans',
  },
  eventTitle: {
    overflow: 'hidden',
    color: '#C6C5ED',
    textOverflow: 'ellipsis',
    fontFamily: 'Nunito Sans',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 30,
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 8,
  },
  categoryPillsRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingHorizontal: 20,
    marginBottom: 18,
    display: 'flex',
    alignItems: 'flex-start',
  },
  categoryPill: {
    borderWidth: 1,
    borderColor: '#b3b3cc',
    backgroundColor: 'transparent',
    borderRadius: 16,
    marginRight: 12,
    marginBottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  categoryPillText: {
    color: '#C6C5ED',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16,
    // font-feature-settings is not directly supported in React Native, but left as a comment for reference
    // fontFeatureSettings: "'salt' on",
  },
  eventDetailsCard: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'rgba(30,30,40,0.95)',
    borderWidth: 1.5,
    borderColor: '#b3b3cc',
    borderRadius: 24,
    marginHorizontal: 14,
    marginBottom: 18,
    marginTop: 2,
    paddingVertical: 18,
    paddingHorizontal: 0,
  },
  eventDetailsCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  eventDetailsLabel: {
    color: '#b3b3cc',
    fontSize: 13,
    fontWeight: '400',
    marginTop: 2,
    fontFamily: 'Nunito Sans',
  },
  eventDetailsValue: {
    color: '#a95eff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
    fontFamily: 'Nunito Sans',
  },
  sectionTitle: {
    color: '#C6C5ED',
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 6,
    fontFamily: 'Nunito Sans',
  },
  soundSystemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  customCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#a95eff',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  customCheckboxChecked: {
    backgroundColor: '#a95eff',
  },
  customCheckboxCheckedNo: {
    backgroundColor: 'transparent',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  checkmarkNo: {
    color: 'transparent',
  },
  checkboxPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 10,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginRight: 24,
    backgroundColor: 'transparent',
  },
  checkboxPillActive: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  checkboxPillText: {
    color: '#C6C5ED',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Nunito Sans',
    marginLeft: 2,
  },
  checkboxPillTextActive: {
    color: '#a95eff',
    fontWeight: '700',
  },
  aboutText: {
    color: '#b3b3cc',
    fontSize: 15,
    marginHorizontal: 20,
    marginBottom: 40,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: 'Nunito Sans',
  },
  fixedBottomButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 0,
    paddingTop: 0,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    gap: 16,
    marginTop: 24,
  },
 
  heartButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'transparent',
    elevation: 0,
  },
  soldOutButton: {
    flex: 2,
    height: 56,
    borderRadius: 14,
    borderWidth: 0,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 0,
    marginRight: 0,
    paddingHorizontal: 0,
    shadowColor: 'transparent',
    elevation: 0,
    
  },
  soldOutButtonText: {
    color: '#fff',
    fontFamily: 'Nunito Sans',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  soldOutButtonInner: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserEvent; 