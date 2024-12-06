import SetCard from "@/components/SetCreateCard";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    StatusBar,
} from "react-native";

const HomePage = () => {
    const [data, setData] = useState([
        { id: 1, name: "Set 1", description: "This is set 1", color: "#f28b82" },
        { id: 2, name: "Set 2", description: "This is set 2", color: "#fbbc04" },
        { id: 3, name: "Set 3", description: "This is set 3", color: "#34a853" },
        { id: 4, name: "Set 4", description: "This is set 4", color: "#4285f4" },
    ]);

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity
                        style={{ paddingLeft: 5 }}
                        onPress={() => router.push("/home")}
                    >
                        <FontAwesome6 name="reply" size={28} color="black" />
                    </TouchableOpacity>
                    
                    <Text style={styles.titleText}>Air Cards</Text>
                    <TouchableOpacity
                        style={{ paddingTop: 3 }}
                        onPress={() =>
                            router.push({
                                pathname: "/setPage_createCard",
                            })
                        }
                    >
                        <AntDesign name="pluscircle" size={28} color="black" />
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={styles.cardContainer}
                    data={data}
                    numColumns={2} 
                    renderItem={({ item }) => (
                        <View style={styles.cardWrapper}>
                            <SetCard
                                title={item.name}
                                description={item.description}
                                color={item.color}
                            />
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        maxWidth: "100%",
        marginTop: 50,
        flexDirection: "row",
        paddingHorizontal: 20,
        justifyContent: "space-between",
        alignItems: "center",
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "black",
    },
    cardContainer: {
        marginTop: 40,
        paddingHorizontal: 10,
    },
    cardWrapper: {
        flex: 1,
        margin: 5, 
    },
});

export default HomePage;
