import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const FormInput = (props) => {
    const { label, placeholder, error } = props;
    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.label}>
                    {label}
                </Text>
                {error ? <Text style={styles.error}>
                    {error}
                </Text> : null}
            </View>
            <TextInput
                {...props}
                autoCapitalize='none'
                autoFocus={false}
                placeholder={placeholder}
                style={styles.input} />
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#1b1b33',
        height: 35,
        borderRadius: 8,
        fontSize: 16,
        paddingLeft: 10,
        marginTop: 5,
        marginBottom: 20
    },
    label: { fontWeight: 'bold', fontSize: 16 },
    error: { color: 'red', fontSize: 16 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})


export default FormInput;