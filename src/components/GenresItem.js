import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default function GenresItem({ genres }) {
  return (
    <View style={styles.genres}>
      {genres.map((genre, i) => {
        return (
          <View key={genre} style={styles.genre}>
            <Text style={styles.genreText}>{genre}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  genre: {
    marginRight: 4,
  },
  genreText: {
    fontSize: 12, 
    opacity: 1,
    fontFamily: 'RalewayBold',
    color: Colors.GrayDarkText,
    textAlign: 'left'
  }
});
