import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, useWindowDimensions } from 'react-native'
//import {signInWithEmailAndPasswword, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth'
//import * as firebase from "firebase/compat";
//import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import Logo1 from '../assets/register.png';
//import { auth, firestore } from '../firebase';
import { auth, db, createUserWithEmailAndPassword, sendEmailVerification } from '../firebase';
import { setDoc,doc } from 'firebase/firestore';


const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')

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

      if (password !== confirmpassword) {
        alert("Passwords don't match");
        return;
      }

      auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          const uid = auth.currentUser.uid;
          console.log('Registered with:', user.email);

          setDoc(doc(db,"users",`${uid}`),{
              email: user.email
          })
        })
    }; 

    const handleRegisterPress1 = () => {
      if (!email.endsWith('@nus.edu.sg') && !email.endsWith('@u.nus.edu')) {
        alert('Please register with an NUS email.');
        return;
      }
    
      if (password !== confirmpassword) {
        alert("Passwords don't match");
        return;
      }
    
      auth.
      createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          const user = userCredential.user;
          if (email.endsWith('@nus.edu.sg') || email.endsWith('@u.nus.edu')) {
            sendEmailVerification(auth.currentUser).then(() => {
              console.log('Verification email sent to:', user.email);
            });
          }
          const uid = auth.currentUser.uid;
          console.log('Registered with:', user.email);
          setDoc(doc(db, 'users', `${uid}`), {
            email: user.email,
          });
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
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
          placeholder="New Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmpassword}
          onChangeText={text => setConfirmPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
  
      <View style={styles.buttonContainer}>
  
        <TouchableOpacity
          onPress={handleRegisterPress1}
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 20,
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
    padding:20,
    borderRadius:20,
    borderColor: 'pink',
    alignItems: 'center',
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