import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";

const TabLayout = () => {
    return (
        <Tabs screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {

                if (route.name === "home/index") {
                    return focused ? <FontAwesome name="home" size={24} color="black" /> : <AntDesign name="home" size={24} color="black" />;
                } else if (route.name === "profile/index") {
                    return focused ? <Ionicons name="person" size={24} color="black" /> : <Ionicons name="person-outline" size={24} color="black" />
                }

            },
            title: '',
            headerShown: false,
            tabBarStyle: {
                marginBottom: 20,
                marginHorizontal: 20,
                borderRadius: 10,
                paddingTop: 5,
            }
        })}>

        </Tabs>
    );
};

export default TabLayout;
