import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { fetchData } from "@/hooks/api";

const ProfilePage = () => {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const uid = await SecureStore.getItemAsync('uid');
            setLoading(true);
            try {
                const result = await fetchData(`/users/${uid}`);
                console.log(result);
                setUsername(result.username);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <MaterialCommunityIcons name="face-man-profile" size={150} color="black" />
                <Text style={styles.titleText}>{username}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 70,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'semibold',
    }
});

export default ProfilePage;