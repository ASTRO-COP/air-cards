import { Image, StyleSheet, Text, TouchableOpacity, View,Switch, Animated } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { router } from "expo-router";
import { AntDesign, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import { useEffect, useState,useRef  } from "react";
import { fetchData } from "@/hooks/api";
import { useTheme } from "../../../hooks/ThemeProvider";


const ProfilePage = () => {
    const { theme, toggleTheme, isDarkMode } = useTheme();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const uid = await SecureStore.getItemAsync('uid');
            setLoading(true);
            try {
                const result = await fetchData(`/users/${uid}`);
                console.log(result);
                setUsername(result.username);
                setEmail(result.email);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [])


    // Animated value for the transition
    const animatedValue = useRef(new Animated.Value(0)).current;

    // Animate theme transitions
    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: isDarkMode ? 1 : 0,
            duration: 500, // Animation duration
            useNativeDriver: true, // Set to false for non-native properties like color
        }).start();
    }, [isDarkMode]);

    // Interpolated  color
    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#FFFFFF', '#303030'], // Light to dark
    });

    
    const textColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#000000', '#FFFFFF'], // Light to dark
    });

    const detail = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#a16e00', '#0ad6f5'], // Light to dark
    });

    useEffect(() => {
        // Animate between 0 (light mode) and 1 (dark mode)
        Animated.timing(animatedValue, {
            toValue: isDarkMode ? 1 : 0,
            duration: 300, // Transition duration in milliseconds
            useNativeDriver: true,
        }).start();
    }, [isDarkMode]);

    // Interpolating values for rotation or fade
    const rotation = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"], // Rotates the icon
    });

    const scale = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.2], // Scales the icon slightly
    });

    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.8], // Changes opacity
    });

    return (
        <Animated.View style={[styles.container, { backgroundColor}]}>
            <View style={styles.titleContainer}>
                <MaterialCommunityIcons name="face-man-profile" size={100} color="black" />
                <Animated.Text style={[styles.title, {color:textColor}]}>{"trav.whoami"}</Animated.Text>
                <Animated.Text style={[styles.subTitle,{color:detail}]}>{email}</Animated.Text>

                <TouchableOpacity style={[styles.editBtn, {backgroundColor:theme.button}]}>
                    <Text style={{ color: 'white', fontSize: 18}}>Edit Profile</Text>
                </TouchableOpacity>
                {/*  Switch */}
                
            </View>

            <View style={styles.body}>
                <Animated.Text style={[styles.bodyTitle, {color:detail}]}>Inventories</Animated.Text>

                <View style={styles.bodyContent}>
                    <TouchableOpacity style={styles.bodyItem}>
                        <View style={{ flexDirection: 'row', gap: 10}}>
                            <AntDesign name="profile" size={24} color="black" />
                            <Animated.Text style={{ fontSize: 16}}>About Astro Logic</Animated.Text>
                        </View>
                        <AntDesign name="arrowright" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.bodyItem, { borderBottomWidth: 0 }]} onPress={() => {
                        SecureStore.deleteItemAsync('uid');
                        router.replace('/auth/login');
                    }}>
                        <View style={{ flexDirection: 'row', gap: 10}}>
                            <FontAwesome name="support" size={24} color="black" />
                            <Animated.Text style={{ fontSize: 16}}>Support</Animated.Text>
                        </View>
                        <AntDesign name="arrowright" size={24} color="black" />
                    </TouchableOpacity>
                    <View  style={[styles.bodyItem, { borderBottomWidth: 0 }]}>
                        <View style={{ flexDirection: 'row', gap: 10}}>
                            <Animated.View
                                style={{
                                    transform: [{ rotate: rotation }, { scale }],
                                    opacity,
                                }}
                            >
                                {/* Change the icon dynamically */}
                                <Entypo
                                    name={isDarkMode ? "moon" : "light-up"}
                                    size={26}
                                    color="black"
                                />
                            </Animated.View>
                            <Text style={{ fontSize: 16, color:"black"}}>{isDarkMode ? "Dark Mode" : "Light Mode"}</Text>
                        </View>
                        <Switch
                            value={isDarkMode} // Use global dark mode state
                            onValueChange={toggleTheme} // Use global toggleTheme function
                            thumbColor={isDarkMode ? '#787878' : '#333'}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                        />
                    </View>
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 60,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 10,
    },
    subTitle: {
        fontSize: 14,
        color: 'gray',
    },
    editBtn: {
        width: 130,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1A1D',
        borderRadius: 100,
        marginTop: 15,
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 40,
    },
    bodyTitle: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 25,
    },
    bodyContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
        backgroundColor: 'lightgray',
        marginTop: 10,
        borderRadius: 30,
        paddingHorizontal: 10,
    },
    bodyItem: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 60,
        borderColor: 'black',
        borderBottomWidth: 1,
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
        justifyContent:'space-between',
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default ProfilePage;