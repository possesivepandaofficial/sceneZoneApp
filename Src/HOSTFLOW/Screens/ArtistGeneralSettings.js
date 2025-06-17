import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ArtistGeneralSettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>General Settings</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewContent}>
        {/* Placeholder Settings Options */}
        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="notifications-outline" size={24} color="#a95eff" style={styles.optionIcon} />
          <Text style={styles.optionText}>Notification Settings</Text>
          <Icon name="chevron-right" size={20} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#a95eff" style={styles.optionIcon} />
          <Text style={styles.optionText}>Privacy Policy</Text>
          <Icon name="chevron-right" size={20} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="document-text-outline" size={24} color="#a95eff" style={styles.optionIcon} />
          <Text style={styles.optionText}>Terms of Service</Text>
          <Icon name="chevron-right" size={20} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <MaterialIcons name="rate-review" size={24} color="#a95eff" style={styles.optionIcon} />
          <Text style={styles.optionText}>Rate Us</Text>
          <Icon name="chevron-right" size={20} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="share-social-outline" size={24} color="#a95eff" style={styles.optionIcon} />
          <Text style={styles.optionText}>Share App</Text>
          <Icon name="chevron-right" size={20} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="information-circle-outline" size={24} color="#a95eff" style={styles.optionIcon} />
          <Text style={styles.optionText}>About Us</Text>
          <Icon name="chevron-right" size={20} color="#aaa" />
        </TouchableOpacity>

      </ScrollView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
  },
  scrollViewContent: {
    paddingVertical: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 16,
  },
  optionIcon: {
    marginRight: 16,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
});

export default ArtistGeneralSettingsScreen; 