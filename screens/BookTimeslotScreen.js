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
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming you have already initialized Firebase and obtained the Firestore instance
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';


const BookTimeslotScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [machine, setMachine] = useState([]);
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
  const proceedToConfirm = () => {
      if(!selectedDate || !selectedTime || !machine ){
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
      }
      if(selectedDate && selectedTime && machine){
        navigation.navigate("Confirm Booking",{
            pickUpDate:selectedDate,
            selectedTime:selectedTime,
            no_Of_days:machine,

        })
      }
  }

  // const bookTimeslot = async () => {
  //   // Perform the booking logic here
  //   // Retrieve the selected date, time, and machine from state variables

  //   try {
  //     // Create a new document in the "bookingSlots" collection
  //     const docRef = await addDoc(collection(db, 'bookingSlots'), {
  //       selectedDate,
  //       selectedTime,
  //       machine,
  //       taken: false, // Initialize the "taken" property as false
  //     });

  //     // Print the ID of the newly created document
  //     console.log('Booking document created with ID:', docRef.id);
  //   } catch (error) {
  //     console.error('Error creating booking document:', error);
  //   }
  // };

  // useEffect(() => {
  //   const fetchBookingSlots = async () => {
  //     try {
  //       // Retrieve all the booking slots from Firestore
  //       const querySnapshot = await getDocs(collection(db, 'bookingSlots'));

  //       // Loop through the documents and update the state or availability of each timeslot
  //       querySnapshot.forEach((doc) => {
  //         const { selectedTime, taken } = doc.data();

  //         // Update the state or availability of the timeslot based on the "taken" property
  //         // For example, you can modify the "times" array to include the "taken" property
  //         const updatedTimes = times.map((time) =>
  //           time.time === selectedTime ? { ...time, taken } : time
  //         );

  //         // Update the state with the modified times array
  //         setTimes(updatedTimes);
  //       });
  //     } catch (error) {
  //       console.error('Error fetching booking slots:', error);
  //     }
  //   };

  //   // Call the fetchBookingSlots function when the component mounts
  //   fetchBookingSlots();
  // }, []);

  return (
    <SafeAreaView>
      <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
            borderRadius: 7,
          }}
        >
          <TextInput placeholder="Search for your residence" />
          <Feather name="search" size={24} color="#fd5c63" />
        </View>

      <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
        Select Date
      </Text>

      <HorizontalDatepicker
        mode="gregorian"
        startDate={new Date('2023-06-23')}
        endDate={new Date('2023-06-30')}
        initialSelectedDate={new Date('2020-08-22')}
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
          marginTop: 200,
          padding: 10,
          marginBottom: 40,
          margin: 15,
          borderRadius: 7,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          alignSelf: "flex-end",
          width: "90%"
        }}
      >
        <View>
          <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "700",
              color: "white",
              marginVertical: 7,
              marginHorizontal: 60
            }}
          >
              {/* Confirm Booking */}
          </Text>
        </View>

        <Pressable onPress={proceedToConfirm}>
          <Text style={{ fontSize: 17, fontWeight: "600", color: "white", marginVertical: 7, marginHorizontal: "5%", textAlign: "center"}}>
            Confirm Booking
          </Text>
        </Pressable>
      </Pressable>
    </SafeAreaView>
  );
};

export default BookTimeslotScreen;

const styles = StyleSheet.create({});