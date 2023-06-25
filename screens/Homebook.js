import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, route, navigation } from "@react-navigation/native";
import { collection, addDoc, getDocs, updateDoc, doc, setDoc, getDoc, query, where, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Homebook = () => {
  const [bookings, setBookings] = useState([]);
  const navigation = useNavigation();
  // const { bookingId } = route.params;
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const userEmail = auth.currentUser.email;
        const bookingsQuery = query(collection(db, 'users'), where('userEmail', '==', userEmail));
        const bookingsSnapshot = await getDocs(bookingsQuery);
        const bookingsData = [];
        bookingsSnapshot.forEach((doc) => {
          bookingsData.push(doc.data());
        });
        setBookings(bookingsData);
      } catch (error) {
        console.log('Error fetching booking data:', error);
      }
    };

    fetchBookingData();
  }, []);

  const handleCancelBooking = async () => {
    try {
      const bookingDocRef = doc(db, 'users', bookingId);
      await deleteDoc(bookingDocRef);

      // Handle the cancellation success, e.g., show a confirmation message
      console.log('Booking canceled successfully');
    } catch (error) {
      console.error('Error canceling booking:', error);
      // Handle the cancellation error
    }
  };

  if (!bookingData) {
    return null; // Return null or show a loading indicator while bookingData is being fetched
  }


  return (
    <React.Fragment>
      <View style={styles.container}>
        {bookings.map((booking) => (
          <View key={booking.bookingId} style={styles.bookingItem}>
            <Text style={styles.title}>Booking Details:</Text>
            <Text>Selected Date: {booking.selectedDate && booking.selectedDate.toDate().toString()}</Text>
            <Text>Selected Time: {booking.selectedTime}</Text>
            <Text>Selected Washing Machine: {booking.machine}</Text>
            <Text>Email: {booking.userEmail}</Text>
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleCancelBooking} style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>Cancel Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={[styles.button, styles.keepButton]}>
            <Text style={styles.buttonText}>Go to Homepage</Text>
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    bookingItem: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    button: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 10,
    },
    cancelButton: {
      borderColor: 'red',
      borderWidth: 1,
    },
    keepButton: {
      borderColor: 'green',
      borderWidth: 1,
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
  
  export default Homebook;