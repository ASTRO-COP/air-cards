import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

interface SetProps {
    title: string;
    description: string;
    color: string;
}

const SetCard: React.FC<SetProps> = ({ title, description, color }) => {
    return (
        <TouchableOpacity
        style={[styles.container, { backgroundColor: color }]}
        onPress={() => router.push('/cardDetail')}
        >
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={()=> router.push('/#')}>
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
        borderTopLeftRadius:25,
        borderBottomRightRadius:25,
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

export default SetCard;
