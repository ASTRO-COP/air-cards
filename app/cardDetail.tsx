import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { router } from "expo-router";

const CardDetail = () => {
  const showAlert = () => {
    Alert.alert("Hello!", "Welcome to my simple React Native app!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My Simple App</Text>
      <Button title="Press me" onPress={showAlert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default CardDetail;