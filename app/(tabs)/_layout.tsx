import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/ThemeProvider";

const TabLayout = () => {
    const { theme, isDarkMode } = useTheme();

    return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
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
    </View>
    );
};

export default TabLayout;
