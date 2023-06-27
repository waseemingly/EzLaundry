
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, useWindowDimensions } from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import Logo from '../assets/Ezlaundry-icon.png';
import Logo1 from '../assets/booking.png';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  const { height } = useWindowDimensions();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          setErrorMessage('Email does not have an account. Please sign up.');
        } else if (error.code === 'auth/wrong-password') {
          setErrorMessage('Wrong password for the registered email.');
        } else {
          setErrorMessage(error.message);
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.4 }]}
          resizeMode="contain"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}

        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, styles.buttonlogin]}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          title='Register Details'
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Forgot Password')}
          style={[styles.button, styles.buttonforgot]}
        >
          <Text style={styles.buttonforgotText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    borderRadius: 20,
    borderColor: 'pink',
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'pink',
    borderWidth: 2,
  },
  buttonText: {
    color: 'pink',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonlogin: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'pink',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: 'pink',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonforgot: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'pink',
    borderWidth: 2,
  },
  buttonforgotText: {
    color: 'pink',
    fontWeight: '700',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  }
});


