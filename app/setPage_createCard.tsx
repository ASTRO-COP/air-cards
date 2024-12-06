import React, { useState, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity, View, TextInput } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";

const setPage_createCard = () => {
  // Set the current date and time without seconds
  const [date, setDate] = useState("");

  useEffect(() => {
    const formatDate = () => {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString("en-GB", {
        weekday: "short", // Optional: day of the week (e.g., Mon, Tue)
        year: "numeric",
        month: "short",  // Short month (e.g., Jan, Feb)
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // 12-hour format (use false for 24-hour format)
      });
      setDate(formattedDate); // Set the formatted date and time
    };

    formatDate(); // Call it initially to set the current date/time

    const interval = setInterval(() => {
      formatDate(); // Update the time every minute
    }, 60000); // 60000ms = 1 minute

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  return (
    <>
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

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Title" />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Definition"
              multiline={true}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Content"
              multiline={true}
            />
          </View>

          {/* Display current date and time without seconds */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>
              {date} {/* Display the formatted date and time */}
            </Text>
          </View>
        </View>
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
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 50,
    gap: 30,
  },
  inputContainer: {
    borderColor: "gray",
    borderBottomWidth: 1,
  },
  input: {
    fontSize: 18,
    color: "black",
  },
  inputText: {
    fontSize: 18,
    color: "black",
  },
});

export default setPage_createCard;
