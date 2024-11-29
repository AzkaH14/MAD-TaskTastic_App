import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { useFonts, RockSalt_400Regular } from '@expo-google-fonts/rock-salt';
import { Lobster_400Regular } from '@expo-google-fonts/lobster';
import AppLoading from 'expo-app-loading';

const StreakScreen = ({ route, navigation }) => {
  // State to track the current streak count
  const [streakCount, setStreakCount] = useState(0);

  // Animated value to handle the position of the fire emoji
  const firePosition = useRef(new Animated.Value(100)).current;

  // Load custom fonts for the app
  let [fontsLoaded] = useFonts({
    RockSalt: RockSalt_400Regular,
    Lobster: Lobster_400Regular,
  });

  useEffect(() => {
    // Set the streak count from route parameters if provided
    if (route.params?.streak !== undefined) {
      setStreakCount(route.params.streak);
    }

    // Disable the back button in the navigation header
    navigation.setOptions({ headerLeft: null });

    // Start the fire emoji animation
    Animated.timing(firePosition, {
      toValue: 0, // Move fire emoji into view
      duration: 1000, // Duration of animation
      useNativeDriver: true, // Optimize animation performance
    }).start();
  }, [route.params?.streak, navigation]);

  // Show loading screen until fonts are fully loaded
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Handle navigation to the "Completedtask" screen
  const handleDonePress = () => {
    navigation.navigate('Completedtask');
  };

  return (
    <View style={styles.container}>
      {/* Display congratulatory text */}
      <Text style={styles.bravoText}>Bravo!</Text>

      {/* Animated fire emoji */}
      <Animated.Text style={[styles.fireEmoji, { transform: [{ translateY: firePosition }] }]}>
        🔥
      </Animated.Text>

      {/* Display current streak count */}
      <Text style={styles.streakText}>Day {streakCount}</Text>

      {/* Display an owl image */}
      <Image
        source={{
          uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0597007e239477d8847fa00fe211f37c',
        }}
        style={styles.owlImage}
      />

      {/* Button to proceed to the next screen */}
      <TouchableOpacity style={styles.doneButton} onPress={handleDonePress}>
        <Text style={styles.doneButtonText}>Get Going</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a674c1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bravoText: {
    fontSize: 50,
    fontFamily: 'RockSalt',
    color: 'white',
    marginBottom: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
  fireEmoji: {
    fontSize: 80,
    marginBottom: 10,
  },
  streakText: {
    fontSize: 45,
    fontFamily: 'Lobster',
    color: 'yellow',
    textAlign: 'center',
    marginBottom: 50,
  },
  owlImage: {
    bottom: -10,
    left: -50,
    width: 250,
    height: 250,
  },
  doneButton: {
    backgroundColor: 'orange',
    paddingVertical: 12,
    borderRadius: 10,
    width: '40%',
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    marginTop: 5,
    right: 30,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default StreakScreen;
