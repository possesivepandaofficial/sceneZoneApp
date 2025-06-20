import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const genres = ['Rock', 'Jazz', 'Hip Hop', 'Classical', 'Reggae', 'Electronic', 'Blues', 'Country', 'Pop', 'Metal'];

const ArtistUpload = ({ navigation }) => {
  const [venueName, setVenueName] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Electronic');
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  // State for video upload might be needed later

  const handleUpload = () => {
    // Handle upload logic here
    console.log('Uploading video...');
    console.log('Selected Genre:', selectedGenre);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Performance Upload</Text>
        <View style={{ width: 24 }} />{/* Spacer for alignment */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Venue Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={venueName}
            onChangeText={setVenueName}
            placeholder="Venue name"
            placeholderTextColor="#aaa"
          />
        </View>

        <Text style={styles.label}>Genre</Text>
        <TouchableOpacity style={styles.dropdownInputContainer} onPress={() => setShowGenreDropdown(!showGenreDropdown)}>
          <Text style={styles.dropdownInputText}>{selectedGenre || 'Select Genre'}</Text>
          <MaterialIcons name={showGenreDropdown ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={20} color="#aaa" />
        </TouchableOpacity>

        {showGenreDropdown && (
          <View style={styles.dropdownListContainer}>
            {genres.map((genreOption) => (
              <TouchableOpacity
                key={genreOption}
                style={[styles.dropdownItem, selectedGenre === genreOption && styles.dropdownItemActive]}
                onPress={() => {
                  setSelectedGenre(genreOption);
                  setShowGenreDropdown(false);
                }}
              >
                <Text style={[styles.dropdownItemText, selectedGenre === genreOption && styles.dropdownItemTextActive]}>{genreOption}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.label}>Reviews</Text>
        <View style={styles.reviewsContainer}>
          {/* Placeholder for star ratings */}
          {[...Array(5)].map((_, i) => (
            <FontAwesome
              key={i}
              name={i < 4 ? 'star' : 'star-o'} // 4 filled, 1 outline based on image
              size={18}
              color="#ffc107" // Star color (example: yellow)
              style={styles.starIcon}
            />
          ))}
        </View>

        <Text style={styles.label}>Upload Your Video</Text>
        <View style={styles.videoUploadSection}>
          <TouchableOpacity style={styles.uploadVideoButton}>
            <MaterialIcons name="photo-camera" size={24} color="#BCA4F7" />
            <Text style={styles.uploadVideoButtonText}>Upload Video</Text>
          </TouchableOpacity>
        </View>

        {/* Main Upload Button */}
        <LinearGradient
          colors={['#B15CDE', '#7952FC']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.uploadButton}
        >
          <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }} onPress={handleUpload}>
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
        </LinearGradient>

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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginRight:110,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50, // Add padding to the bottom
  },
  label: {
    color: '#7A7A90',
    fontFamily: 'Nunito Sans',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    marginBottom: 8,
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#24242D',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 0,
    height: 48,
    backgroundColor: '#121212',
    gap: 12,
    alignSelf: 'stretch',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  reviewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  starIcon: {
    marginRight: 5,
  },
  videoUploadSection: {
    height: 290,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#8D6BFC',
    backgroundColor: '#121212',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    marginBottom: 24,
  },
  uploadVideoButton: {
  marginTop:200,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'stretch',
    borderRadius: 8,
    borderWidth: 1,
    
    backgroundColor: '#19191a',
    // Simulate blur with a subtle shadow (React Native doesn't support real blur on View)
    shadowColor: '#8D6BFC',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  uploadVideoButtonText: {
    color: '#BCA4F7',
    fontSize: 13,
    fontWeight: '400',
    marginLeft: 10,
  },
  uploadButton: {
    display: 'flex',
    width: 361,
    height: 52,
    paddingHorizontal: 16,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexShrink: 0,
    borderRadius: 14,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
  },
  dropdownInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#24242D',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 0,
    height: 48,
    backgroundColor: '#121212',
    gap: 12,
    alignSelf: 'stretch',
    marginBottom: 0,
    justifyContent: 'space-between',
  },
  dropdownInputText: {
    color: '#fff',
    fontSize: 16,
  },
  dropdownListContainer: {
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: '#1a1a1a',
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  dropdownItemActive: {
    backgroundColor: '#a95eff',
  },
  dropdownItemText: {
    color: '#fff',
    fontSize: 16,
  },
  dropdownItemTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ArtistUpload; 