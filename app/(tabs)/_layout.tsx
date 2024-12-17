import { Tabs } from "expo-router";
import { Text, View, Animated } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState,useRef  } from "react";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/ThemeProvider";

const TabLayout = () => {
    const { theme, isDarkMode } = useTheme();

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
    <Animated.View style={{ flex: 1, backgroundColor:backgroundColor }}>
        <Tabs  
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {

                if (route.name === "home/index") {
                    return focused ? <FontAwesome name="home" size={24} color={theme.background} /> : <AntDesign name="home" size={24} color={theme.background} />;
                } else if (route.name === "profile/index") {
                    return focused ? <Ionicons name="person" size={24} color={theme.background} /> : <Ionicons name="person-outline" size={24} color={theme.background} />
                }

            },
            title: '',
            headerShown: false,
            tabBarStyle: {
                backgroundColor: theme.text,
                marginBottom: 20,
                marginHorizontal: 20,
                borderRadius: 10,
                paddingTop: 5,
            }
            
        })}>
            
        </Tabs>
    </Animated.View>
    );
};

export default TabLayout;
