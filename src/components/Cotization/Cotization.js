import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const Contization = ({ data }) => {
    if (Object.keys(data).length === 0) return null
    return (
        <>
            <View style={styles.contizationContainer}>
                <Text style={[styles.price, styles.span]}>{data.PRICE}</Text>
                <Text style={styles.textLabel}>
                    {'Precio mas alto del día:  '}
                    <Text style={styles.span}>{data.HIGHDAY}</Text>
                </Text>
                <Text style={styles.textLabel}>
                    {'Precio más bajo del día:  '}
                    <Text style={styles.span}>{data.LOWDAY}</Text>
                </Text>
                <Text style={styles.textLabel}>
                    {'Variación de las últimas  24 hrs:  '}
                    <Text style={styles.span}>{data.CHANGE24HOUR}</Text>
                </Text>
                <Text style={styles.textLabel}>
                    {'Última actualización:  '}
                    <Text style={styles.span}>{data.LASTUPDATE}</Text>
                </Text>
            </View>
        </>
    );
}

export default Contization;