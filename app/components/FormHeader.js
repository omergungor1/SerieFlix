import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const FormHeader = ({ leftHeading, rightHeading, subHeading, leftHeaderTranslateX, rightHeaderTranslateY, rightHeaderOpacity }) => {

    return (
        <View>
            <View style={styles.container}>
                <Animated.Text style={[styles.heading, { transform: [{ translateX: leftHeaderTranslateX }] }]}>{leftHeading}</Animated.Text>
                <Animated.Text style={[styles.heading, { opacity: rightHeaderOpacity, transform: [{ translateY: rightHeaderTranslateY }] }]}>{rightHeading}</Animated.Text>
            </View>
            <Text style={styles.subHeading}>{subHeading}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: { fontSize: 30, fontWeight: 'bold', color: '#1b1b33' },
    subHeading: { fontSize: 18, color: '#1b1b33', textAlign: 'center' }
});

export default FormHeader;