import { router } from "expo-router";
import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import bg from "../assets/images/bg.jpg";
import * as SecureStore from 'expo-secure-store';

const GetStartedPage: React.FC = () => {

    useEffect(() => {
        const checkLogin = async () => {
            let uid = await SecureStore.getItemAsync('uid') || '';
            if (uid !== '') {
                router.replace('/(tabs)/home');
            }
        }
        checkLogin();
    }, [])

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <ImageBackground source={bg} style={styles.container}>
                    <TouchableOpacity style={styles.btn} onPress={() => router.push('/auth/login')}>
                        <Text style={{ color: 'black', fontSize: 22, textAlign: 'center', marginVertical: 'auto', fontWeight: 'bold',}}>Get Started</Text>
                    </TouchableOpacity>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundImage: 'url(../assets/images/bg.jpg)',
        paddingHorizontal: 30,
        paddingBottom: 40,
    },
    btn: {
        backgroundColor: 'white',
        width: '100%',
        height: 60,
        borderRadius: 10,
        marginTop: 'auto',
    }
})

export default GetStartedPage;