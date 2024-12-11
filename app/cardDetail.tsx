import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    TouchableWithoutFeedback,
    ScrollView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { fetchData } from "@/hooks/api";

const CardDetail = () => {
    const [isOptionsVisible, setOptionsVisible] = useState(false);
    const [isColorOptionsVisible, setIsColorOptionsVisible] = useState(false);
    const [data, setData] = useState([]);
    const { setId } = useLocalSearchParams();

    const toggleOptionsMenu = () => {
        setOptionsVisible(!isOptionsVisible);
    };

    const closeOptionsMenu = () => {
        setOptionsVisible(false);
        setIsColorOptionsVisible(false);
    };

    useEffect(() => {
      const getData = async () => {
        try {
          const result = await fetchData(`/cards/${setId}`);
          setData(result);
        } catch (err) {
          console.log(err);
        }
      }
      getData();
    }, []);

    return (
        <TouchableWithoutFeedback onPress={closeOptionsMenu}>
            <View style={[styles.container]}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="transparent"
                    translucent={true}
                />
                <View style={styles.titleContainer}>
                    <TouchableOpacity
                        style={{ paddingLeft: 5 }}
                        onPress={() => router.back()}
                    >
                        <FontAwesome6
                            name="reply"
                            size={28}
                            color={"#1A1A1D"}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.titleText, { color: "black" }]}>
                        Create Detail
                    </Text>
                    <TouchableOpacity onPress={toggleOptionsMenu}>
                        <SimpleLineIcons
                            name="options-vertical"
                            size={24}
                            color={"black"}
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.card]}>
                    <Text style={[styles.cardTitle, { color: "black" }]}>
                        {data.name}
                    </Text>
                    <Text style={[styles.cardDatetime, { color: "black" }]}>
                        {data.datetime}
                    </Text>
                    <Text style={[styles.cardDescription, { color: "black" }]}>
                        {data.definition}
                    </Text>
                    <Text style={[styles.cardDescription, { color: "black" }]}>
                        {data.content}
                    </Text>
                </View>

                {/* Options Menu */}
                {isOptionsVisible && (
                    <View style={styles.optionsMenu}>
                        <TouchableOpacity
                            style={styles.optionItem}
                            onPress={() => router.push({
                              pathname: '/createCard',
                              params: {
                                state: 'update'
                              }
                            })}
                        >
                            <Text style={styles.optionText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.optionItem2}
                            onPress={() => alert("Delete clicked")}
                        >
                            <Text style={styles.optionText2}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
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
    card: {
        flex: 1,
        margin: 30,
    },
    cardTitle: {
        fontSize: 30,
        fontWeight: "bold",
    },
    cardDatetime: {
        fontSize: 12,
        margin: 20,
    },
    cardDescription: {
        fontSize: 20,
        marginBottom: 15,
    },
    cardContent: {
        fontSize: 12,
        margin: 20,
    },
    optionsMenu: {
        position: "absolute",
        top: 100, // Adjust based on the position of your button
        right: 20,
        backgroundColor: "#747475",
        padding: 0,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    optionItem: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: "#636363",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    optionItem2: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: "#636363",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    optionText: {
        fontSize: 16,
        color: "#ffffff",
    },
    optionText2: {
        fontSize: 16,
        color: "#ff1e00",
    },
    bottomOptionsContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 50,
        backgroundColor: "#020c24",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: -2 },
    },
    colorScrollView: {
        flexDirection: "row",
        alignItems: "center",
    },
    colorOption: {
        width: 100,
        height: 130,
        borderRadius: 10,
        marginHorizontal: 10,
    },
});

export default CardDetail;
