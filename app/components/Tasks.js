import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tasks Screen</Text>
            <Text style={styles.subtitle}>Her is your tasks...</Text>

            <TouchableOpacity onPress={() => { navigation.navigate('Home') }} style={styles.button}><Text>Go to Home</Text></TouchableOpacity>
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
