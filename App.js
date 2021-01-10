import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, ActivityIndicator, ScrollView } from "react-native";
import Header from "./src/components/Header";
import Form from "./src/components/Form";
import axios from "axios";
import Contization from "./src/components/Cotization/Cotization";

const App = () => {
  const [coin, setCoin] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [executeRequest, setExecuteRequest] = useState(false);
  const [cotization, setCotization] = useState({});
  const [loading, setLoading] = useState(false);

  const setCoinValue = (value) => setCoin(value);
  const setSelectedCryptoValue = (value) => setSelectedCrypto(value);

  const getPrice = async (url) => {
    try {
      const response = await axios.get(url);
      const {
        PRICE,
        LASTUPDATE,
        CHANGE24HOUR,
        CHANGEDAY,
        HIGHDAY,
        LOWDAY,
      } = response.data.DISPLAY[selectedCrypto][coin];
      setCotization({
        PRICE, LASTUPDATE, CHANGE24HOUR, CHANGEDAY, HIGHDAY, LOWDAY,
      });
      setExecuteRequest(false);
      setLoading(false);
    } catch (error) {
      console.error(new Error(error));
    }
  };
  useEffect(() => {
    if (executeRequest) {
      const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${selectedCrypto}&tsyms=${coin}`;
      getPrice(URL);
      setLoading(true);
    }
  }, [executeRequest]);

  return (
    <>
      <ScrollView>
        <Header />
        <Image
          style={styles.image}
          source={require("./assets/img/cryptomonedas.png")}
        />
        <View style={styles.formContainer}>
          <Form
            coin={coin}
            selectedCrypto={selectedCrypto}
            setCoinValue={setCoinValue}
            setSelectedCryptoValue={setSelectedCryptoValue}
            setExecuteRequest={setExecuteRequest}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          {loading ? (<ActivityIndicator size="large" color="#5E49E2" />) : (<Contization data={cotization} />)}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150,
    marginHorizontal: "2.5%",
  },
  formContainer: {
    marginHorizontal: "2.5%",
  },
  span: {},
  textLabel: {}

});

export default App;
