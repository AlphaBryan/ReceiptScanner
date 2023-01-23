import { StatusBar } from "expo-status-bar";
import { Image, Platform, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { Camera, CameraType } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import { Button, TouchableOpacity, Alert } from "react-native";

export default function Scanning() {
  // const camera = Camera as any;

  //objet camera with useRef

  const camera = useRef();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [photo, setPhoto] = useState<any>();

  useEffect(() => {
    (async () => {
      if (!permission?.granted) {
        await requestPermission();
      }
      // const mediaLibraryPermission =
      //   await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

  if (permission === null) {
    return <Text>Error with camera permission</Text>;
  }
  if (!permission.granted) {
    return (
      <Text style={{ textAlign: "center", paddingTop: "20%" }}>
        No access to camera
      </Text>
    );
  }

  async function takePicture() {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };
    if (Camera) {
      try {
        // @ts-ignore
        const photo = await camera.current.takePictureAsync(options);
        setPhoto(photo);
        Alert.alert("Photo saved to", photo.uri);
      } catch (error) {
        console.log("erreur: ", error);
      }
    }
  }
  async function sendPicture() {
    console.log("Send photo to OCR. ");
  }

 
  if (photo) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photo.uri }} style={styles.image} />
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        {/* retake picture */}
        {/* row view  */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPhoto(null)}
          >
            <Text style={[styles.text, { marginHorizontal: "5%" }]}>
              Reprendre
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={sendPicture}>
            <Text
              style={[
                styles.text,
                { marginHorizontal: "5%", color: "#316ccc", fontWeight: "bold" },
              ]}
            >
              Envoyer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <Camera style={styles.camera} type={type} ref={camera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button]} onPress={takePicture}>
            <Text style={styles.text}>Prendre en photo</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  camera: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    // justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "85%",
    textAlign: "center",
    // justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    textAlign: "center",
  },
  button: {
    // flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
    marginBottom: "10%",
  },
  text: {
    fontSize: 25,
    color: "lightblue",
  },
});
