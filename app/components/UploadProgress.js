import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const UploadProgress = ({ process }) => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <Progress.Bar progress={process} width={200} />
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
        // backgroundColor: '#fff',
        // borderRadius: 100,
        // backgroundColor: 'red',
        aşignItems: 'center',
        justifyContent: 'center'
    }
})

export default UploadProgress;
