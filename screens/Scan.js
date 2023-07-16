import { ActivityIndicator, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

import { Text, View } from "../components/Themed";
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { scanMotor } from "../scanningMotors/scanningMotor";
import { FontAwesome } from '@expo/vector-icons';

export default function Scan({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };

  const handleResultProcessImage = async () => {
    if (selectedImage) {
      try {
        setLoading(true);
        const data = await scanMotor(selectedImage).finally(() => {
          setLoading(false);
        }).catch((error) => {
          console.log(error);
        });
        navigation.navigate("ScanningResult", { scanResult: data });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scannez vos tickets de caisse</Text>
      {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, borderColor: 'black', borderWidth: 2 }} />}
      {!selectedImage && <Image source={{ uri: "https://media1.giphy.com/media/LlYbQF3855hSjbIBXv/giphy.gif" }} style={{ width: '50%', aspectRatio: 1 }} />}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSelectImage} style={styles.button}>
          <FontAwesome name="picture-o" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Scanning")} style={styles.button}>
          <FontAwesome name="camera" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleResultProcessImage}
        disabled={selectedImage == null ? true : false}
        style={[styles.button2, { backgroundColor: selectedImage == null ? '#7d7f82' : '#306bab' }]}
      >
        {loading == true ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={{ fontSize: 20 }}> Analyse </Text>
        )}
      </TouchableOpacity>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Comment ça marche ?</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text} lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
          Prenez en photo votre ticket de caisse ou sélectionnez-le dans votre galerie.
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text} lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
          L'application va ensuite analyser votre ticket et vous donner le résultat.
        </Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: '10%',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: '5%',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  textContainer: {
    alignItems: "center",
    marginHorizontal: '5%',
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    // marginTop: '5%',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#306bab",
    width: "15%",
    aspectRatio: 1,
    borderRadius: 100,
    marginTop: '5%',
    marginHorizontal: '5%',
    textAlign: "center",
    alignContent: "flex-end",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
  },
  button2: {
    alignItems: "center",
    backgroundColor: "#306bab",
    width: "70%",
    height: "5%",
    borderRadius: 20,
    marginTop: '5%',
    marginHorizontal: '5%',
    textAlign: "center",
    alignContent: "flex-end",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
  },
});
