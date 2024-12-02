import { ImageBackground, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from "react-native";
import React, { useState } from "react";
import bg from '../../assets/images/bg.jpg';
import { router } from "expo-router";
import { postData } from "@/hooks/api";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from 'expo-secure-store';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('Start Your Journey');

    const register = async () => {
        if (email === "" || username === "" || password === "") {
            setError('Please fill everything');
            return;
        }

        setLoading(true);
        try {
            const data = {
                email: email,
                username: username,
                password: password,
            };
            const result = await postData('/users', data);
            await SecureStore.setItemAsync('uid', result._id);
            console.log(await SecureStore.getItemAsync('uid'));
            setError('Registration Successful! Redirecting...');
            router.replace('/(tabs)/home');
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
        setLoading(false);
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <ImageBackground style={styles.container} source={bg}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <KeyboardAvoidingView
                        style={styles.container}
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        keyboardVerticalOffset={70}
                    >
                        <View style={styles.cover}>
                            <Text style={styles.title}>Air Cards</Text>
                            <Text style={styles.subtitle}>{error}</Text>

                            <View style={styles.formContainer}>
                                <View style={styles.inputContainer}>
                                    <MaterialIcons name="email" size={24} color="black" />
                                    <TextInput
                                        placeholder="Enter your email"
                                        autoCapitalize="none"
                                        style={styles.input}
                                        onChangeText={(text) => setEmail(text)}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <FontAwesome5 name="user-alt" size={24} color="black" />
                                    <TextInput
                                        placeholder="Enter your username"
                                        autoCapitalize="none"
                                        style={styles.input}
                                        onChangeText={(text) => setUsername(text)}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <FontAwesome5 name="lock" size={24} color="black" />
                                    <TextInput
                                        placeholder="Enter your password"
                                        autoCapitalize="none"
                                        secureTextEntry={true}
                                        style={styles.input}
                                        onChangeText={(text) => setPassword(text)}
                                    />
                                </View>

                                <TouchableOpacity style={styles.btn} onPress={register}>
                                    <Text style={styles.btnText}>Register</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => router.replace('/auth/login')}>
                                    <Text style={styles.linkText}>Already have an account? Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </ImageBackground>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    cover: {
        height: '80%',
        backgroundColor: 'white',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        paddingHorizontal: 20,
        paddingTop: 70,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 40,
        marginBottom: 10,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray',
        marginBottom: 20,
    },
    formContainer: {
        marginTop: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        height: 60,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#1A1A1D',
        borderRadius: 10,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    linkText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A1A1D',
    },
});

export default RegisterPage;
