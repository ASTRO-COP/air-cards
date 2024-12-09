import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const CardDetail = () => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const [isColorOptionsVisible, setColorOptionsVisible] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Default background color

  const toggleOptionsMenu = () => {
    setOptionsVisible(!isOptionsVisible);
  };

  const toggleColorOptions = () => {
    setColorOptionsVisible(!isColorOptionsVisible);
  };

  const closeOptionsMenu = () => {
    if (isOptionsVisible) setOptionsVisible(false);
    if (isColorOptionsVisible) setColorOptionsVisible(false);
  };

  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink']; // Add more colors as needed

  return (
    <TouchableWithoutFeedback onPress={closeOptionsMenu}>
      <View style={[styles.container, { backgroundColor }]}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={{ paddingLeft: 5 }}
            onPress={() => router.push('/setPage')}
          >
            <FontAwesome6 name="reply" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.titleText}>Create Detail</Text>
          <TouchableOpacity onPress={toggleColorOptions}>
            <FontAwesome6 name="paint-roller" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleOptionsMenu}>
            <SimpleLineIcons name="options-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[styles.card]}>
          <Text style={styles.cardTitle}>Title</Text>
          <Text style={styles.cardDescription}>balabal</Text>
        </View>

        {/* Bottom Color Options */}
        {isColorOptionsVisible && (
          <View style={styles.bottomOptionsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.colorScrollView}
            >
              {colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.colorOption, { backgroundColor: color }]}
                  onPress={() => {
                    setBackgroundColor(color); // Update background color
                    setColorOptionsVisible(false);
                  }}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'green',
  },
  titleContainer: {
    maxWidth: '100%',
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  card: {
    flex: 1,
    margin: 30,
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 20,
    color: '#000000',
  },
  bottomOptionsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 50,
    backgroundColor: '#020c24',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -2 },
  },
  colorScrollView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorOption: {
    width: 100,
    height: 130,
    borderRadius: 10,
    marginHorizontal: 10,
  },
});

export default CardDetail;
