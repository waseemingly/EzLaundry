import { StatusBar } from 'expo-status-bar';
import React from 'react';
import App from "./App";
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
//import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// "project" is the name of the main react-native Folder
// the second argument is an arrow function returning
// App, which is imported above
// runApplication() loads the javascript bundle 
// and runs the app.
/*AppRegistry.registerComponent("ezlaundry", () => App);
  
AppRegistry.runApplication("ezlaundry", {
    rootTag: document.getElementById("root")
});
*/
const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen}/>
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
