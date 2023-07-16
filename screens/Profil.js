import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ServerGetRequest } from '../database/Database';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const profilePicture = 'https://media4.giphy.com/media/ZXkraFrlIW1D25M6ZJ/giphy.gif?cid=ecf05e47atntf0tz79wet2yfhey44pbk30iderf61bub2euo&ep=v1_gifs_search&rid=giphy.gif&ct=g';

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await ServerGetRequest('users/64b0c1544835bbe03d5afc59');
      setUser(response);
    } catch (error) {
      console.log('Error: Failed to fetch user data', error);
    }
  };

  const handleLogout = () => {
    // Perform logout logic here
    // For example, clear user data from storage and navigate to the login screen
  };

  const handleViewTickets = () => {
    navigation.navigate('TicketList'); // Replace 'TicketList' with the actual screen name for the ticket list screen
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading user data...</Text>
      </View>
    );
  }
  //formate the date to be more readable
  const userDate = new Date(user.created_at);
  const formattedDate = userDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });


  return (
    <View style={styles.container}>
      <Text style={styles.title}> Profile de {user.name} </Text>
      <View style={styles.profileContainer}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.label}>Nom d'utilisateur:</Text>
          <Text style={styles.value}>{user.username}</Text>

          <Text style={styles.label}>Ticket Scannés:</Text>
          <Text style={styles.value}>{user.scannedTickets}</Text>

          <Text style={styles.label}>Magasion Favoris:</Text>
          <Text style={styles.value}>{user.favoriteStore}</Text>

          <Text style={styles.label}>Date d'inscription:</Text>
          <Text style={styles.value}>{formattedDate}</Text>

          {/* Add more fields as needed */}

          <TouchableOpacity style={styles.button} onPress={handleViewTickets}>
            <Text style={styles.buttonText}>View Tickets</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.logoutButton, { backgroundColor: '#ff4c4c' }]} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profilePictureContainer}>
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    paddingTop: '20%',
  },
  profileContainer: {
    flexDirection: 'row',
  },
  userInfoContainer: {
    flex: 1,
    marginRight: 20,
    marginTop: '5%',
  },
  profilePictureContainer: {
    position: 'absolute',
    flex: 1,
    right: '10%',
    marginTop: '2.5%',
    width: '40%',
    aspectRatio: 1,

  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#306bab',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#306bab',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: '50%',
  },
});

export default ProfileScreen;
