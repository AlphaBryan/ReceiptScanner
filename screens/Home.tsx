import { Button, StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { lineAnalysis } from "../scanningMotors/lineAnalysis";
import ocrResultExample from "../tests/GoogeOcrResult";
import { RootTabScreenProps } from "../types";

export default function Home({ navigation }: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scannez vos tickets de caisse</Text>
      <TouchableOpacity
        onPress={() => lineAnalysis(ocrResultExample)}
        style={styles.buttonTest}
      >
        <Text style={styles.buttonTextTest}>test</Text>
      </TouchableOpacity>
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
      <TouchableOpacity
        onPress={() => navigation.navigate("Scanning")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      {/* </View> */}
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
    position: "absolute",
    bottom: "5%",
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
