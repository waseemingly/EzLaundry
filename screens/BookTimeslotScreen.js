import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc, getDocs, updateDoc, doc, setDoc, query, where, getDoc, Timestamp } from 'firebase/firestore';
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
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  // Find the index of the next available time slot
  let startIndex = currentHour + 1; // Subtract 1 since array indices start from 0

  // Create a new array with the updated order of times

  // Create a new array with the updated order of times
  const updatedTimes = [...times.slice(startIndex), ...times.slice(0, startIndex)];

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
        const selectedResidenceName = residences.find(residence => residence.id === selectedResidence)?.name || '';

        // Convert selectedDate to a Timestamp object
        const selectedDateTimestamp = Timestamp.fromDate(selectedDate);
        // const selectedTimeTimestamp = Timestamp.fromDate(selectedTime);

        const bookingData = {
          selectedResidence: selectedResidenceName,
          selectedDate: selectedDateTimestamp, // Store selectedDate as a Timestamp
          selectedTime,
          machine,
          bookingId: '', // Placeholder for the booking ID
          userId: auth.currentUser?.uid || '', // Add the user ID to the booking data
          userEmail: auth.currentUser?.email || ''
        };

        // Check if the user has already made three bookings
        const currentUserBookingsRef = collection(db, 'bookings');
        const currentUserBookingsQuery = query(currentUserBookingsRef, where('userId', '==', bookingData.userId));
        const currentUserBookingsSnapshot = await getDocs(currentUserBookingsQuery);
        const currentUserBookingsCount = currentUserBookingsSnapshot.size;

        if (currentUserBookingsCount >= 3) {
          Alert.alert(
            'Booking Limit Exceeded',
            'You have already made the maximum number of bookings allowed.'
          );
          return;
        }

        // Check if the selected timeslot is already booked for any user
        const existingBookingQuery = query(collection(db, 'bookings'),
          where('selectedResidence', '==', selectedResidenceName),
          where('selectedDate', '==', selectedDateTimestamp), // Use the Timestamp object for comparison
          where('selectedTime', '==', selectedTime),
          where('machine', '==', machine)
        );
        const existingBookingSnapshot = await getDocs(existingBookingQuery);

        if (!existingBookingSnapshot.empty) {
          Alert.alert(
            'Booking Already Exists',
            'The selected booking slot is already taken. Please choose a different one.'
          );
          return;
        }

        const bookingDocRef = await addDoc(collection(db, 'bookings'), bookingData);
        await updateDoc(bookingDocRef, { bookingId: bookingDocRef.id });

        navigation.navigate('My Bookings', {
          selectedResidence,
          selectedDate,
          selectedTime,
          selectedMachine: machine,
          bookingId: bookingDocRef.id,
        });
      } catch (error) {
        console.error('Error storing booking data:', error);
        // Handle the error
      }
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Residence</Text>
      <View style={styles.searchContainer}>
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
      </View>

      <Text style={styles.title}>Select Date</Text>
      <Text style={styles.selectedText}>
        {route.params && route.params.selectedDate}
      </Text>

      <HorizontalDatepicker
        mode="gregorian"
        startDate={(function () {
          const startDate = new Date();
          const currentHour = startDate.getHours();
          const currentMinute = startDate.getMinutes();

          if (currentHour === 23 && currentMinute >= 0) {
            startDate.setDate(startDate.getDate() + 1);
          }

          return startDate;
        })()}
        endDate={(function () {
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

      {/* <HorizontalDatepicker
        mode="gregorian"
        startDate={(function () {
          const startDate = new Date();
          startDate.setDate(startDate.getDate() - 1);
          return startDate;
        })()}
        endDate={(function () {
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
      /> */}

      <Text style={styles.title}>Select Time</Text>
      <Text style={styles.selectedText}>
        {route.params && route.params.selectedTime}
      </Text>

      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
      </ScrollView> */}

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {updatedTimes.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedTime(item.time)}
            style={
              selectedTime.includes(item.time)
                ? {
                  ...styles.timeSlot,
                  backgroundColor: 'pink',
                  borderColor: 'red',
                }
                : styles.timeSlot
            }
          >
            <Text style={styles.timeSlotText}>{item.time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.title}>Select Washing Machine</Text>
      <Text style={styles.selectedText}>
        {route.params && route.params.selectedMachine}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {washingMachine.map((item, i) => (
          <TouchableOpacity
            style={
              machine.includes(item.name)
                ? {
                  ...styles.machineButton,
                  backgroundColor: 'pink',
                  borderColor: 'red',
                }
                : styles.machineButton
            }
            onPress={() => setMachine(item.name)}
            key={i}
          >
            <Text style={styles.machineButtonText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.confirmButton} onPress={proceedToConfirm}>
        <Text style={styles.confirmButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 1,
    color: '#000',
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 1,
    textDecorationLine: 'underline',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    color: '#333',
  },
  selectedText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#088F8F',
    marginBottom: 10,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  timeSlot: {
    margin: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeSlotText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  machineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  machineButton: {
    margin: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  machineButtonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#FF5E7D',
    marginTop: 10,
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});


export default BookTimeslotScreen;

