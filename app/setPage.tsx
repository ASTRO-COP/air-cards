import SetCard from "@/components/SetCreateCard";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import { router } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    StatusBar,
} from "react-native";
import { Menu, MenuItem } from 'react-native-material-menu'; // Example: React Native Material Menu

const setPage = () => {
    const [data, setData] = useState([
        { id: 1, name: "Set 1", description: "This is set 1", color: "#f28b82" },
        { id: 2, name: "Set 2", description: "This is set 2", color: "#fbbc04" },
        { id: 3, name: "Set 3", description: "This is set 3", color: "#34a853" },
        { id: 4, name: "Set 4", description: "This is set 4", color: "#4285f4" },
    ]);

    const [isGridView, setIsGridView] = useState(true); // State to toggle view
    const [menuVisible, setMenuVisible] = useState(false); // Dropdown visibility

    const toggleLayout = (layout) => {
        setIsGridView(layout === "grid");
        setMenuVisible(false); // Close dropdown after selection
    };

    const [selected, setSelected] = useState('All'); // State to track the selected button

    const handlePress = (buttonName) => {
        setSelected(buttonName); // Update the state with the button name
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity
                        style={{ paddingLeft: 5 }}
                        onPress={() => router.push("/home")}
                    >
                        <FontAwesome6 name="reply" size={28} color="black" />
                    </TouchableOpacity>
                    
                    <Text style={styles.titleText}>Air Cards</Text>
                    
                   {/* Dropdown Button */}
                    <Menu
                        visible={menuVisible}
                        anchor={
                            <TouchableOpacity
                                style={styles.dropdownButton}
                                onPress={() => setMenuVisible(true)}
                            >
                                <Text>
                                    {isGridView ? <Feather name="grid" size={24}  color="white" />: <FontAwesome name="th-list" size={23} color="white" />}
                                </Text>
                            </TouchableOpacity>
                        }
                        onRequestClose={() => setMenuVisible(false)}
                    >
                        <MenuItem onPress={() => toggleLayout("grid")}  >
                            <Feather name="grid" size={24} color="black"  /> Grid
                        </MenuItem>
                        <MenuItem onPress={() => toggleLayout("list")} >
                            <Feather name="list" size={24} color="black" /> List
                        </MenuItem>
                    </Menu>
                    <TouchableOpacity
                        onPress={() =>
                            router.push({
                                pathname: "/",
                            })
                        }
                    >
                        
                        <AntDesign name="pluscircle" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.sortContainer}>
                    {/* "All" button */}
                    <TouchableOpacity onPress={() => handlePress('All')}>
                        <Text
                            style={[
                                styles.sortText,
                                selected === 'All' && styles.selectedText, // Highlight if selected
                            ]}
                        >
                            All
                        </Text>
                    </TouchableOpacity>

                    {/* "Latest" button */}
                    <TouchableOpacity onPress={() => handlePress('Latest')}>
                        <Text
                            style={[
                                styles.sortText2,
                                selected === 'Latest' && styles.selectedText, // Highlight if selected
                            ]}
                        >
                            Latest
                        </Text>
                    </TouchableOpacity>

                    {/* "Oldest" button */}
                    <TouchableOpacity onPress={() => handlePress('Oldest')}>
                        <Text
                            style={[
                                styles.sortText,
                                selected === 'Oldest' && styles.selectedText, // Highlight if selected
                            ]}
                        >
                            Oldest
                        </Text>
                    </TouchableOpacity>

                    {/* "A-Z" button */}
                    <TouchableOpacity onPress={() => handlePress('A-Z')}>
                        <Text
                            style={[
                                styles.sortText2,
                                selected === 'A-Z' && styles.selectedText, // Highlight if selected
                            ]}
                        >
                            A-Z
                        </Text>
                    </TouchableOpacity>
                </View>
                

                <FlatList
                    key={`${isGridView}`} // Unique key to force re-render
                    style={styles.cardContainer}
                    data={data}
                    numColumns={isGridView ? 2 : 1} // Set number of columns based on the layout
                    renderItem={({ item }) => (
                        <View style={styles.cardWrapper}>
                            <SetCard
                                title={item.name}
                                description={item.description}
                                color={item.color}
                            />
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
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
    dropdownButton: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        backgroundColor: "#000000",
        justifyContent: "center",
        marginTop:2,
        marginLeft: 15,
        borderWidth:2,
        borderColor: '#c2c0c0',
    },
    cardContainer: {
        marginTop: 40,
        paddingHorizontal: 10,
    },
    cardWrapper: {
        flex: 1,
        margin: 5, 
    },
    sortContainer:{
        flexDirection: "row",
        marginLeft: 10,
    },
    sortText:{
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        marginLeft: 10,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderWidth:2,
        borderColor: '#c2c0c0',
        borderTopLeftRadius: 10,
        borderTopRightRadius:25,
        borderBottomLeftRadius:10,
        borderBottomRightRadius: 5,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        backgroundColor: "#f7f2f2",
        shadowColor: "#000",
    },
    sortText2:{
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        marginLeft: 10,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderWidth:2,
        borderColor: '#c2c0c0',
        borderTopLeftRadius: 10,
        borderTopRightRadius:5,
        borderBottomLeftRadius:25,
        borderBottomRightRadius: 10,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        backgroundColor: "#f7f2f2",
        shadowColor: "#000",
    },
    selectedText: {
        fontWeight: 'bold',
        backgroundColor: '#000000',
        color: '#ffffff',
    },
});

export default setPage;
