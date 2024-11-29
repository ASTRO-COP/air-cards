import { ImageBackground, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { GestureObjects } from "react-native-gesture-handler/lib/typescript/handlers/gestures/gestureObjects";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import bg from '../../assets/images/bg.jpg';
import { router } from "expo-router";
import { postData } from "@/hooks/api";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const register = async () => {
        setLoading(true);
        try {
            const data = {
                email : email,
                username : username,
                password : password
            }
            const result = await postData('/users', data);
        } catch (err) {
            
        }
        setLoading(false);
    }

    return (
        <>        
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <ImageBackground style={styles.container} source={bg}>
                <View style={styles.cover}>
                    <Text style={styles.title}>Air Cards</Text>
                    <Text style={styles.subtitle}>Start Your Journey</Text>

                    <KeyboardAvoidingView style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="email" size={24} color="black" />
                            <TextInput placeholder="Enter your email" style={styles.input} onChangeText={(text) => setEmail(text)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <FontAwesome5 name="user-alt" size={24} color="black" />
                            <TextInput placeholder="Enter your username" style={styles.input} onChangeText={(text) => setUsername(text)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <FontAwesome5 name="lock" size={24} color="black" />
                            <TextInput placeholder="Enter your password" secureTextEntry={true} style={styles.input} onChangeText={(text) => setPassword(text)} />
                        </View>

                        <TouchableOpacity style={styles.btn} onPress={register}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center',}}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.replace('/auth/login')}>
                            <Text style={{ color: '#1A1A1D', fontSize: 16, fontWeight: 'bold', textAlign: 'center',}}>Already have an account? Login</Text>
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
        height: '90%',
        backgroundColor: 'white',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,

    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: 90,
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
        width: '100%',
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

export default RegisterPage;