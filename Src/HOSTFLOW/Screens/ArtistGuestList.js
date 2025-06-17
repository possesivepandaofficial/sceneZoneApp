import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const guestListData = [
  {
    id: '1',
    name: 'Nova Brightsky',
    ticketId: '#8954673009',
  },
  {
    id: '2',
    name: 'Celeste Moonshadow',
    ticketId: '#8954673009',
  },
  {
    id: '3',
    name: 'Stella Nightingale',
    ticketId: '#8954673009',
  },
  {
    id: '4',
    name: 'Aurora Skydancer',
    ticketId: '#8954673009',
  },
  {
    id: '5',
    name: 'Vega Starwhisper',
    ticketId: '#8954673009',
  },
  {
    id: '6',
    name: 'Lyra Starstream',
    ticketId: '#8954673009',
  },
  {
    id: '7',
    name: 'Comet Dreamweaver',
    ticketId: '#8954673009',
  },
  {
    id: '8',
    name: 'Serena Lightbringer',
    ticketId: '#8954673009',
  },
  // Add more placeholder guest data here
];

const ArtistGuestListScreen = ({ navigation }) => {
  const renderGuestItem = ({ item }) => (
    <View style={styles.guestItemCard}>
      <Text style={styles.guestName}>{item.name}</Text>
      <Text style={styles.ticketId}>Ticket ID: {item.ticketId}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Guest List</Text>
        {/* Level Selector Placeholder */}
        <View style={styles.levelSelectorPlaceholder}>
          <Text style={styles.levelSelectorText}>Level 1</Text>
          <Icon name="chevron-down" size={20} color="#aaa" />
        </View>
      </View>

      <FlatList
        data={guestListData}
        renderItem={renderGuestItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
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
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1, // Allow title to take available space
    textAlign: 'center', // Center the title
    marginLeft:50, // Offset for back arrow
  },
  levelSelectorPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  levelSelectorText: {
    fontSize: 14,
    color: '#fff',
    marginRight: 5,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  guestItemCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  guestName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#a95eff', // Purple color
    marginBottom: 4,
  },
  ticketId: {
    fontSize: 14,
    color: '#aaa',
  },
});

export default ArtistGuestListScreen; 