import React from 'react';
import { StyleSheet, Text, View, Button, Alert,TouchableOpacity } from 'react-native';
import { router } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const CardDetail = () => {
  const showAlert = () => {
    Alert.alert("Hello!", "Welcome to my simple React Native app!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
          <TouchableOpacity
            style={{ paddingLeft: 5 }}
            onPress={() => router.push("/setPage")}
          >
            <FontAwesome6 name="reply" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.titleText}>Create Card</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="content-save-check" size={35} color="black" />
          </TouchableOpacity>
        </View>
    </View>
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
});

export default CardDetail;