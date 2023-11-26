import { StyleSheet, View, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'

const FormContainer = ({ children }) => {
    return (
        <KeyboardAvoidingView
            enabled
            behavior={Platform.OS == 'ios' ? 'padding' : null}
            style={styles.container}>
            <View>{children}</View>
        </KeyboardAvoidingView>
    )
}

export default FormContainer

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 20,
    },
})