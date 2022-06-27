import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  ImageBackground,
} from "react-native";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { Ionicons } from 'react-native-vector-icons';
import { getPoster } from "../services/MovieService";
import { AntDesign } from '@expo/vector-icons';


const MovieCard = ({
  title,
  poster,
  voteAverage,
  voteCount,
  size,
  heartLess,
  onPress
}) => {
  const [liked, setLiked] = useState(false);
  const [voteCountValue, setVoteCountValue] = useState(voteCount);

 

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <ImageBackground
        style={{ ...styles.container, width: 230 * size, height: 340 * size }}
        imageStyle={{ borderRadius: 12 }}
        source={{ uri: getPoster(poster) }}
      >
        <View style={{ ...styles.imdbContainer, paddingVertical: 3 * size, paddingHorizontal: 3 * size }}>

           <AntDesign name={'star'} size={12} color={Colors.BlueMedium} />


          <Text
            style={{
              ...styles.imdbRating,
              marginRight: 7 * size,
              marginLeft: 7 * size,
              marginBottom: 5 * size,
              fontSize: 25 * size,
            }}
          >
            {voteAverage.toFixed(1)}

          </Text>
        </View>
        {!heartLess ? (
          <TouchableNativeFeedback
            onPress={() => {
              setLiked(!liked);
              setVoteCountValue(
                liked ? voteCountValue - 1 : voteCountValue + 1
              );
            }}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={35 * size}
              color={liked ? Colors.BlueBottom : Colors.White}
              style={{ position: "absolute", bottom: 10, left: 10 }}
            />
          </TouchableNativeFeedback>
        ) : null}
      </ImageBackground>
      <View>
        <Text
          style={{ ...styles.movieTitle, width: 230 * size }}
          numberOfLines={3}
        >
          {title}
        </Text>
        <View style={styles.movieSubTitleContainer}>
       
          <View style={styles.rowAndCenter}>
            <Ionicons
              name="heart"
              size={17 * size}
              color={Colors.BlueBottom}
              style={{ marginRight: 5 }}
            />
            <Text style={styles.movieSubTitle}>{voteCountValue}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 340,
    width: 230,
    borderRadius: 12,
    elevation: 5,
    marginVertical: 2,
  },
  movieTitle: {
    fontSize: 14.5, 
    alignSelf: 'flex-start', 
    textAlign: 'left', 
    fontFamily: 'RalewayRegular',
    color: Colors.GrayText,
    paddingVertical: 9,
    marginTop: 5,
    width: 230,
    lineHeight: 18
  },
  movieSubTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: Colors.Gray,
  },
  movieSubTitle: {
    fontSize: 12,
    fontFamily: Fonts.Regular,
    color: Colors.Gray,
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  imdbContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: 'rgba(17, 24, 32, 0.7)',
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 12,
    paddingVertical: 3
  },
  imdbImage: {
    height: 20,
    width: 50,
    borderBottomLeftRadius: 5,
    marginHorizontal: 5
  },
  imdbRating: {
    marginRight: 5,
    color: Colors.GrayText,
    fontFamily: 'RalewayBold',
  },
});

MovieCard.defaultProps = {
  size: 1,
  heartLess: true,
};

export default MovieCard;
