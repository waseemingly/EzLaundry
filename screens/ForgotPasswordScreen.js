/*import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, useWindowDimensions, Alert } from 'react-native'
import { auth } from '../firebase'
import * as firebase from "firebase/compat";
import {signInWithEmailAndPasswword, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth'
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";      


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
          Alert.alert('Error', error.message);
        });


    };
  
    return (
        <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={text => setEmail(text)}
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
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
  buttonForgotPassword: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonForgotPasswordText: {
    color: 'pink',
    fontWeight: '700',
    fontSize: 16,
  }
  }
  )
*/
