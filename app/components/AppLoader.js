import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const AppLoader = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView style={styles.animation} source={require('../../assets/loading3.json')} autoPlay loop />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.3)',
        zIndex: 1
    },
    animation: {
        width: '100%',
        height: '100%',
        aşignItems: 'center',
        justifyContent: 'center'
    }
})

export default AppLoader;