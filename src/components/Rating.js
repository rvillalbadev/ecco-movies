import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default function Rating({ rating }) {
  const filledStars = Math.floor(rating / 2);
  const maxStars = Array(5 - filledStars).fill('staro');
  const r = [...Array(filledStars).fill('star'), ...maxStars];

  return (
    <View style={styles.rating}>
      {r.map((type, index) => {
        return <AntDesign key={index} name={type} size={14} color={Colors.BlueBottom} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  ratingNumber: { marginRight: 4, fontFamily: 'RalewayRegular', fontSize: 14, color: Colors.GrayText },
  rating: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginVertical: 4,
    width: '70%'
  },
});
