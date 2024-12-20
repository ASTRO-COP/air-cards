import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ViewBase } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { fetchData } from "@/hooks/api";

const EditProfilePage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        const uid = await SecureStore.getItemAsync('uid');
        
        setLoading(true);
        try {
            const result = await fetchData(`/users/${uid}`)
            setEmail(result.email);
            setUsername(result.username);
        } catch (err) {
            console.error(err);
        }

    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={styles.container}>
            
            <View style={styles.contentContainer}>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    contentContainer: {
        width: '100%',
        height: '40%',
        backgroundColor: 'black',
    }
});

export default EditProfilePage;
