import { StyleSheet, Text, View, TouchableOpacity, Alert,  ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, route, navigation } from "@react-navigation/native";
import { collection, addDoc, getDocs, updateDoc, doc, setDoc, getDoc, query, where, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

// const MyBookingScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const { bookingId } = route.params;
//   const [bookingData, setBookingData] = useState(null);
//   const { email } = route.params;
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     const fetchBookingData = async () => {
//       try {
//         if (!bookingId) {
//           console.log('Booking ID is undefined');
//           return;
//         }

//         const bookingQuery = query(collection(db, 'users'), where('bookingId', '==', bookingId));
//         const querySnapshot = await getDocs(bookingQuery);

//         if (querySnapshot.empty) {
//           // Handle the case where no booking data is found
//           console.log('No booking data found');
//           return;
//         }

//         // Assuming only one document matches the bookingId, retrieve the first one
//         const bookingDoc = querySnapshot.docs[0];
//         const data = bookingDoc.data();

//         setBookingData(data);
//       } catch (error) {
//         console.error('Error fetching booking data:', error);
//         // Handle the error
//       }
//     };    
//     fetchBookingData();
//   }, [bookingId]);



//   //Cancel Booking

//   const handleCancelBooking = async () => {
//     try {
//       const bookingDocRef = doc(db, 'users', bookingId);
//       await deleteDoc(bookingDocRef);

//       // Handle the cancellation success, e.g., show a confirmation message
//       console.log('Booking cancelled successfully');
//     } catch (error) {
//       console.error('Error canceling booking:', error);
//       // Handle the cancellation error
//     }
    

//     Alert.alert(
//       "Booking Canceled",
//       "Your booking has been canceled successfully.",
//       [
//         {
//           text: "OK",
//           onPress: () => {
//             // Redirect to the homepage
//             navigation.navigate("Home");
//           },
//         },
//       ],
//       { cancelable: false }
//     );


//   };

//   if (!bookingData) {
//     return (
//       <View style={styles.noBookingsContainer}>
//         <Text style={styles.noBookingsText}>You have no bookings.</Text>
//       </View>
//     );
//   }

 
//   return (
//         <React.Fragment>
//           <View style={styles.container}>
//             <View style={styles.bookingItem}>
//               <Text style={styles.title}>Booking Details:</Text>
//               <Text>Booking ID: {bookingId}</Text>
//               <Text>Selected Residence: {bookingData.selectedResidence}</Text>
//               <Text>Selected Date: {bookingData.selectedDate && bookingData.selectedDate.toDate().toString()}</Text>
//               <Text>Selected Time: {bookingData.selectedTime}</Text>
//               <Text>Selected Washing Machine: {bookingData.machine}</Text>
//               <Text>Email: {bookingData.userEmail}</Text>
//             </View>
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity onPress={handleCancelBooking} style={[styles.button, styles.cancelButton]}>
//                 <Text style={styles.buttonText}>Cancel Booking</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => navigation.navigate('Home')} style={[styles.button, styles.keepButton]}>
//                 <Text style={styles.buttonText}>Go to Homepage</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </React.Fragment>
//       );
//     };
       

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
//   noBookingsContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   noBookingsText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "red",
//   },
// });

// export default MyBookingScreen;



const MyBookingsScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const userEmail = auth.currentUser?.email || '';
  const [cancelStatus, setCancelStatus] = useState(false); // Track the cancellation status

  useEffect(() => {
    {
      navigation.setOptions({
        headerShown: false, // Remove the back button
      });
    } [navigation]
    const fetchBookings = async () => {
      try {
        const userBookingsRef = collection(db, 'bookings');
        const bookingsSnapshot = await getDocs(userBookingsRef);
        const bookingsData = bookingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [cancelStatus]); // Include cancelStatus as a dependency

  const handleCancelBooking = async (bookingId) => {
    try {
      const confirmation = await new Promise((resolve) => {
        Alert.alert(
          'Confirm Cancellation',
          'Are you sure you want to cancel this booking?',
          [
            { text: 'No, keep booking', style: 'cancel', onPress: () => resolve(false) },
            { text: 'Yes, cancel', onPress: () => resolve(true) },
          ],
          { cancelable: false }
        );
      });
  
      if (confirmation) {
        const bookingDocRef = doc(db, 'bookings', bookingId);
        await deleteDoc(bookingDocRef);
  
        // Handle the cancellation success, e.g., show a confirmation message
        console.log('Booking cancelled successfully');
        Alert.alert('Booking Canceled', 'Your booking has been canceled successfully.');
        setCancelStatus(!cancelStatus); // Toggle the cancelStatus to trigger a refresh
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
      // Handle the cancellation error
      Alert.alert('Error', 'Failed to cancel the booking. Please try again.');
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {bookings.length === 0 ? (
        <>
          <Text style={styles.noBookingsText}>You have no bookings.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={[styles.button, styles.homeButton]}>
            <Text style={styles.buttonText}>Go to Homepage</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {bookings.map(booking => (
            <View key={booking.id} style={styles.bookingItem}>
              <Text style={styles.title}>Booking Details:</Text>
              <Text>Booking ID: {booking.id}</Text>
              <Text>Selected Residence: {booking.selectedResidence}</Text>
              <Text>Selected Date: {booking.selectedDate && booking.selectedDate.toDate().toString()}</Text>
              <Text>Selected Time: {booking.selectedTime}</Text>
              <Text>Selected Washing Machine: {booking.machine}</Text>
              
              <TouchableOpacity
                onPress={() => handleCancelBooking(booking.id)}
                style={[styles.button, styles.cancelButton]}
              >
                <Text style={styles.buttonText}>Cancel Booking</Text>
              </TouchableOpacity>
            </View>
          ))}
  
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={[styles.button, styles.homeButton]}>
            <Text style={styles.buttonText}>Go to Homepage</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    borderColor: 'red',
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  noBookingsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default MyBookingsScreen;



// const MyBookingsScreen= ({}) => {
//   const navigation = useNavigation();
//   const [bookings, setBookings] = useState([]);

//   const fetchBookings = async () => {
//     const userCollectionRef = collection(db, 'users');
//     const userEmail = auth.currentUser?.email || '';
  
//     const querySnapshot = await getDocs(userCollectionRef.where('userEmail', '==', userEmail));
  
//     const fetchedBookings = [];
//     querySnapshot.forEach((doc) => {
//       const bookingData = doc.data();
//       fetchedBookings.push(bookingData);
//     });
  
//     setBookings(fetchedBookings);
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   return (
//     <React.Fragment>
//       {bookings.length === 0 ? (
//         <View style={styles.noBookingsContainer}>
//           <Text style={styles.noBookingsText}>You have no bookings.</Text>
//         </View>
//       ) : (
//         <View style={styles.container}>
//           {bookings.map((booking) => (
//             <View key={booking.bookingId} style={styles.bookingItem}>
//               <Text style={styles.title}>Booking Details:</Text>
//               <Text style={styles.bookingText}>Residence: {booking.selectedResidence}</Text>
//               <Text style={styles.bookingText}>Date: {booking.selectedDate}</Text>
//               <Text style={styles.bookingText}>Time: {booking.selectedTime}</Text>
//               <Text style={styles.bookingText}>Machine: {booking.machine}</Text>
//             </View>
//           ))}
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity onPress={handleCancelBooking} style={[styles.button, styles.cancelButton]}>
//               <Text style={styles.buttonText}>Cancel Booking</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => navigation.navigate('Home')} style={[styles.button, styles.keepButton]}>
//               <Text style={styles.buttonText}>Go to Homepage</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </React.Fragment>
//   );

// }

// export default MyBookingsScreen;

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 20,
//     },
//     bookingItem: {
//       backgroundColor: '#f0f0f0',
//       padding: 10,
//       borderRadius: 5,
//       marginBottom: 10,
//     },
//     title: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       marginBottom: 10,
//     },
//     buttonContainer: {
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginTop: 20,
//     },
//     button: {
//       backgroundColor: 'white',
//       padding: 10,
//       borderRadius: 5,
//       marginHorizontal: 10,
//     },
//     cancelButton: {
//       borderColor: 'red',
//       borderWidth: 1,
//     },
//     keepButton: {
//       borderColor: 'green',
//       borderWidth: 1,
//     },
//     buttonText: {
//       fontWeight: 'bold',
//       fontSize: 16,
//     },
//     noBookingsContainer: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     noBookingsText: {
//       fontSize: 18,
//       fontWeight: "bold",
//       color: "red",
//     },
//   });