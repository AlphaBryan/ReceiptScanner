import { ActivityIndicator, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useState} from "react";

import { Text, View } from "../components/Themed";
import * as ImagePicker from 'expo-image-picker';
import {Image } from 'react-native';
import { scanMotor } from "../scanningMotors/scanningMotor";
import { FontAwesome } from '@expo/vector-icons';

export default function Home({ navigation }: any) {
  // const [photo, setPhoto] = useState<any>();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading , setLoading] = useState(false);

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
    // setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scannez vos tickets de caisse</Text>
      {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, borderColor:'black', borderWidth:2 }} />}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.textContainer}>
        <Text
          style={styles.text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Utilisez cette application pour scannez les tickets de caisse de vos
          super marchés préférées.
        </Text>
      </View>
      <View style={{flexDirection:'row'}}>

      </View>
      <View style={{flexDirection:'row'}}>
      <TouchableOpacity
        onPress={handleSelectImage}
        style={styles.button}
        >
        <FontAwesome name="picture-o" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Scanning")}
        style={styles.button}
        >
        <FontAwesome name="camera" size={24} color="black" />
      </TouchableOpacity>
        </View>
        <TouchableOpacity
        onPress={handleResultProcessImage}
        disabled={selectedImage == null ? true : false}
        style={[styles.button2, {backgroundColor: selectedImage == null ? '#7d7f82' : '#306bab'}]}
        >
        {loading == true ? 
        <ActivityIndicator size="small" color="white" /> 
        :
        <Text style={{fontSize:20}}> Analyse </Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: '10%',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  textContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#306bab",
    width: "15%",
    aspectRatio: 1,
    borderRadius: 100,
    // position: "absolute",
    // bottom: "5%",
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
    // aspectRatio: 1,
    borderRadius: 20,
    // position: "absolute",
    // bottom: "5%",
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
  buttonTest: {
    alignItems: "center",
    backgroundColor: "green",
    width: "15%",
    marginTop: 10,
    aspectRatio: 1,
    borderRadius: 20,
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
  },
  buttonText: {
    color: "white",
    fontSize: 50,
    bottom: "7%",
  },
  buttonTextTest: {
    color: "white",
    fontSize: 25,
    bottom: "7%",
  },
});
