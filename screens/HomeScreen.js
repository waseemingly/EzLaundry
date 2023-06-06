import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Button, useWindowDimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { auth } from '../firebase'
import booking from '../assets/booking.png';
import authenticate from '../assets/authenticate.png';
import cancel from '../assets/Cancel.png';
import penalties from '../assets/penalties.png';
import signout from '../assets/signout.png';
//hellobbbbbgit
//lol

const HomeScreen = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  const {height} = useWindowDimensions()

  return (
    <View style={styles.container}>
     <Text>Logged in by: {auth.currentUser?.email}</Text> 
     
     <TouchableOpacity
      style={styles.button}>
        <Image
        style={{width: 90, height: 40}}
        source={booking}
        resizeMode="cover"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}>
        <Image
        style={{width: 90, height: 40}}
        source={authenticate}
        resizeMode="cover"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}>
        <Image
        style={{width: 90, height: 40}}
        source={cancel}
        resizeMode="cover"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}>
        <Image
        style={{width: 90, height: 40}}
        source={penalties}
        resizeMode="cover"
        />
      </TouchableOpacity>
      

      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}>
        <Image
        style={{width: 90, height: 40}}
        source={signout}
        resizeMode="cover"
        /> 
        {/* <Text style={styles.buttonText}>Sign out</Text> */}
      </TouchableOpacity>

      
  
      
    </View>

  )
}  

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   button: {
    backgroundColor: 'white',
    width: '30%',
    height: '10%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})
