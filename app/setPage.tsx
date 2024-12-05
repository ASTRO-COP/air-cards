import { Text } from "react-native";
import {  
    StyleSheet,
    TouchableOpacity,
    View,
    FlatList,
    StatusBar, 
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const SetPage = () => {
    const data = [
        { id: '1', title: 'Card 1', description: 'Bla bla bla 34',type: 'text1'},
        { id: '2', title: 'Card 2', description: 'Bla bla blav55',type: 'text2' },
        { id: '3', title: 'Card 3', description: 'Bla bla bla6565',type: 'text3' },
        { id: '4', title: 'Card 4', description: 'Bla bla bla 78',type: 'text4' }, // Added a fourth card for demonstration
    ];

    const renderItem = ({ item }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <TouchableOpacity>
                <AntDesign name="ellipsis1" size={20} color="black" />
            </TouchableOpacity>
        </View>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <Text style={styles.cardDescription}>{item.type}</Text>
    </View>
    );

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Set Page</Text>
                    <TouchableOpacity style={{ paddingTop: 3 }}
                        onPress={() =>
                            router.push({
                                pathname: "/setPage_createCard",
                            })
                        }
                    >
                        <AntDesign name="pluscircle" size={28} color="black" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.cardList}
                />
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
    cardList: {
        padding: 20,
    },
    card: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        
    },
    cardTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#7450ff',
    },
    cardDescription: {
        marginTop: 10,
        fontSize: 16,
    },
});

export default SetPage;