import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SetProps {
    title: string;
    description: string;
    color: string;
    teleport: () => void;
    updateTeleport: () => void;
}

const Set: React.FC<SetProps> = ({ title, description, color, teleport, updateTeleport }) => {
    return (
        <TouchableOpacity
            onPress={() => teleport()}
            style={[styles.container, { backgroundColor: color }]}
        >
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={() => updateTeleport()}>
                    <Feather name="edit" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <Text style={styles.description}>{description}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 150,
        elevation: 5,
        borderRadius: 10,
        paddingTop: 10,
        marginBottom: 20,
    },
    titleContainer: {
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "semibold",
        color: "#FFF6E9",
    },
    description: {
        marginHorizontal: 18,
        marginTop: 10,
        color: "#FFF6E9",
    },
});

export default Set;
