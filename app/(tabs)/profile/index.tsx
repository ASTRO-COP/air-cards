import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { router } from "expo-router";
import { AntDesign, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { fetchData } from "@/hooks/api";
import { useTheme } from "../../../hooks/ThemeProvider";

const ProfilePage = () => {
    const { theme, toggleTheme, isDarkMode } = useTheme();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const uid = await SecureStore.getItemAsync('uid');
            setLoading(true);
            try {
                const result = await fetchData(`/users/${uid}`);
                console.log(result);
                setUsername(result.username);
                setEmail(result.email);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [])

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.titleContainer}>
                <MaterialCommunityIcons name="face-man-profile" size={100} color="black" />
                <Text style={styles.title}>{"trav.whoami"}</Text>
                <Text style={styles.subTitle}>{email}</Text>

                <TouchableOpacity style={styles.editBtn}>
                    <Text style={{ color: 'white', fontSize: 18}}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                <Text style={styles.bodyTitle}>Inventories</Text>

                <View style={styles.bodyContent}>
                    <TouchableOpacity style={styles.bodyItem}>
                        <View style={{ flexDirection: 'row', gap: 10}}>
                            <AntDesign name="profile" size={24} color="black" />
                            <Text style={{ fontSize: 16}}>About Astro Logic</Text>
                        </View>
                        <AntDesign name="arrowright" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.bodyItem, { borderBottomWidth: 0 }]} onPress={() => {
                        SecureStore.deleteItemAsync('uid');
                        router.replace('/auth/login');
                    }}>
                        <View style={{ flexDirection: 'row', gap: 10}}>
                            <FontAwesome name="support" size={24} color="black" />
                            <Text style={{ fontSize: 16}}>Support</Text>
                        </View>
                        <AntDesign name="arrowright" size={24} color="black" />
                    </TouchableOpacity>
                </View>
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
        marginTop: 60,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 10,
    },
    subTitle: {
        fontSize: 14,
        color: 'gray',
    },
    editBtn: {
        width: 130,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1A1D',
        borderRadius: 100,
        marginTop: 15,
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 40,
    },
    bodyTitle: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 25,
    },
    bodyContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
        backgroundColor: 'lightgray',
        marginTop: 10,
        borderRadius: 30,
        paddingHorizontal: 10,
    },
    bodyItem: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 60,
        borderColor: 'black',
        borderBottomWidth: 1,
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
        justifyContent:'space-between',
    },
});

export default ProfilePage;