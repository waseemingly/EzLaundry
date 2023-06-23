import { StatusBar } from 'expo-status-bar';
import React from 'react';
//import App from "./App";
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import BookTimeslotScreen from './screens/BookTimeslotScreen';
import ConfirmBookingScreen from './screens/ConfirmBookingScreen';



const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen}/>
        <Stack.Screen name="Book Timeslot" component={BookTimeslotScreen}/>
        <Stack.Screen name="Confirm Booking" component={ConfirmBookingScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
