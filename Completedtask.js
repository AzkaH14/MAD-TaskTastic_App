import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CompletedTask({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="arrow-back" size={24} color="gray" />
      </TouchableOpacity>

      {/* Centered Image */}
      <Image
        source={{
          uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/4c73faa7e07e3f2eadfe25c5d4de5d4f',
        }}
        style={styles.image}
      />

      {/* Text Below Image */}
      <Text style={styles.text}>Today's tasks completed!</Text>

      {/* Done Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>

      {/* View Challenge History Button */}
      <View styles={{flexDirection:'row'}}>
      <TouchableOpacity
        style={styles.button1}
        onPress={() => navigation.navigate('History')}
      >
        <Text style={styles.buttonText1}>View Challenge History</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  text: {
    color: 'gray',
    fontSize: 20,
    fontWeight: 'semibold',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#32cd32',
    paddingVertical: 15,
    paddingHorizontal: 120,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 80,
    
  },
  button1: {
    backgroundColor: '#32cd32',
    paddingVertical: 15,
    paddingHorizontal: 55,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 35,
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  buttonText1: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: -5,
  },
});
