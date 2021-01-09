import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, Text, ScrollView } from "react-native";
import Header from "./src/components/Header";
import Form from "./src/components/Form";
import axios from "axios";

const App = () => {
  const [coin, setCoin] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [executeRequest, setExecuteRequest] = useState(false);
  const [cotization, setCotization] = useState({});

  const setCoinValue = (value) => setCoin(value);
  const setSelectedCryptoValue = (value) => setSelectedCrypto(value);

  const getPrice = async (url) => {
    try {
      const response = await axios.get(url);
      console.log(response.data.DISPLAY[selectedCrypto][coin]);
      const {
        PRICE,
        LASTUPDATE,
        CHANGE24HOUR,
        CHANGEDAY,
      } = response.data.DISPLAY[selectedCrypto][coin];
      setCotization({ PRICE, LASTUPDATE, CHANGE24HOUR, CHANGEDAY });
      setExecuteRequest(false);
    } catch (error) {
      console.error(new Error(error));
    }
  };
  useEffect(() => {
    if (executeRequest) {
      const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${selectedCrypto}&tsyms=${coin}`;
      getPrice(URL);
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
          {Object.keys(cotization).map((key) => (
            <>
              <Text>{key}</Text>
              <Text>{cotization[key]}</Text>
            </>
          ))}
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
});

export default App;
