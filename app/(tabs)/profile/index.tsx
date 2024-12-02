import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { router } from "expo-router";

const ProfilePage = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={async () => {
                await SecureStore.deleteItemAsync('uid');
                router.replace('/');
            }}>
                <Text style={{ textAlign: "center", fontSize: 40 }}>
                    Log out
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
    },
});

export default ProfilePage;
