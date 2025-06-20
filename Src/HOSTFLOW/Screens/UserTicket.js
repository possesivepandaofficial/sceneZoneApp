import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import SignUpBackground from '../assets/Banners/SignUp';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const UserTicketScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('active');
  const insets = useSafeAreaInsets();

  // Placeholder data for tickets
  const activeTickets = [
    {
      id: 1,
      image: require('../assets/Images/fff.jpg'), // Placeholder image
      date: 'Sep\n20',
      title: 'Harmony Festival 2025',
      ticketId: '#1234567890',
    },
     {
      id: 2,
      image: require('../assets/Images/shortlist1.png'), // Placeholder image
      date: 'Sep\n20',
      title: 'Unity Fest 2025',
      ticketId: '#0987654321',
    },
    // Add more active tickets as needed
  ];

   const pastTickets = [
    {
      id: 1,
      image: require('../assets/Images/wall.jpg'), // Placeholder image
      date: 'Aug\n15',
      title: 'Previous Concert 2024',
      ticketId: '#PAST987654',
    },
     {
      id: 2,
      image: require('../assets/Images/shortlist1.png'), // Placeholder image
      date: 'Jul\n01',
      title: 'Old Festival 2023',
      ticketId: '#PAST123456',
    },
    // Add more past tickets as needed
  ];


  return (
    <SafeAreaView style={[styles.container, {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }]}>
      {/* SVG Background */}
      <View style={styles.backgroundSvgContainer} pointerEvents="none">
        <SignUpBackground style={styles.backgroundSvg} width={width} height="100%" />
      </View>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Ticket</Text>
        <View style={{ width: 24 }} />{/* Spacer to align title */}
      </View>

      {/* Ticket Type Buttons */}
      <View style={styles.ticketTypeButtonsContainer}>
        {/* Active Ticket Button */}
        <TouchableOpacity
          style={[styles.ticketTypeButton, { marginRight: 12 }]}
          onPress={() => setActiveTab('active')}
        >
          {activeTab === 'active' ? (
            <LinearGradient
              colors={['#B15CDE', '#7952FC']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={styles.ticketTypeButtonActiveBg}
            >
              <Text style={styles.ticketTypeButtonTextActive}>Active Ticket</Text>
            </LinearGradient>
          ) : (
            <View style={styles.ticketTypeButtonInactiveBg}>
              <Text style={styles.ticketTypeButtonTextInactive}>Active Ticket</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Past Ticket Button */}
        <TouchableOpacity
          style={styles.ticketTypeButton}
          onPress={() => setActiveTab('past')}
        >
          {activeTab === 'past' ? (
            <LinearGradient
              colors={['#B15CDE', '#7952FC']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={styles.ticketTypeButtonActiveBg}
            >
              <Text style={styles.ticketTypeButtonTextActive}>Past Ticket</Text>
            </LinearGradient>
          ) : (
            <View style={styles.ticketTypeButtonInactiveBg}>
              <Text style={styles.ticketTypeButtonTextInactive}>Past Ticket</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Ticket List */}
      {/* Display tickets based on activeTab */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        {(activeTab === 'active' ? activeTickets : pastTickets).map((ticket) => (
          <View key={ticket.id} style={styles.ticketCard}>
            <Image source={ticket.image} style={styles.ticketImage} resizeMode="cover" />
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{ticket.date}</Text>
            </View>
            <TouchableOpacity style={styles.heartIconPlaceholder}>
               <Ionicons name="heart-outline" size={20} color="#fff" />
            </TouchableOpacity>
            <View style={styles.ticketInfo}>
              <Text style={styles.ticketTitle}>{ticket.title}</Text>
              <Text style={styles.ticketIdText}>Ticket ID: {ticket.ticketId}</Text>
            </View>
             <TouchableOpacity style={styles.ticketArrowButton}>
                 <MaterialIcons name="chevron-right" size={24} color="#fff" />
             </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation Placeholder - Actual navigation handled by navigator */}
      {/* <View style={{ height: 60 }} /> */}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop:40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1, // Allow title to take up space
    textAlign: 'center', // Center the text
  },
  ticketTypeButtonsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'transparent',
    borderRadius: 0,
    overflow: 'visible',
    borderWidth: 0,
  },
  ticketTypeButton: {
    flex: 1,
    height: 52,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 10,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  ticketTypeButtonActiveBg: {
    flex: 1,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    width: '100%',
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 10,
    alignSelf: 'stretch',
  },
  ticketTypeButtonInactiveBg: {
    flex: 1,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    width: '100%',
    backgroundColor: '#1A1A1F',
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 10,
    alignSelf: 'stretch',
  },
  ticketTypeButtonTextActive: {
    color: '#18151f',
    fontFamily: 'Nunito Sans',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 21,
    textAlign: 'center',
  },
  ticketTypeButtonTextInactive: {
    color: '#C6C5ED',
    fontFamily: 'Nunito Sans',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 21,
    textAlign: 'center',
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  ticketCard: {
    backgroundColor: '#1a1a1a', // Dark background for ticket card
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden', // Clip image to rounded corners
    position: 'relative', // For absolute positioning of date, heart, and arrow
  },
  ticketImage: {
    width: '100%%',
    height: 150,
  },
  dateContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent dark background
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heartIconPlaceholder: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Ensure heart is above the image
  },
  ticketInfo: {
    padding: 10,
  },
  ticketTitle: {
    overflow: 'hidden',
    color: '#C6C5ED',
    textOverflow: 'ellipsis',
    fontFamily: 'Nunito Sans',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 4,
  },
  ticketIdText: {
    fontSize: 12,
    color: '#aaa',
  },
  ticketArrowButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
    padding: 5,
    borderRadius: 15,
    zIndex: 1, // Ensure arrow is above ticket info
  },
  backgroundSvgContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  backgroundSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export default UserTicketScreen; 