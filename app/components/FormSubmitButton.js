import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const FormSubmitButton = ({ title, onPress, submiting }) => {
    const backgroundColor = submiting ? 'rgba(27, 27, 51, 0.4)' : 'rgba(27, 27, 51, 1)';
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={[styles.contianer, { backgroundColor }]}>
                <Text style={styles.body}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    contianer: {
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        fontSize: 18,
        color: 'white',
    }
})

export default FormSubmitButton;