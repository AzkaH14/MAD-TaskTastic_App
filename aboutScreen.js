import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AboutUs = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Image at the top */}
      <Image
        source={{uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/05acd38d8833549a2378905a110bf21f',}} // Replace with the correct image path or URL
        style={styles.image}
      />
      
      {/* About Us Heading */}
      <Text style={styles.heading}>ABOUT US</Text>

      {/* Content text */}
      <Text style={styles.bodyText}>
        Our app is designed to help you stay motivated and productive every day. We offer a range of productivity tasks, 
        each with its own set of conditions that challenge you to improve in different areas of your life. Whether it's 
        organizing your workspace, planning your day, or reading insightful material related to your field, our app 
        provides the structure you need to stay focused and on track.
      </Text>
      
      <Text style={styles.heading}>Streak System</Text>
      <Text style={styles.bodyText}>
        One of the most powerful features of our app is the streak system. This system keeps you motivated by rewarding 
        your consistency. Every time you complete a challenge, your streak grows, and you can track your progress over time. 
        The more tasks you complete, the more motivated you'll become, leading you to greater personal growth and success. 
        Our goal is to help you build productive habits that last a lifetime, all while maintaining a fun and rewarding experience.
      </Text>

      {/* How to Use the App Section */}
      <Text style={styles.heading}>How to Use the App</Text>
      <View style={styles.stepsContainer}>
        <View style={styles.step}>
          <FontAwesome name="arrow-circle-right" size={24} style={styles.arrow} />
          <Text style={styles.stepText}>1. Create your account and log in to get started.</Text>
        </View>
        <View style={styles.step}>
          <FontAwesome name="arrow-circle-right" size={24}  style={styles.arrow} />
          <Text style={styles.stepText}>2. Choose a productivity challenge that suits your needs.</Text>
        </View>
        <View style={styles.step}>
          <FontAwesome name="arrow-circle-right" size={24}  style={styles.arrow} />
          <Text style={styles.stepText}>3. Complete your daily task and track your progress.</Text>
        </View>
        <View style={styles.step}>
          <FontAwesome name="arrow-circle-right" size={24}  style={styles.arrow} />
          <Text style={styles.stepText}>4. Monitor your streak and stay motivated to continue.</Text>
        </View>
      </View>

      {/* Get Started Motivational Text */}
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>
          Get started with daily productivity and personal growth today! Stay consistent, stay motivated, and watch yourself 
          grow every day.
 </Text>
           <Text style={styles.footerText2}>Thanks for downloading Tasktastic!</Text>
       
      </View>



      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText1}>Contact Us: info@TaskTastic.com</Text>
        <Text style={styles.footerText}>© 2024 TaskTastic. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
    marginBottom: 70,
  },
  stepsContainer: {
    marginVertical: 20,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  arrow: {
    marginRight: 10,
    color:'#32cd32'
  },
  stepText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  
  getStartedText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'semibold',
    marginTop:80,
  },
  footer: {
    padding: 20,
    backgroundColor: 'orange',
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 10,
  },

  footerText1: {
    fontSize: 14,
    color: 'white',
    marginBottom: 10,
    marginTop:70,
  },

  footerText2: {
    fontSize: 18,
    color: '#32cd32',
    marginBottom: 10,
    marginTop:70,
    fontWeight:'bold',
    textAlign:'center'
  },
});

export default AboutUs;