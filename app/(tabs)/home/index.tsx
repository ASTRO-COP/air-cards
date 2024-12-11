import Set from "@/components/Set";
import { fetchData } from "@/hooks/api";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    StatusBar,
} from "react-native";
import * as SecureStore from 'expo-secure-store';



const HomePage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        const getData = async () => {
            const uid = await SecureStore.getItemAsync('uid');
            setLoading(true);
            try {
                const result = await fetchData(`/sets/search?belongs=${uid}`);
                setData(result);
                console.log(data._id)
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [])

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Air Cards</Text>

                    <TouchableOpacity
                        style={{ paddingTop: 3 }}
                        onPress={() =>
                            router.push({
                                pathname: "/create",
                                params: {
                                    state: 'create',
                                }
                            })
                        }
                    >
                        <AntDesign name="pluscircle" size={28} color="black" />
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={styles.cardContainer}
                    data={data.reverse()}
                    renderItem={({ item, index }) => (
                        <Set
                            key={index}
                            title={item.name}
                            description={item.description}
                            color={item.color}
                            teleport={() => {
                                router.push({
                                    pathname: '/setPage',
                                    params: {
                                        setId: item._id
                                    }
                                })
                            }}
                        />
                    )}
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
    cardContainer: {
        marginTop: 40,
        paddingHorizontal: 25,
    },
});

export default HomePage;
