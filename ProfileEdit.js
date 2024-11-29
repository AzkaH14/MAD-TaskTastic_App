import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const ProfileEdit = ({ navigation, route }) => {
  // State variables to store user profile details
  const [firstName, setFirstName] = useState(route?.params?.firstName || '');
  const [lastName, setLastName] = useState(route?.params?.lastName || '');
  const [birthDate, setBirthDate] = useState(route?.params?.birthDate || '');
  const [gender, setGender] = useState(route?.params?.gender || '');
  const [profileImage, setProfileImage] = useState(
    route?.params?.profileImage || 'https://via.placeholder.com/100'
  );

  // State for showing and hiding the photo options modal
  const [showOptions, setShowOptions] = useState(false);

  // Firebase Realtime Database endpoint
  const BASE_URL = 'https://tasktastic-d6c10-default-rtdb.firebaseio.com/Profile/P1.json';

  // Function to save updated profile data to the database
  const saveProfileData = async () => {
    try {
      const updatedProfile = {
        FirstName: firstName,
        LastName: lastName,
        Dateofbirth: birthDate,
        Gender: gender,
        Image: profileImage,
      };

      const response = await axios.put(BASE_URL, updatedProfile);
      if (response.status === 200) {
        navigation.navigate('Profile', {
          firstName,
          lastName,
          birthDate,
          gender,
          profileImage,
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Function to remove the profile picture and update it to a placeholder
  const handleRemovePicture = () => {
    const placeholderImage = 'https://via.placeholder.com/100';
    setProfileImage(placeholderImage);
    saveUpdatedImageToDatabase(placeholderImage);
    setShowOptions(false);
  };

  // Function to change the profile picture using the device's image library
  const handleChangePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access the gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Crop image to a square
      quality: 0.8,
    });

    if (!result.canceled) {
      const newProfileImage = result.assets[0].uri;
      setProfileImage(newProfileImage);
      saveUpdatedImageToDatabase(newProfileImage);
    }

    setShowOptions(false);
  };

  // Function to save updated profile image to the database
  const saveUpdatedImageToDatabase = async (newImageUri) => {
    try {
      const updatedProfile = {
        FirstName: firstName,
        LastName: lastName,
        Dateofbirth: birthDate,
        Gender: gender,
        Image: newImageUri,
      };

      const response = await axios.put(BASE_URL, updatedProfile);
      if (response.status === 200) {
        console.log('Profile image updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header section with a back button and title */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      {/* Profile picture display and edit option */}
      <View style={styles.profilePicContainer}>
        <TouchableOpacity onPress={() => setShowOptions(true)}>
          <Image source={{ uri: profileImage }} style={styles.profilePic} />
        </TouchableOpacity>
      </View>

      {/* Form for editing profile details */}
      <View style={styles.form}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />

        <Text style={styles.label}>Birth Date</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          value={birthDate}
          onChangeText={setBirthDate}
        />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setGender('male')}
          >
            <View
              style={[styles.radioCircle, gender === 'male' && styles.selectedRadioCircle]}
            />
            <Text style={styles.radioText}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setGender('female')}
          >
            <View
              style={[styles.radioCircle, gender === 'female' && styles.selectedRadioCircle]}
            />
            <Text style={styles.radioText}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Save button to update the profile */}
      <TouchableOpacity style={styles.saveButton} onPress={saveProfileData}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      {/* Modal for handling picture options */}
      <Modal
        transparent
        visible={showOptions}
        animationType="slide"
        onRequestClose={() => setShowOptions(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalOption} onPress={handleRemovePicture}>
              <Text style={styles.modalOptionText}>Remove Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={handleChangePhoto}>
              <Text style={styles.modalOptionText}>Change Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setShowOptions(false)}
            >
              <Text style={styles.modalOptionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles for the ProfileEdit component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
  },
  header: {
    backgroundColor: '#FFA500',
    height: 170,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    top: 50,
    left: 60,
  },
  profilePicContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  form: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 40,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#555',
    marginRight: 8,
  },
  selectedRadioCircle: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
  },
  radioText: {
    fontSize: 16,
    color: '#555',
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#FFA500',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    padding: 20,
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  modalCancel: {
    padding: 15,
  },
});

export default ProfileEdit;
