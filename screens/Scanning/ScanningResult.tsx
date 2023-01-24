import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";

export default function ScanningResult() {
  const market : market = {
    name: "Carrefour",
    address: "Rue de la République, 75011 Paris",
    phone: "01 43 54 65 76",
    city: "Paris",
  }
  const ticket: ticket = {
    market: market,
    client: {
      type: "ESCOMPTE ETUDIANT",
      numberClient: "Numéro de client:9991234",
    },
    Products: [],
    total: 0,
  };
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Scanning Result</Text>
      <Text style={styles.marketName}>{ticket.market.name}</Text>
      <Text style={styles.marketInfo}>{ticket.market.address}</Text>
      <Text style={styles.marketInfo}>{ticket.market.city}</Text>
      <Text style={[styles.clientInfo, { fontWeight: "bold" , paddingTop:'5%'}]}>
        {ticket.client.type}
      </Text>
      <Text style={styles.clientInfo}>{ticket.client.numberClient}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.articleContainer}>
        <Text
          style={styles.text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Carotte
        </Text>
        <Text
          style={styles.text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Carotte
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
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  marketName: {
    paddingTop: "5%",
    fontSize: 18,
    fontWeight: "bold",
  },
  marketInfo: {
    paddingTop: "1%",
    fontSize: 15,
  },
  clientInfo: {
    paddingTop: "1%",
    paddingLeft: "2%",
    fontSize: 15,
    alignSelf: "flex-start",
  },
  separator: {
    marginVertical: "5%",
    height: 1,
    width: "80%",
    backgroundColor: "#eee",
  },
  articleContainer: {
    // alignItems: "center",
    // flex: 1,
    justifyContent: "space-between",
    alignContent: "space-between",
    alignItems: "flex-start",
    // marginHorizontal: 50,
    flexDirection: "row",
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
});
