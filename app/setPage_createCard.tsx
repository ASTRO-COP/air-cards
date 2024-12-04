import { Text } from "react-native";
import {  
    StyleSheet,
    TouchableOpacity,
    View,
    FlatList,
    StatusBar,
    TextInput, 
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const setPage_createCard = () => {
  return (
<>
    <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Create Card</Text>
                    <TouchableOpacity>
                        <FontAwesome6 name="save" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} placeholder="Title" />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            multiline={true}
                        />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <Picker
                            placeholder="Category"
                            style={styles.input}
                        >
                            <Picker.Item label="School" value="school" />
                            <Picker.Item label="Work" value="work" />
                            <Picker.Item label="Others" value="other" />
                        </Picker>
                    </View>
                </View>
            </View>

            
</>
  );
}

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
export default setPage_createCard;
