import { router } from "expo-router";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const GetStartedPage = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <View style={styles.container}>
                <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
                    <Text style={{ fontSize: 30}}>Get Strted</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'black',
    }
})

export default GetStartedPage;