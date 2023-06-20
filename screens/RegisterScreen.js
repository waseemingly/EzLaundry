import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, useWindowDimensions } from 'react-native'
import { auth } from '../firebase'
//import {signInWithEmailAndPasswword, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth'
import * as firebase from "firebase/compat";
import Logo from '../assets/Ezlaundry-icon.png';
import Logo1 from '../assets/booking.png';

const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation();
    
    const {height} = useWindowDimensions()

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          navigation.replace("Home")
        }
      })
  
      return unsubscribe
    }, [])
    const handleRegisterPress = () => {
        auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
    };
  
    return ( 
        <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
  
      <View style={styles.root}>
        <Image
        source={Logo1}
        style={[styles.logo, {height: height * 0.4}]}
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
        <TextInput
          placeholder="Confirm Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
  
      <View style={styles.buttonContainer}>
  
        <TouchableOpacity
          onPress={handleRegisterPress}
          style={[styles.button, styles.buttonRegister]}
        >
          <Text style={styles.buttonRegisterText}>Register</Text>
        </TouchableOpacity>
  
        
      </View>
  </KeyboardAvoidingView>
    )
  }

export default RegisterScreen

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
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
buttonRegister: {
  color: 'white',
  fontWeight: '700',
  fontSize: 16,
},
buttonRegisterText: {
  color: 'pink',
  fontWeight: '700',
  fontSize: 16,
}
}
)