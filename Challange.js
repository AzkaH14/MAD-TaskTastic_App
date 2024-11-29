import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Checkbox from 'expo-checkbox';
import axios from 'axios';

const Challenge = ({ navigation, route }) => {
  const tasks = [
    "Organize your workspace or desk",
    "Spend 10 minutes planning tasks for tomorrow",
    "Read 10 pages of a book or an article related to your field",
    "Drink a glass of water and take a 5-minute walk",
    "Write down three things you're grateful for",
    "Take 10 deep breaths to relax",
    "Do 10 minutes of light exercise",
    "Review your progress on personal goals",
    "Spend 15 minutes decluttering your digital files",
  ];

  const icons = [
    'desktop',
    'calendar',
    'book',
    'coffee',
    'pencil',
    'medkit',
    'heartbeat',
    'pie-chart',
    'file-text',
  ];

  const [checkedTasks, setCheckedTasks] = useState(new Array(tasks.length).fill(false));
  const [streak, setStreak] = useState(0); // Start from 0 initially

  const BASE_URL = 'https://tasktastic-d6c10-default-rtdb.firebaseio.com/';

  // Fetch streak data from the database on component mount
  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const response = await axios.get(`${BASE_URL}Streak/T1.json`);
        if (response.data?.Current !== undefined) {
          setStreak(response.data.Current);
        }
      } catch (error) {
        console.error('Error fetching streak:', error);
      }
    };

    fetchStreak();
  }, []);

  const toggleCheckbox = async (index) => {
    const updatedCheckedTasks = [...checkedTasks];
    updatedCheckedTasks[index] = !updatedCheckedTasks[index];
    setCheckedTasks(updatedCheckedTasks);

    const todayDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const task = tasks[index];

    try {
      if (updatedCheckedTasks[index]) {
        // Add completed task to Firebase
        await axios.post(`${BASE_URL}CompletedChallenges/${todayDate}.json`, { task });
      } else {
        console.log(`Task "${task}" unchecked. Optionally handle removal.`);
      }
    } catch (error) {
      console.error('Error updating task in Firebase:', error);
    }
  };

  const handleCompletePress = async () => {
    const checkedCount = checkedTasks.filter(Boolean).length;
    if (checkedCount >= 6) {
      Alert.alert("Congratulations!", "You've completed your challenges!");
      const updatedStreak = streak + 1;
      setStreak(updatedStreak);
      await updateStreakInDatabase(updatedStreak);
      navigation.navigate('Streak', { streak: updatedStreak }); // Pass updated streak to Streak screen
    } else {
      Alert.alert("Incomplete", "Please complete at least 6 tasks to proceed.");
    }
  };

  const updateStreakInDatabase = async (newStreak) => {
    try {
      await axios.patch(`${BASE_URL}Streak/T1.json`, {
        Current: newStreak,
      });
      console.log('Streak updated successfully in Firebase');
    } catch (error) {
      console.error('Error updating streak in Firebase:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.streakContainer}>
        <Text style={styles.streakText}>🔥 Streak: {streak}</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {tasks.map((task, index) => (
          <View key={index} style={styles.taskItem}>
            <Checkbox
              value={checkedTasks[index]}
              onValueChange={() => toggleCheckbox(index)}
              color={checkedTasks[index] ? '#4CAF50' : undefined}
            />
            <Text style={styles.taskText}>{task}</Text>
            <FontAwesome
              name={icons[index]}
              size={24}
              color={checkedTasks[index] ? 'orange' : '#B0BEC5'}
            />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, checkedTasks.filter(Boolean).length >= 6 ? styles.buttonActive : styles.buttonDisabled]}
        onPress={handleCompletePress}
        disabled={checkedTasks.filter(Boolean).length < 6}
      >
        <Text style={styles.buttonText}>Completed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 15,
  },
  streakText: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'medium',
    marginBottom: 50,
  },
  scrollContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: -25,
  },
  taskItem: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginLeft: 10,
  },
  button: {
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#4CAF50',
  },
  buttonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Challenge;
