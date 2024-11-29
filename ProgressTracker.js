import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import axios from 'axios';

export default function StreakScreen() {
  // State variables to manage streak data and calendar marked dates
  const [currentStreak, setCurrentStreak] = useState(0); // Holds the current streak value
  const [bestStreak, setBestStreak] = useState(0); // Holds the best streak value
  const [markedDates, setMarkedDates] = useState({}); // Dates marked on the calendar

  const BASE_URL = 'https://tasktastic-d6c10-default-rtdb.firebaseio.com/Streak/T1.json'; // Database URL

  // Function to update streak data on the server
  const updateStreakData = async (current, best, lastUpdated) => {
    try {
      await axios.patch(BASE_URL, {
        Current: current,
        Best: best,
        LastUpdated: lastUpdated,
      });
    } catch (error) {
      console.error('Error updating streak data:', error);
    }
  };

  // Function to fetch streak data from the server
  const fetchStreakData = async () => {
    try {
      const response = await axios.get(BASE_URL);
      if (response.status === 200 && response.data) {
        const data = response.data;

        // Set state with the fetched data
        setCurrentStreak(data.Current || 0);
        setBestStreak(data.Best || 0);

        // Mark the last updated date on the calendar
        const lastUpdated = data.LastUpdated || '';
        if (lastUpdated) {
          setMarkedDates({
            [lastUpdated]: {
              selected: true,
              selectedColor: 'green',
              marked: true,
            },
          });
        }
      }
    } catch (error) {
      console.error('Error fetching streak data:', error);
    }
  };

  // Function to reset the current streak while retaining the best streak
  const resetStreak = async () => {
    const resetCurrent = 0;
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    await updateStreakData(resetCurrent, bestStreak, today);
    setCurrentStreak(resetCurrent);
  };

  // Fetch streak data when the component mounts
  useEffect(() => {
    fetchStreakData();
  }, []);

  // Update best streak if the current streak exceeds the best streak
  useEffect(() => {
    if (currentStreak > bestStreak) {
      const today = new Date().toISOString().split('T')[0];
      setBestStreak(currentStreak);
      updateStreakData(currentStreak, currentStreak, today);
    }
  }, [currentStreak]);

  return (
    <View style={styles.container}>
      {/* Display the current streak */}
      <Text style={styles.header}>🔥 Current Streak: {currentStreak} days</Text>

      {/* Calendar component displaying marked dates */}
      <Calendar
        markingType="multi-dot"
        markedDates={markedDates}
        style={styles.calendar}
        theme={{
          textDisabledColor: '#d3d3d3', // Gray out missed dates
        }}
      />

      {/* Card component to display the best streak */}
      <Card style={styles.card}>
        <Text style={styles.bestStreak}>🏆 Best Streak: {bestStreak} days</Text>
      </Card>

      {/* Button to reset the current streak */}
      <TouchableOpacity onPress={resetStreak} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset Streak</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the StreakScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  calendar: {
    marginBottom: 20,
  },
  card: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  bestStreak: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#32cd32',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
