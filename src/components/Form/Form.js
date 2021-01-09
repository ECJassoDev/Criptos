import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native'
import { Picker } from '@react-native-community/picker';
import styles from './styles';
import axios from 'axios';

const Form = () => {

    const [coin, setCoin] = useState('');
    const [crypto, setCrypto] = useState('');

    const setCoinValue = (value) => {
        setCoin(value);
        console.log(value)
    };

    useEffect(() => {
        const apiUrl = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR';
        const loadData = async () => {
            try {
                const response = await axios.get(apiUrl);
                console.log(response);
            } catch (error) {
                console.error(new Error('Api Request'));
            }
        }
        loadData();
    }, [])

    return (
        <>
            <View>
                <Text style={styles.label}>Moneda</Text>
                <Picker
                    style={styles.picker}
                    onValueChange={(value) => setCoinValue(value)}
                    selectedValue={coin}
                >
                    <Picker.Item label="Selecciona" value="" />
                    <Picker.Item label="Dollar USD" value="USD" />
                    <Picker.Item label="Peso MXN" value="MXN" />
                    <Picker.Item label="Euro EUR" value="EUR" />
                    <Picker.Item label="Libra Esterlina GBP" value="GBP" />
                </Picker>

                <Text style={styles.label}>Criptomoneda</Text>
            </View>
        </>
    );
};


export default Form;