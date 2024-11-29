import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState([]); // State to store history data
  const [error, setError] = useState(null); // State to store error messages

  const BASE_URL = 'https://tasktastic-d6c10-default-rtdb.firebaseio.com/CompletedChallenges.json'; // Firebase URL to fetch completed challenges

  // Fetch history when the component mounts
  useEffect(() => {
    fetchHistory();
  }, []);

  // Function to fetch history from Firebase
  const fetchHistory = async () => {
    try {
      const response = await axios.get(BASE_URL); // Fetch data from Firebase

      if (response.data) {
        // Transform the data into a readable format
        const data = Object.entries(response.data).flatMap(([date, tasks]) =>
          Object.entries(tasks).map(([taskId, taskData]) => ({
            date,
            task: taskData.task, // Extract task information for display
          }))
        );
        setHistory(data); // Update the state with the fetched history
      } else {
        setHistory([]); // No data, set an empty history
      }
    } catch (error) {
      // Handle any errors during the fetch operation
      setError('Error fetching history. Please try again.');
      console.error('Error fetching history:', error);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Show error message if there's an error fetching the history */}
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      {/* Scrollable view to display the history items */}
      <ScrollView style={styles.scrollView}>
        {/* Display a message if there are no completed challenges */}
        {history.length === 0 ? (
          <Text style={styles.emptyText}>No challenges completed yet.</Text>
        ) : (
          // Map through the history array and display each task
          history.map((item, index) => (
            <View key={index} style={styles.historyItem}>
              <Text style={styles.text}>
                {/* Display the date and task */}
                <Text style={styles.date}>{item.date}: </Text>
                {item.task}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  historyItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
  date: {
    fontWeight: 'bold',
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
  },
});

export default History;
