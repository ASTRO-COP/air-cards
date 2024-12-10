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

const themes = {
  white: { backgroundColor: 'white', textColor: 'black', titleColor: 'black', buttonColor: '#6e6969',colorOptionBg: '#a6a6a6' },
  black: { backgroundColor: 'black', textColor: 'white', titleColor: 'white', buttonColor: 'lightgray', colorOptionBg: 'lightgray' },
  gray: { backgroundColor: 'gray', textColor: 'black', titleColor: 'lightgray', buttonColor: '#cad9b6',colorOptionBg:'darkgray'},
  red: { backgroundColor: 'red', textColor: 'white', titleColor: '#000000', buttonColor: 'lightgray',colorOptionBg:'lightgray' },
  blue: { backgroundColor: 'blue', textColor: 'white', titleColor: 'cyan', buttonColor: '#95d7ed',colorOptionBg:'#152b70' },
  green: { backgroundColor: 'green', textColor: 'black', titleColor: 'lime', buttonColor: '#62fc65',colorOptionBg:'#036305' },
  yellow: { backgroundColor: 'yellow', textColor: 'black', titleColor: 'orange', buttonColor: 'brown',colorOptionBg:'#8f8500' },
  purple: { backgroundColor: 'purple', textColor: 'white', titleColor: 'violet', buttonColor: 'pink',colorOptionBg:'#440752' },
  orange: { backgroundColor: 'orange', textColor: 'black', titleColor: '#ff6a00', buttonColor: 'brown',colorOptionBg:'#855000' },
  pink: { backgroundColor: 'pink', textColor: 'black', titleColor: 'red', buttonColor: 'maroon',colorOptionBg: 'maroon'},
};

const CardDetail = () => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(themes.white);
  const [isColorOptionsVisible, setIsColorOptionsVisible] = useState(false);

  const toggleOptionsMenu = () => {
    setOptionsVisible(!isOptionsVisible);
  };

  const toggleColorOptions = () => {
    setIsColorOptionsVisible(!isColorOptionsVisible);
  };

  const closeOptionsMenu = () => {
    setOptionsVisible(false);
    setIsColorOptionsVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={closeOptionsMenu}>
      <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={{ paddingLeft: 5 }}
            onPress={() => router.push('/setPage')}
          >
            <FontAwesome6 name="reply" size={28} color={currentTheme.buttonColor} />
          </TouchableOpacity>
          <Text style={[styles.titleText, { color: currentTheme.titleColor }]}>Create Detail</Text>
          <TouchableOpacity onPress={toggleColorOptions}>
            <FontAwesome6 name="paint-roller" size={24} color={currentTheme.buttonColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleOptionsMenu}>
            <SimpleLineIcons name="options-vertical" size={24} color={currentTheme.buttonColor}/>
          </TouchableOpacity>
        </View>
        <View style={[styles.card]}>
          <Text style={[styles.cardTitle, { color: currentTheme.titleColor }]}>Title</Text>
          <Text style={[styles.cardDatetime, { color: currentTheme.textColor }]}>2024-12-10 12:00 PM</Text>
          <Text style={[styles.cardDescription, { color: currentTheme.textColor }]}>definition</Text>
          <Text style={[styles.cardDescription, { color: currentTheme.textColor }]}>content</Text>
        </View>

        {/* Options Menu */}
        {isOptionsVisible && (
          <View style={styles.optionsMenu}>
            <TouchableOpacity style={styles.optionItem} onPress={() => alert('Edit clicked')}>
              <Text style={styles.optionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem2} onPress={() => alert('Delete clicked')}>
              <Text style={styles.optionText2}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Show Color Options only when isColorOptionsVisible is true */}
        {isColorOptionsVisible && (
          <View
            style={[
              styles.bottomOptionsContainer,
              { backgroundColor: currentTheme.colorOptionBg }, // Change background color dynamically
            ]}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.colorScrollView}
            >
              {Object.entries(themes).map(([colorKey, theme], index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.colorOption, { backgroundColor: theme.backgroundColor }]}
                  onPress={() => {
                    setCurrentTheme(theme);
                    setIsColorOptionsVisible(false); // Close the color options after selecting a theme
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
  },
  cardDatetime:{
    fontSize: 12,
    margin: 20,
  },
  cardDescription: {
    fontSize: 20,
    marginBottom:15,
  },
  cardContent:{
    fontSize: 12,
    margin: 20,
  },
  optionsMenu: {
    position: 'absolute',
    top: 100, // Adjust based on the position of your button
    right: 20,
    backgroundColor: '#747475',
    padding: 0,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  optionItem: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#636363',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  optionItem2: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#636363',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  optionText: {
    fontSize: 16,
    color: '#d9d9db',
  },
  optionText2:{
    fontSize: 16,
    color: '#ff1e00',
  },
  bottomOptionsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 50,
    backgroundColor: '#020c24',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
