import { StyleSheet, Text, View } from "react-native";

const CreatePage = () => {
    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center', fontSize: 40, }}>Create Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
    }
})


export default CreatePage;