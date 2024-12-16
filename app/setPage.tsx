import SetCard from "@/components/SetCreateCard";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    StatusBar,
} from "react-native";
import { Menu, MenuItem } from 'react-native-material-menu'; // Example: React Native Material Menu
import { fetchData } from "@/hooks/api";
import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { useTheme } from "../hooks/ThemeProvider";

interface CardData {
    name: string;
    definition: string;
    content: string;
    color: string;
    datetime: Date;
    _id: string;
}

const SetPage = () => {

    const { theme, toggleTheme, isDarkMode } = useTheme();

    const { setId } = useLocalSearchParams(); 
    const isFocused = useIsFocused();

    const [data, setData] = useState<CardData[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchData(`/cards/search?belongs=${setId}`);
                setData(result);
            } catch (err) {
                console.log(err);
            }
        }
        getData();

        if (isFocused) {
            getData();
        }
    }, []);

    const [isGridView, setIsGridView] = useState(true); // State to toggle view
    const [menuVisible, setMenuVisible] = useState(false); // Dropdown visibility

    const toggleLayout = (layout: string) => {
        setIsGridView(layout === "grid");
        setMenuVisible(false); // Close dropdown after selection
    };

    const [selected, setSelected] = useState('All'); // State to track the selected button

    const handlePress = (buttonName: string) => {
        setSelected(buttonName); // Update the state with the button name
    };

    return (
        <>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.background} />
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity
                        style={{ paddingLeft: 5 }}
                        onPress={() => router.push("/home")}
                    >
                        <FontAwesome6 name="reply" size={28} color="black" />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: theme.text }]}>Air Cards</Text>
                        <Button title="Toggle Theme" onPress={toggleTheme} />
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
                                pathname: "/createCard",
                                params: {
                                    state: 'create',
                                    setId: setId,
                                }
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
                                definition={item.definition}
                                color={item.color}
                                teleport={() => {
                                    router.push({
                                        pathname: '/cardDetail',
                                        params: {
                                            cardId: item._id,
                                        }
                                    })
                                }}
                                updateTeleport={() => {
                                    router.push({
                                        pathname: '/createCard',
                                        params: {
                                            state: 'update',
                                            cardId: item._id,
                                        }
                                    })
                                }}
                            />
                        </View>
                    )}
                    keyExtractor={(item) => item._id.toString()}
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

export default SetPage;
