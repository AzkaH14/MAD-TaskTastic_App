import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const Profile = ({ navigation }) => {
  // State variables to store profile information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState('');

  // Firebase database URL
  const BASE_URL = 'https://tasktastic-d6c10-default-rtdb.firebaseio.com/Profile/P1.json';

  // Fetch profile data from Firebase when the component is mounted
  const getProfileData = async () => {
    try {
      const response = await axios.get(BASE_URL); // Send GET request
      if (response.status === 200 && response.data) {
        const data = response.data; // Extract data from response
        setFirstName(data.FirstName || '');  // Set state with data from Firebase
        setLastName(data.LastName || '');
        setBirthDate(data.Dateofbirth || '');
        setGender(data.Gender || '');
        setProfileImage(data.Image || '');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error); // Handle errors
    }
  };

  // Fetch profile data on initial render (componentDidMount)
  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header with a back button and title */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          style={styles.backIcon}
          onPress={() => navigation.goBack()} // Navigate back to the previous screen
        />
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Profile Picture */}
      <View style={styles.profilePicContainer}>
        <Image
          source={{ uri: profileImage || 'https://via.placeholder.com/100' }} // Default image if profile picture is not available
          style={styles.profilePic}
        />
      </View>

      {/* Form to display profile information */}
      <View style={styles.form}>
        <Text style={styles.label}>First Name</Text>
        <Text style={styles.displayText}>{firstName || ' '}</Text> {/* Display first name */}

        <Text style={styles.label}>Last Name</Text>
        <Text style={styles.displayText}>{lastName || ' '}</Text> {/* Display last name */}

        <Text style={styles.label}>Birth Date</Text>
        <Text style={styles.displayText}>{birthDate || ' '}</Text> {/* Display birth date */}

        <Text style={styles.label}>Gender</Text>
        <Text style={styles.displayText}>{gender || ' '}</Text> {/* Display gender */}
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate('ProfileEdit', {
            firstName,
            lastName,
            birthDate,
            gender,
            profileImage,
          }) // Navigate to the ProfileEdit screen with current profile data
        }
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styling for the profile page
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f9' },
  header: {
    backgroundColor: '#FFA500',
    height: 170,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  backIcon: { position: 'absolute', top: 50, left: 20 }, // Back icon position
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    top: 50,
    left: 60, // Position the header title
  },
  profilePicContainer: { alignItems: 'center', marginTop: -50 }, // Center profile picture
  profilePic: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: 'white' }, // Styling for profile picture
  form: { marginHorizontal: 20, marginTop: 20 }, // Form layout
  label: { fontSize: 14, color: '#555', marginBottom: 5, marginTop: 15 }, // Label style
  displayText: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    color: '#333',
    minHeight: 40, // Minimum height for input fields
  },
  editButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  editButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }, // Styling for the edit button
});

export default Profile;
