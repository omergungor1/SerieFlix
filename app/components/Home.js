import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <Text style={styles.subtitle}>Your one-stop-shop for all your to-do list needs.</Text>

            <TouchableOpacity onPress={() => { navigation.navigate('Tasks') }} style={styles.button}><Text>Go to Tasks</Text></TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1,
        margin: 10,
    }
});

export default Home;
