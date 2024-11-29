import { ImageBackground, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { GestureObjects } from "react-native-gesture-handler/lib/typescript/handlers/gestures/gestureObjects";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import bg from '../../assets/images/bg.jpg';
import { router } from "expo-router";
import { fetchData } from "@/hooks/api";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('Login here');

    const login = async () => {
        try {
            const result = await fetchData(`/users/search?username=${username}`);
            if (username === result.username && password === result.password) {
                router.push('/(tabs)/home');
            } else {
                setError('Username or password is incorrect');
            }
        } catch (err) {
        }
    }

    return (
        <>        
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <ImageBackground style={styles.container} source={bg}>
                <View style={styles.cover}>
                    <Text style={styles.title}>Air Cards</Text>
                    <Text style={styles.subtitle}>{error}</Text>

                    <KeyboardAvoidingView style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <FontAwesome5 name="user-alt" size={24} color="black" />
                            <TextInput placeholder="Enter your username" style={styles.input} onChangeText={(text) => setUsername(text)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <FontAwesome5 name="lock" size={24} color="black" />
                            <TextInput placeholder="Enter your password" secureTextEntry={true} style={styles.input} onChangeText={(text) => setPassword(text)} />
                        </View>

                        <TouchableOpacity style={styles.btn} onPress={login}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center',}}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.replace('/auth/register')}>
                            <Text style={{ color: '#1A1A1D', fontSize: 18, fontWeight: 'bold', textAlign: 'center',}}>Create New Account</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    cover: {
        width: '100%',
        height: '70%',
        backgroundColor: 'white',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,

    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: 70,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray',
        marginTop: 5,
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        paddingHorizontal: 20,
        marginTop: 60,
        gap: 20,
    },
    inputContainer: {
        maxWidth: '100%',
        height: 60,
        backgroundColor: 'lightgray',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
    },
    input: {
        maxWidth: '90%',
        paddingHorizontal: 10,
        fontSize: 16,
    },
    btn: {
        alignSelf: 'center',
        width: '80%',
        height: 60,
        backgroundColor: '#1A1A1D',
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
    }
})

export default LoginPage;