import { useState } from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";

import { Text, View } from "../../components/Themed";

export default function ScanningResult() {
  const [loading, setLoading] = useState(false);
  const market: market = {
    name: "Carrefour",
    address: "Rue de la République, 75011 Paris",
    phone: "01 43 54 65 76",
    city: "Paris",
  };
  const product1: product = {
    name: "Carotte",
    quantity: 2,
    price: 2.5,
  };
  const ticket: ticket = {
    market: market,
    client: {
      type: "ESCOMPTE ETUDIANT",
      numberClient: "Numéro de client:9991234",
    },
    Products: [product1, product1],
    total: 0,
  };
  if (loading == true) {
    return (
      <View style={styles.container}>
        {/* //waiting for the result */}
        <Text style={styles.pageTitle}>Scanning Ticket</Text>
        <Text style={styles.marketName}>Loading...</Text>
        <ActivityIndicator
          size="large"
          color="gray"
          style={{ marginTop: "5%" }}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Scanned Ticket</Text>
      <Text style={styles.marketName}>{ticket.market.name}</Text>
      <Text style={styles.marketInfo}>{ticket.market.address}</Text>
      <Text style={styles.marketInfo}>{ticket.market.city}</Text>
      <Text
        style={[styles.clientInfo, { fontWeight: "bold", paddingTop: "5%" }]}
      >
        {ticket.client.type}
      </Text>
      <Text style={styles.clientInfo}>{ticket.client.numberClient}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <ScrollView style={styles.articlesContainer}>
        {ticket.Products.map((product, index) => (
          <View style={styles.articleContainer} key={index}>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>{product.name} </Text> x{" "}
              {product.quantity}
            </Text>
            <Text style={styles.text}>{product.price} $</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.articleContainer}>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>Total </Text>
        </Text>
        <Text style={styles.text}>{ticket.total} $</Text>
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
    marginTop: "5%",
    height: 1,
    width: "80%",
    backgroundColor: "#eee",
  },
  articlesContainer: {
    width: "100%",
  },
  articleContainer: {
    justifyContent: "space-between",
    backgroundColor: "#eee",
    width: "85%",
    flexDirection: "row",
    padding: "2%",
    borderRadius: 10,
    marginVertical: "2%",
    alignSelf: "center",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
});
