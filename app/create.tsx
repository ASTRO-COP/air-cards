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
    Touchable,
    TouchableOpacity,
    View,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { deleteData, fetchData, postData, updateData } from "@/hooks/api";
import { router } from "expo-router";
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";
import React from "react";

const createPage = () => {
    const { state, setId } = useLocalSearchParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [selectedColor, setSelectedColor] = useState("#0A5EB0");
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
                const result = await fetchData(`/sets/${setId}`);
                setName(result.name);
                setDescription(result.description);
                setCategory(result.category);
                setSelectedColor(result.color);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        state === "update" && getData();
    }, []);

    const createSet = async () => {
        const uid = await SecureStore.getItemAsync("uid");

        const data = {
            name: name,
            belongs: uid,
            description: description,
            category: category,
            color: selectedColor,
        };

        setLoading(true);
        try {
            const result = await postData("/sets", data);
            console.log(result);
            router.replace("/(tabs)/home");
        } catch (err) {
            console.log(err);
        }
    };

    const updateSet = async () => {
        const data = {
            name: name,
            description: description,
            category: category,
            color: selectedColor,
        };

        setLoading(true);
        try {
            const result = await updateData(`/sets/${setId}`, data);
            console.log(result);
            router.push("/(tabs)/home");
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteSet = async () => {
        setLoading(true);
        try {
            const result = await deleteData(`/sets/${setId}`);
            console.log(result);
            router.push("/(tabs)/home");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
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
                        {state === "create" ? "Create New Set" : "Update Set"}
                    </Text>
                    <TouchableOpacity
                        onPress={() =>
                            state === "create" ? createSet() : updateSet()
                        }
                    >
                        <FontAwesome6 name="save" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={name}
                            placeholder="Name"
                            onChangeText={(text) => setName(text)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={description}
                            placeholder="Description"
                            multiline={true}
                            onChangeText={(text) => setDescription(text)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Picker
                            selectedValue={category}
                            onValueChange={(item) => setCategory(item)}
                            placeholder="Category"
                            style={styles.input}
                        >
                            <Picker.Item label="School" value="school" />
                            <Picker.Item label="Work" value="work" />
                            <Picker.Item label="Others" value="other" />
                        </Picker>
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
                <TouchableOpacity
                    style={[
                        styles.deleteBtn,
                        state === "create"
                            ? { display: "none" }
                            : { display: "flex" },
                    ]}
                    onPress={() => deleteSet()}
                >
                    <Text style={{ fontSize: 24, color: "white" }}>Delete</Text>
                </TouchableOpacity>
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
    deleteBtn: {
        marginTop: "auto",
        width: "90%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        marginBottom: 40,
        height: 60,
        borderRadius: 10,
    },
});

export default createPage;
