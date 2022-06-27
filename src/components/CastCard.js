import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { getPoster } from "../services/MovieService";
import Colors from "../constants/Colors";
import Images from "../constants/Images";

const CastCard = ({ originalName, image, characterName }) => {
  return (
    <View style={styles.container}>
      <Image
        source={image ? { uri: getPoster(image) } : Images.No_Image}
        resizeMode={image ? "cover" : "contain"}
        style={styles.image}
      />
      <Text style={styles.originalName} numberOfLines={2}>
        {originalName}
      </Text>
      <Text style={styles.characterName} numberOfLines={2}>
        {characterName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: 'contain'
  },
  originalName: {
    width: 80,
    color: Colors.GrayText,
    fontFamily: 'RalewayMedium',
    fontSize: 12,
  },
  characterName: {
    width: 80,
    color: Colors.GrayDarkText,
    fontFamily: 'RalewayMedium',
    fontSize: 10,
  },
});

export default CastCard;
