import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  Alert
} from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc, getDocs, updateDoc, doc, setDoc, query, where, getDoc} from 'firebase/firestore';
import { auth, db } from '../firebase'; // Assuming you have already initialized Firebase and obtained the Firestore instance
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const residences = [
  {
    id: "0",
    name: "Eusoff Hall",
  },
  {
    id: "1",
    name: "Kent Ridge Hall",
  },
  {
    id: "2",
    name: "King Edward VII Hall",
  },
  {
    id: "3",
    name: "Raffles Hall",
  },
  {
    id: "4",
    name: "Sheares Hall",
  },
  {
    id: "5",
    name: "Temasek Hall",
  },
];

const BookTimeslotScreen = () => {
  const [selectedResidence, setSelectedResidence] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [machine, setMachine] = useState([]);
  const route = useRoute();
  const userUid = auth.currentUser ? auth.currentUser.uid : null;
  const washingMachine = [
    {
      id: "0",
      name: "A",
    },
    {
      id: "1",
      name: "B",
    },
    {
      id: "2",
      name: "C",
    },
  ];
  const times = [
    {
      id: "0",
      time: "12:00 AM",
    },
    {
      id: "1",
      time: "1:00 AM",
    },
    {
      id: "2",
      time: "2:00 AM",
    },
    {
      id: "2",
      time: "3:00 AM",
    },
    {
      id: "4",
      time: "4:00 AM",
    },
    {
      id: "5",
      time: "5:00 AM",
    },
    {
      id: "6",
      time: "6:00 AM",
    },
    {
      id: "7",
      time: "7:00 AM",
    },
    {
      id: "8",
      time: "8:00 AM",
    },
    {
      id: "9",
      time: "9:00 AM",
    },
    {
      id: "10",
      time: "10:00 AM",
    },
    {
      id: "11",
      time: "11:00 AM",
    },
    {
      id: "12",
      time: "12:00 PM",
    },
    {
      id: "13",
      time: "1:00 PM",
    },
    {
      id: "14",
      time: "2:00 PM",
    },
    {
      id: "15",
      time: "3:00 PM",
    },
    {
      id: "16",
      time: "4:00 PM",
    },
    {
      id: "17",
      time: "5:00 PM",
    },
    {
      id: "18",
      time: "6:00 PM",
    },
    {
      id: "19",
      time: "7:00 PM",
    },
    {
      id: "20",
      time: "8:00 PM",
    },
    {
      id: "21",
      time: "9:00 PM",
    },
    {
      id: "22",
      time: "10:00 PM",
    },
    {
      id: "23",
      time: "11:00 PM",
    },
  ];

  const navigation = useNavigation();
  // const proceedToConfirm = async () => {
  //   if (!selectedDate || !selectedTime || !machine || !selectedResidence) {
  //     Alert.alert(
  //       "Invalid Booking",
  //       "Please select all the fields",
  //       [
  //         {
  //           text: "Cancel",
  //           onPress: () => console.log("Cancel Pressed"),
  //           style: "cancel"
  //         },
  //         { text: "OK", onPress: () => console.log("OK Pressed") }
  //       ],
  //       { cancelable: false }
  //     );
  //   } 
  //   if (selectedDate && selectedTime && machine && selectedResidence) {
  //     navigation.navigate("My Bookings", {
  //       selectedResidence: selectedResidence,
  //       selectedDate: selectedDate,
  //       selectedTime: selectedTime,
  //       selectedMachine: machine,
  //       email: auth.currentUser?.email || '',
  //     }
  //     )

      
  //     try {
  //       const userEmail = auth.currentUser?.email || '';
  //       const selectedResidenceName = residences.find(residence => residence.id === selectedResidence)?.name || '';
      
  //       const bookingData = {
  //         selectedResidence: selectedResidenceName,
  //         selectedDate,
  //         selectedTime,
  //         machine,
  //         bookingId: '', // Placeholder for the booking ID
  //       };
      
  //       const userBookingsRef = collection(db, 'users', userEmail, 'bookings');
      
  //       const bookingDocRef = await addDoc(userBookingsRef, bookingData);
        
  //       // Update the booking document with the generated ID
  //       await updateDoc(bookingDocRef, { bookingId: bookingDocRef.id });
      
  //       navigation.navigate('My Bookings', {
  //         selectedResidence,
  //         selectedDate,
  //         selectedTime,
  //         selectedMachine: machine,
  //         bookingId: bookingDocRef.id,
  //         userEmail: auth.currentUser?.email || '',
  //       });
  //     } 
      
  //     catch (error) {
  //       console.error('Error storing booking data:', error);
  //       // Handle the error
  //     }
  //   }
  // }

  const proceedToConfirm = async () => {
    if (!selectedDate || !selectedTime || !machine || !selectedResidence) {
      Alert.alert(
        "Invalid Booking",
        "Please select all the fields",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    } else {
      try {
        const userEmail = auth.currentUser?.email || '';
        const selectedResidenceName = residences.find(residence => residence.id === selectedResidence)?.name || '';
  
        const bookingData = {
          selectedResidence: selectedResidenceName,
          selectedDate,
          selectedTime,
          machine,
          bookingId: '', // Placeholder for the booking ID
        };
       
      const usersCollectionRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollectionRef);

      let bookingExists = false;

      for (const userDoc of usersSnapshot.docs) {
        const bookingsCollectionRef = collection(userDoc.ref, 'bookings');
        const bookingsQuery = query(bookingsCollectionRef,
          where('selectedResidence', '==', selectedResidenceName),
          where('selectedDate', '==', selectedDate),
          where('selectedTime', '==', selectedTime),
          where('machine', '==', machine)
        );

        const bookingsSnapshot = await getDocs(bookingsQuery);

        if (!bookingsSnapshot.empty) {
          bookingExists = true;
          break;
        }
      }

      if (bookingExists) {
        Alert.alert(
          'Booking Already Exists',
          'The selected booking slot is already taken. Please choose a different one.'
        );
      } else {
        const currentUserBookingsRef = collection(db, 'users', userEmail, 'bookings');
        const currentUserBookingsQuery = query(currentUserBookingsRef,
          where('selectedResidence', '==', selectedResidenceName),
          where('selectedDate', '==', selectedDate),
          where('selectedTime', '==', selectedTime),
          where('machine', '==', machine)
        );

        const currentUserBookingsSnapshot = await getDocs(currentUserBookingsQuery);

        if (!currentUserBookingsSnapshot.empty) {
          bookingExists = true;
        }

        if (bookingExists) {
          Alert.alert(
            'Booking Already Exists',
            'You have already booked the selected slot. Please choose a different one.'
          );
        } else {
          const userBookingsRef = collection(db, 'users', userEmail, 'bookings');
          const bookingDocRef = await addDoc(userBookingsRef, bookingData);
          await updateDoc(bookingDocRef, { bookingId: bookingDocRef.id });

          navigation.navigate('My Bookings', {
            selectedResidence,
            selectedDate,
            selectedTime,
            selectedMachine: machine,
            bookingId: bookingDocRef.id,
            userEmail: auth.currentUser?.email || '',
          });
        }
      }
    } catch (error) {
      console.error('Error storing booking data:', error);
      // Handle the error
    }
  }
};
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
        Select Residence
      </Text>
      <View
        style={styles.searchContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedResidence}
          onValueChange={setSelectedResidence}
        >
          <Picker.Item label="Select Residence" value="" />
          {residences.map(({ id, name }) => (
            <Picker.Item key={id} label={name} value={id} />
          ))}
        </Picker>

        {/* <Feather name="search" size={24} color="#fd5c63" /> */}
      </View>

      <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
        Select Date
      </Text>

      <Text style={{
        fontSize: 18, fontWeight: "400", color: "#088F8F",
      }}
      >
        {route.params && route.params.selectedDate}
      </Text>

      <HorizontalDatepicker
        mode="gregorian"
        startDate={new Date()}
        endDate={(function() {
          const endDate = new Date();
          endDate.setDate(endDate.getDate() + 7);
          return endDate;
        })()}
        initialSelectedDate={null}
        onSelectedDateChange={(date) => setSelectedDate(date)}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={10}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        unselectedItemTextStyle={styles.selectedItemTextStyle}
        selectedItemBackgroundColor="#222831"
        unselectedItemBackgroundColor="#ececec"
        flatListContainerStyle={styles.flatListContainerStyle}
      />

      <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
        Select Time
      </Text>

      <Text style={{
        fontSize: 18, fontWeight: "400", color: "#088F8F",
      }}
      >
        {route.params && route.params.selectedTime}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {times.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedTime(item.time)}
            style={
              selectedTime.includes(item.time)
                ? {
                  margin: 10,
                  borderRadius: 7,
                  padding: 15,
                  borderColor: "red",
                  borderWidth: 0.7,
                }
                : {
                  margin: 10,
                  borderRadius: 7,
                  padding: 15,
                  borderColor: "gray",
                  borderWidth: 0.7,
                }
            }
          >
            <Text>{item.time}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
        Select Washing Machine
      </Text>

      <Text style={{
        fontSize: 18, fontWeight: "400", color: "#088F8F",
      }}
      >
        {route.params && route.params.selectedMachine}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {washingMachine.map((item, i) => (
          <Pressable
            style={
              machine.includes(item.name)
                ? {
                  margin: 10,
                  borderRadius: 7,
                  padding: 15,
                  borderColor: "red",
                  borderWidth: 0.7,
                }
                : {
                  margin: 10,
                  borderRadius: 7,
                  padding: 15,
                  borderColor: "gray",
                  borderWidth: 0.7,
                }
            }
            onPress={() => setMachine(item.name)}
            key={i}
          >
            <Text>{item.name}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable
        style={{
          backgroundColor: "pink",
          marginTop: 10,
          padding: 20,
          marginBottom: 50,
          margin: 80,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          alignSelf: "flex-end",
          width: "60%"
        }}
      >


        <Pressable onPress={proceedToConfirm}>
          <Text style={{
            fontSize: 17,
            fontWeight: "600",
            color: "white",
            textAlign: "center",
            marginLeft: 30
          }}>
            Confirm Booking
          </Text>

        </Pressable>
      </Pressable>
    </SafeAreaView>
  );
};

export default BookTimeslotScreen;

const styles = StyleSheet.create({});