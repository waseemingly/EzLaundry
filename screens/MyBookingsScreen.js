import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, route, navigation } from "@react-navigation/native";
import { collection, addDoc, getDocs, updateDoc, doc, setDoc, getDoc, query, where, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const MyBookingScreen = ({ route }) => {
  const navigation = useNavigation();
  const { bookingId } = route.params;
  const [bookingData, setBookingData] = useState(null);
  const { email } = route.params;
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        if (!bookingId) {
          console.log('Booking ID is undefined');
          return;
        }

        const bookingQuery = query(collection(db, 'users'), where('bookingId', '==', bookingId));
        const querySnapshot = await getDocs(bookingQuery);

        if (querySnapshot.empty) {
          // Handle the case where no booking data is found
          console.log('No booking data found');
          return;
        }

        // Assuming only one document matches the bookingId, retrieve the first one
        const bookingDoc = querySnapshot.docs[0];
        const data = bookingDoc.data();

        setBookingData(data);
      } catch (error) {
        console.error('Error fetching booking data:', error);
        // Handle the error
      }
    };    
    fetchBookingData();
  }, [bookingId]);

  //Cancel Booking

  const handleCancelBooking = async () => {
    try {
      const bookingDocRef = doc(db, 'users', bookingId);
      await deleteDoc(bookingDocRef);

      // Handle the cancellation success, e.g., show a confirmation message
      console.log('Booking cancelled successfully');
    } catch (error) {
      console.error('Error canceling booking:', error);
      // Handle the cancellation error
    }

    Alert.alert(
      "Booking Canceled",
      "Your booking has been canceled successfully.",
      [
        {
          text: "OK",
          onPress: () => {
            // Redirect to the homepage
            navigation.navigate("Home");
          },
        },
      ],
      { cancelable: false }
    );


  };

  if (!bookingData) {
    return (
      <View style={styles.noBookingsContainer}>
        <Text style={styles.noBookingsText}>You have no bookings.</Text>
      </View>
    );
  }

  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={styles.bookingItem}>
          <Text style={styles.title}>Booking Details:</Text>
          <Text>Booking ID: {bookingId}</Text>
          <Text>Selected Residence: {bookingData.selectedResidence}</Text>
          <Text>Selected Date: {bookingData.selectedDate && bookingData.selectedDate.toDate().toString()}</Text>
          <Text>Selected Time: {bookingData.selectedTime}</Text>
          <Text>Selected Washing Machine: {bookingData.machine}</Text>
          <Text>Email: {bookingData.userEmail}</Text>
        </View>
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
  noBookingsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noBookingsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
});

export default MyBookingScreen;


// const MyBookingsScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { userEmail } = route.params;
//   const [bookingDetails, setBookingDetails] = useState(null);

//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       try {
//         const bookingsRef = firestore.collection('bookings');
//         const querySnapshot = await bookingsRef
//           .where('userEmail', '==', userEmail)
//           .orderBy('createdAt', 'desc')
//           .limit(1)
//           .get();

//         if (querySnapshot.empty) {
//           // Handle case when there are no bookings for the user
//           console.log('No bookings found');
//           setBookingDetails(null);
//         } else {
//           const bookingData = querySnapshot.docs[0].data();
//           // Process bookingData as needed
//           console.log('Booking details:', bookingData);
//           setBookingDetails(bookingData);
//         }
//       } catch (error) {
//         console.log('Error fetching booking details:', error);
//       }
//     };

//     fetchBookingDetails();
//   }, [userEmail]);

//   return (
//     <React.Fragment>
//       <View style={styles.container}>
//         <View style={styles.bookingItem}>
//           <Text style={styles.title}>Booking Details:</Text>
//           <Text>Booking ID: {bookingId}</Text>
//           <Text>Selected Residence: {bookingData.selectedResidence}</Text>
//           <Text>Selected Date: {bookingData.selectedDate && bookingData.selectedDate.toDate().toString()}</Text>
//           <Text>Selected Time: {bookingData.selectedTime}</Text>
//           <Text>Selected Washing Machine: {bookingData.machine}</Text>
//           <Text>Email: {bookingData.userEmail}</Text>
//         </View>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity onPress={handleCancelBooking} style={[styles.button, styles.cancelButton]}>
//             <Text style={styles.buttonText}>Cancel Booking</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate('Home')} style={[styles.button, styles.keepButton]}>
//             <Text style={styles.buttonText}>Go to Homepage</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </React.Fragment>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   bookingItem: {
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   button: {
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 5,
//     marginHorizontal: 10,
//   },
//   cancelButton: {
//     borderColor: 'red',
//     borderWidth: 1,
//   },
//   keepButton: {
//     borderColor: 'green',
//     borderWidth: 1,
//   },
//   buttonText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default MyBookingsScreen;

