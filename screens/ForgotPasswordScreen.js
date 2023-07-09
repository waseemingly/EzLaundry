import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, useWindowDimensions, Alert } from 'react-native'
import { auth } from '../firebase'
import * as firebase from "firebase/compat";
import {signInWithEmailAndPasswword, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth'
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";      
import Logo2 from '../assets/password.png';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');

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
    const handleResetPassword = () => {
          auth
        .sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert('Reset Email Sent', 'Please check your email for password reset instructions.');
        })
        .catch((error) => {
          Alert.alert('Error', 'This email is not registered!');
        });


    };
  
    return (
        <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >

      <View style={styles.root}>
        <Image
        source={Logo2}
        style={[styles.logo, {height: height * 0.3}]}
        resizeMode="contain"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
    </View>
       
    <View style={styles.buttonContainer}>   
     
      <TouchableOpacity
          onPress={handleResetPassword}
          style={[styles.button, styles.buttonForgotPassword]}
        >
          <Text style={styles.buttonForgotPasswordText}>Reset Passsword</Text>
        </TouchableOpacity>
    

      </View>
 </KeyboardAvoidingView>
    )
  }

  
  export default ForgotPasswordScreen;
  
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
      paddingHorizontal: 20,
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
      borderRadius:20,
      borderColor: 'pink',
      alignItems: 'center',
    },
    buttonForgotPassword: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: 'pink',
      borderWidth: 2,
    },
    buttonForgotPasswordText: {
      color: 'pink',
      fontWeight: '800',
      fontSize: 20,
  }
  }
  )

