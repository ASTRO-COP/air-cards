import { Text } from "react-native";
import {  
    StyleSheet,
    TouchableOpacity,
    View,
    FlatList,
    StatusBar, 
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const DATA = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
    { id: '5', title: 'Item 5' },
];

const SetPage = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Set Page</Text>
                    <TouchableOpacity style={{ paddingTop: 3 }}
                    onPress={() =>
                        router.push({
                            pathname: "/setPage_createCard",
                        })
                    }
                    >
                        <AntDesign name="pluscircle" size={28} color="black" />
                    </TouchableOpacity>
                </View>
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
        display: "flex",
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
});

export default SetPage;