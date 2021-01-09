import React, { useState, useEffect } from "react";
import { Text, View, TouchableHighlight, Alert } from "react-native";
import { Picker } from "@react-native-community/picker";
import styles from "./styles";
import axios from "axios";

const Form = ({
  coin,
  selectedCrypto,
  setCoinValue,
  setSelectedCryptoValue,
  setExecuteRequest,
}) => {
  const [cryptos, setCryptos] = useState([]);

  const showAlert = () => {
    Alert.alert("Error", "Ambos campos son obilgatorios", [{ text: "Ok" }]);
  };

  const onSubmit = () => {
    if (coin === "" || selectedCrypto === "") {
      showAlert();
      return;
    } else {
      setExecuteRequest(true);
    }
  };

  const apiUrl =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
  const loadData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setCryptos([...response.data.Data]);
      console.log(response.data.Data);
    } catch (error) {
      console.error(new Error("Api Request"));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <View>
        <Text style={styles.label}> {"Moneda"} </Text>
        <Picker
          style={styles.picker}
          onValueChange={(value) => setCoinValue(value)}
          selectedValue={coin}
          style={styles.pickerItem}
        >
          <Picker.Item label="Selecciona" value="" />
          <Picker.Item label="Dollar USD" value="USD" />
          <Picker.Item label="Peso MXN" value="MXN" />
          <Picker.Item label="Euro EUR" value="EUR" />
          <Picker.Item label="Libra Esterlina GBP" value="GBP" />
        </Picker>
        <Text style={styles.label}> {"Criptomoneda"} </Text>
        <Picker
          style={styles.picker}
          onValueChange={(value) => setSelectedCryptoValue(value)}
          selectedValue={selectedCrypto}
          style={styles.pickerItem}
        >
          <Picker.Item label="Selecciona" value="" />
          {cryptos.map((item) => (
            <Picker.Item
              key={item.CoinInfo.Internal}
              label={item.CoinInfo.FullName}
              value={item.CoinInfo.Name}
            />
          ))}
        </Picker>
        <TouchableHighlight onPress={onSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>{"Cotizar"}</Text>
        </TouchableHighlight>
      </View>
    </>
  );
};

export default Form;
