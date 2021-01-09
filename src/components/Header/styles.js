import { StyleSheet, Platform, ColorPropType } from 'react-native';

const styles = StyleSheet.create({
    header: {
        paddingTop: Platform.OS === 'ios' ? 50 : 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Lato-Black',
        backgroundColor: '#5E49E2',
        paddingBottom: 10,
        textTransform: 'uppercase',
        color: '#FFF',
        marginBottom: 30,
    }
});

export default styles;

