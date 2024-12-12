import { FontAwesome6 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { fetchData, postData, updateData } from "@/hooks/api";
import { router } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import React from "react";

const createCardPage = () => {
    const { state, setId, cardId } = useLocalSearchParams();
    const [name, setName] = useState("");
    const [definition, setDefinition] = useState("");
    const [content, setContent] = useState("");
    const [selectedColor, setSelectedColor] = useState("#0A5EB0");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const colors = [
        "#0A5EB0",
        "#D91656",
        "#FFB200",
        "#4335A7",
        "#7ED4AD",
        "#1A1A1D",
    ];

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const result = await fetchData(`/cards/${cardId}`);
                setData(result);
                setSelectedColor(result.color);
                setName(result.name);
                setDefinition(result.definition);
                setContent(result.content);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        state === "update" && getData();
    }, []);

    const createCard = async () => {
        const cardData = {
            name: name,
            belongs: setId,
            definition: definition,
            content: content,
            color: selectedColor,
        };

        if (name !== "" && definition !== "") {
            setLoading(true);
            try {
                const result = await postData("/cards", cardData);
                console.log(result);
                router.replace("/(tabs)/home");
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

    };

    const updateCard = async () => {
        const cardData = {
            name: name,
            definition: definition,
            content: content,
            color: selectedColor,
        };

        if (name !== "" && definition !== "") {
            setLoading(true);
            try {
                const result = await updateData(`/cards/${cardId}`, cardData);
                console.log(result);
                console.log(name);
                router.replace("/(tabs)/home");
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

    };

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={true}
            />
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        {state === "create" ? "Create New Card" : "Update Set"}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            state === "create" ? createCard() : updateCard();
                        }}
                    >
                        <FontAwesome6 name="save" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={name}
                            placeholder={"Name"}
                            onChangeText={(text) => setName(text)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={definition}
                            placeholder={"Definition"}
                            multiline={true}
                            onChangeText={(text) => setDefinition(text)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={content}
                            placeholder={"Content"}
                            multiline={true}
                            onChangeText={(text) => setContent(text)}
                        />
                    </View>

                    <View style={styles.colorContainer}>
                        {colors.map((color) => (
                            <TouchableOpacity
                                key={color}
                                style={[
                                    styles.colorSelector,
                                    { backgroundColor: color },
                                    selectedColor === color &&
                                        styles.selectedColor,
                                ]}
                                onPress={() => {
                                    setSelectedColor(color);
                                    console.log(selectedColor);
                                }}
                            />
                        ))}
                    </View>
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
        paddingTop: 50,
        paddingBottom: 20,
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 20,
        justifyContent: "space-between",
        alignItems: "center",
    },
    titleText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "black",
    },
    formContainer: {
        paddingHorizontal: 20,
        marginTop: 50,
        gap: 30,
    },
    inputContainer: {
        borderColor: "gray",
        borderBottomWidth: 1,
    },
    input: {
        fontSize: 18,
        color: "black",
    },
    colorContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    colorSelector: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    selectedColor: {
        borderColor: "black",
        borderWidth: 3,
    },
});

export default createCardPage;
