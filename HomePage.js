import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Easing,
  Pressable,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { auth } from '../firebase'; // Import Firebase auth instance

const HomePage = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false); // State to control sidebar visibility
  const [sidebarSlideAnim] = useState(new Animated.Value(-300)); // Sidebar starts off-screen

  // Toggle the sidebar menu (slide in/out)
  const toggleMenu = () => {
    const toValue = menuVisible ? -300 : 0; // Determine the direction based on current state
    setMenuVisible(!menuVisible); // Toggle menu visibility

    // Animate the sidebar sliding in/out
    Animated.timing(sidebarSlideAnim, {
      toValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  // Close the sidebar menu
  const closeMenu = () => {
    if (menuVisible) {
      // Animate the sidebar to slide out
      Animated.timing(sidebarSlideAnim, {
        toValue: -300,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false)); // Close the menu after animation
    }
  };

  // Navigate to the Profile screen and close the menu
  const handleProfilePress = () => {
    navigation.navigate('Profile');
    closeMenu(); // Close menu after navigation
  };

  // Navigate to the About Us screen and close the menu
  const handleAboutUsPress = () => {
    navigation.navigate('aboutScreen');
    closeMenu(); // Close menu after navigation
  };

  // Navigate to the History screen and close the menu
  const handleHistoryPress = () => {
    navigation.navigate('History');
    closeMenu(); // Close menu after navigation
  };

  // Handle logout process and navigate to the Login screen
  const handleLogoutPress = () => {
    auth
      .signOut() // Log out from Firebase
      .then(() => {
        Alert.alert('Logged Out', 'You have been logged out of the system.');
        navigation.replace('Login'); // Navigate to Login screen
        closeMenu(); // Close the menu after logout
      })
      .catch((error) => {
        Alert.alert('Error', error.message); // Show error alert on failure
      });
  };

  return (
    <Pressable
      style={styles.container}
      onPress={closeMenu} // Close menu when tapping outside
    >
      <View style={styles.header}>
        {/* Button to toggle sidebar menu */}
        <TouchableOpacity onPress={toggleMenu}>
          <FontAwesome name="bars" size={30} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Display logo */}
      <Image
        source={{
          uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/5581c0680d5d0861a64f9f4c6eb766da',
        }}
        style={styles.logo}
      />
      {/* Button to navigate to the Challenges screen */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Challenge')}
      >
        <Text style={styles.buttonText}>Go to Challenges</Text>
      </TouchableOpacity>
      {/* Button to navigate to ProgressTracker screen */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('ProgressTracker')} // Navigate to ProgressTracker
      >
        <Text style={styles.secondaryButtonText}>Track Progress</Text>
      </TouchableOpacity>

      {/* Sidebar/Drawer menu */}
      <Animated.View
        style={[styles.sidebar, { transform: [{ translateX: sidebarSlideAnim }] }]} // Apply sliding animation to the sidebar
      >
        {/* Menu item to navigate to Profile screen */}
        <TouchableOpacity style={styles.menuItem} onPress={handleProfilePress}>
          <FontAwesome name="user" size={20} color="black" />
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        {/* Menu item to navigate to About Us screen */}
        <TouchableOpacity style={styles.menuItem} onPress={handleAboutUsPress}>
          <FontAwesome name="info-circle" size={20} color="black" />
          <Text style={styles.menuText}>About Us</Text>
        </TouchableOpacity>
        {/* Menu item to navigate to History screen */}
        <TouchableOpacity style={styles.menuItem} onPress={handleHistoryPress}>
          <FontAwesome name="history" size={20} color="black" />
          <Text style={styles.menuText}>History</Text>
        </TouchableOpacity>
        {/* Menu item to log out */}
        <TouchableOpacity style={styles.menuItem} onPress={handleLogoutPress}>
          <FontAwesome name="sign-out" size={20} color="black" />
          <Text style={styles.menuText}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>
    </Pressable>
  );
};

// Styles for the HomePage
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
    height: 70,
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#32cd32',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#32cd32',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#32cd32',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: 'white',
    paddingTop: 70,
    paddingLeft: 20,
    zIndex: 100,
    elevation: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'medium',
    padding: 7,
    marginLeft: 10,
  },
});

export default HomePage;
