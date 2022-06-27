import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/Colors";
import { LinearGradient } from 'expo-linear-gradient';


const { width } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;

const GenreCard = ({ genreName, active, onPress }) => {

  const gradientColors = active ? [Colors.BlueText, Colors.Heart] : [Colors.BlueMedium, Colors.BlueDark];

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
      }}
      onPress={() => { onPress(genreName); }}
    >

      <LinearGradient
        colors={gradientColors}
        start = {{x:1, y: 0}}
        end = {{x:0, y: 1}}
        style={{
          ...styles.linearGradient
        }}
      >

          <Text
            style={{
              ...styles.genreText,
              color: Colors.GrayText,
            }}
          >
            {genreName}
          </Text>


     </LinearGradient>      

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  linearGradient:{
    width: '100%',
    height: '70%',
    borderRadius: 5,
    padding: '5%',
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
  container: {
    backgroundColor: 'transparent',
    elevation: 3,
    width: setWidth(35),
    position: 'relative',
    height: setWidth(20),
    marginBottom: 3,
    flex: 1,
    justifyContent: 'center',
  },
  genreText: {
    fontSize: 14,
    color: Colors.GrayDarkText,
    fontFamily: 'RalewaySemiBold',
    textAlign: "center",
    alignSelf: "center",
    elevation: 5,
  },
});

export default GenreCard;
