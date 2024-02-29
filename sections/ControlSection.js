import React from 'react';
import { StatusBar, StyleSheet, Text, View, Image } from 'react-native';

export function Control() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Now Playing: Joe</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "15%",
        backgroundColor: "#000000",
        color: "white"
    },
    text: {
        color: "white",
        fontSize: 24,
    }
});