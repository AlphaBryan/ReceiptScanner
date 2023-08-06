import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { Entypo } from "@expo/vector-icons";

export default function ScanningResult({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const scanResult = route?.params?.scanResult;
  console.log(scanResult);
  const ticketEmpty = {
    market: {
      name: "Aucun nom de magasin trouvé",
      address: "Aucune adresse de magasin trouvé",
      phone: "Aucun numéro de téléphone trouvé",
      city: "Aucune ville trouvée",
    },
    client: {
      type: "Type de client: Aucun type de client trouvé",
      numberClient: "Aucun numéro de client trouvé",
      methodePaiement: "Not found",
    },
    products: [],
    totals: {
      total: -1,
      tax: -1,
      subTotal: -1,
    },
  };
  const [ticket, setTicket] = useState(ticketEmpty);

  useEffect(() => {
    setTicket(scanResult);
  }, []);

  if (loading) {
    return (
      <View style={styles.firstContainer}>
        <Text style={[styles.pageTitle]}>TakingPicture Ticket</Text>
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
    <View style={styles.firstContainer}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.pageTitle}>Scanned Ticket</Text>
        <TouchableOpacity
          style={{ marginLeft: "5%" }}
          onPress={() => {
            const alertMessage = `Plus d'info à venir`;
            alert(alertMessage);
          }}
        >
          <Entypo name="info-with-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.marketName}>{ticket?.magasin?.nom}</Text>
      <Text style={styles.marketInfo}>{ticket?.magasin?.slogan}</Text>
      <Text style={styles.marketInfo}>{ticket?.magasin?.numero}</Text>
      <>
        <Text style={[styles.clientInfo, { paddingTop: "2%" }]}>
          <Text style={{ fontWeight: "bold" }}>Payement method:</Text>
          {ticket?.client?.methodePaiement != null
            ? " " + ticket?.client?.methodePaiement
            : " " + ticketEmpty.client.methodePaiement}
        </Text>
      </>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <ScrollView style={styles.articlesContainer}>
        {ticket?.articles?.length === 0 && (
          <View style={{ marginTop: "10%" }}>
            <Text style={styles.text}>Aucun produit trouvé</Text>
            <Text style={styles.text}>Veuillez réessayer</Text>
          </View>
        )}
        {ticket?.articles?.map((product, index) => (
          <View style={styles.articleContainer} key={index}>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>{product?.nom} </Text> x{" "}1
              {/* {product?.quantity} */}
            </Text>
            <Text style={styles.text}>{product?.prix} $</Text>
          </View>
        ))}
      </ScrollView>
      <View style={[styles.articleContainer2, { marginBottom: "0%" }]}>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>SOUS-TOTAL </Text>
        </Text>
        <Text style={styles.text}>{ticket?.sousTotal} $</Text>
      </View>
      <View style={[styles.articleContainer2, { marginBottom: "0%" }]}>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>TAXES (TPS + TVQ)</Text>
        </Text>
        <Text style={styles.text}>{ticket?.taxes} $</Text>
      </View>
      <View style={[styles.articleContainer2, { marginBottom: "10%" }]}>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>TOTAL </Text>
        </Text>
        <Text style={styles.text}>{ticket?.total} $</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "15%",
  },
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
    marginTop: "3%",
    height: 1,
    width: "80%",
    backgroundColor: "black",
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
  articleContainer2: {
    justifyContent: "space-between",
    backgroundColor: "#eee",
    borderColor: "#1E90FF",
    borderWidth: 2,
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