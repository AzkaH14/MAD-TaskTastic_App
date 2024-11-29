import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function LoginScreen({ navigation }) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }], // Reset navigation stack to the Home screen
        });
      }
    });
    return unsubscribe;
  }, [navigation]);

  const handleLogin = async (values, setSubmitting, setErrors) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredentials.user;
      console.log('Logged in with:', user.email);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setErrors({ email: 'Invalid email or password' });
      } else {
        alert(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/731a1076c9bdac05ca43e45af23e2ba5',
        }}
        style={styles.logo}
      />
      <Text style={styles.heading}>Log in to your account!</Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setErrors }) =>
          handleLogin(values, setSubmitting, setErrors)
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <>
            <TextInput
              style={[styles.input, touched.email && errors.email ? styles.inputError : null]}
              placeholder="Enter Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            {touched.email && errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}

            <TextInput
              style={[styles.input, touched.password && errors.password ? styles.inputError : null]}
              placeholder="Enter Password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            {touched.password && errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('SignUp')}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
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