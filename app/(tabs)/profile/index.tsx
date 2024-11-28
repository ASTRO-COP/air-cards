import { StyleSheet, Text, View } from "react-native";

const ProfilePage = () => {
    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center', fontSize: 40,}}>Profile Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    }
})

export default ProfilePage;