import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function GetStarted({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/731a1076c9bdac05ca43e45af23e2ba5',
        }}
      />
      <Text style={styles.title}>Let's get started to make our day tasktastic!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'SignUp' }],
          })
        }
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#32cd32',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#32cd32',
    paddingVertical: 15,
    paddingHorizontal: 90,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 290,
    height: 250,
  },
});
