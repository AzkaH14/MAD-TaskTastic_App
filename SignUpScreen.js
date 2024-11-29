import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function SignUpScreen({ navigation }) {
  // Handles the sign-up logic with Firebase authentication
  const handleSignUp = async (values, setSubmitting, setErrors) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredentials.user;
      console.log('Registered with:', user.email);
      alert('Account created successfully');

      // Navigate to the Home screen and reset the navigation stack
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      // Handle Firebase-specific errors
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ email: 'The email address is already in use. Please use a different email.' });
      } else {
        alert(error.message);
      }
    } finally {
      setSubmitting(false); // End loading state
    }
  };

  // Validation schema for the form using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().trim().required('Username is required'),
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  return (
    <View style={styles.container}>
      {/* Display app logo */}
      <Image
        source={{
          uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/731a1076c9bdac05ca43e45af23e2ba5',
        }}
        style={styles.logo}
      />

      {/* Screen heading */}
      <Text style={styles.heading}>Create your account</Text>

      {/* Formik to manage form state and validation */}
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setErrors }) =>
          handleSignUp(values, setSubmitting, setErrors)
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <>
            {/* Username Input */}
            <TextInput
              style={[styles.input, touched.username && errors.username ? styles.inputError : null]}
              placeholder="Username"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
            />
            {touched.username && errors.username ? (
              <Text style={styles.errorText}>{errors.username}</Text>
            ) : null}

            {/* Email Input */}
            <TextInput
              style={[styles.input, touched.email && errors.email ? styles.inputError : null]}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            {touched.email && errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}

            {/* Password Input */}
            <TextInput
              style={[styles.input, touched.password && errors.password ? styles.inputError : null]}
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            {touched.password && errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}

            {/* Sign Up Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </Formik>

      {/* Link to Login Screen */}
      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </Text>
    </View>
  );
}

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 6,
  },
  heading: {
    marginBottom: 30,
    fontSize: 13,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputError: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: '#32cd32',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#333',
  },
  link: {
    color: '#33cccc',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});
