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
import * as SecureStore from 'expo-secure-store';
import { postData } from "@/hooks/api";
import { router } from "expo-router";

const createPage = () => {
    const { state } = useLocalSearchParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
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
        console.log(state);
    }, [])

    const createSet = async () => {
        const uid = await SecureStore.getItemAsync('uid');

        const data = {
            name: name,
            belongs: uid,
            description: description,
            category: category,
            color: selectedColor,
        }

        setLoading(true);
        try {
            const result = await postData('/sets', data);
            console.log(result);
            router.replace('/(tabs)/home');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={true}
            />
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{ state === "create" ? "Create New Set" : "Update Set" }</Text>
                    <TouchableOpacity onPress={() => createSet()}>
                        <FontAwesome6 name="save" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} placeholder="Name" onChangeText={(text) => setName(text)} />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
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

export default createPage;
