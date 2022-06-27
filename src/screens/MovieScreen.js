import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList
} from "react-native";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import {
  getMovieById
} from "../services/MovieService";
import ItemSeparator from "../components/ItemSeparator";
import CastCard from "../components/CastCard";
import MovieCard from "../components/MovieCard";
import { Append_To_Response as AR } from "../constants/Urls";
import { TopImage, HeaderButtons, PlayButton } from "../components/MovieScreen/TopImage";
import Rating from '../components/Rating';


const { height, width } = Dimensions.get("window");

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const MovieScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState({});
  const [isCastSelected, setIsCastSelected] = useState(true);

  useEffect(() => {
    getMovieById(
      movieId,
      `${AR.Videos},${AR.Credits},${AR.Recommendations},${AR.Similar}`
    ).then((response) => {setMovie(response?.data)});
  }, []);


  return (
    <ScrollView style={styles.container}>

      <StatusBar style="light" />
      <TopImage movie={movie} styles={styles} Colors={Colors} />
      <HeaderButtons movie={movie} styles={styles} Colors={Colors} navigation={navigation} />
      <PlayButton movie={movie} styles={styles} Colors={Colors} />


      <ItemSeparator height={setHeight(32)} />


      <View style={styles.movieTitleContainer}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {movie?.title}
        </Text>
      </View>


      
      <View style={styles.row}>
        {(movie?.vote_average) && <Rating rating={movie.vote_average}/>}
      </View>

      <Text style={styles.genreText}>
        {movie?.genres?.map((genre) => genre?.name)?.join(", ")} |{" "}
        {movie?.release_date?.split('-')[0]}
      </Text>

      
      <Text style={styles.genreText}>
          País(es): {movie?.production_countries?.map((country) => country?.iso_3166_1)?.join(", ")}
      </Text>

      <View style={styles.overviewContainer}>
        <Text style={styles.overviewText}>{movie?.overview}</Text>
      </View>



      <View>
        <Text style={styles.castTitle}>Reparto</Text>
        <View style={styles.castSubMenuContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsCastSelected(true)}
          >
            <Text
              style={{
                ...styles.castSubMenuText,
                color: isCastSelected ? Colors.BlueText : Colors.GrayDarkText,
              }}
            >
              Actores
              
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsCastSelected(false)}
          >
            <Text
              style={{
                ...styles.castSubMenuText,
                color: isCastSelected ? Colors.GrayDarkText : Colors.BlueText,
              }}
            >
              Equipo
            </Text>
          </TouchableOpacity>

        </View>



        <FlatList
          style={{ marginVertical: 5 }}
          data={isCastSelected ? movie?.credits?.cast : movie?.credits?.crew}
          keyExtractor={(item) => item?.credit_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (

            <CastCard
              originalName={item?.name}
              characterName={isCastSelected ? item?.character : item?.job}
              image={item?.profile_path}
            />
          )}
        />

      </View>
      <Text style={styles.extraListTitle}>Recomendadas</Text>


      <FlatList
        data={movie?.recommendations?.results}
        keyExtractor={(item) => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <ItemSeparator width={20} />}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListFooterComponent={() => <ItemSeparator width={20} />}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            size={0.6}
            heartLess={false}
            onPress={() => navigation.push("movie", { movieId: item.id })}
          />
        )}
      />


      <Text style={styles.extraListTitle}>Similares</Text>


        <FlatList
          data={movie?.similar?.results}
          keyExtractor={(item) => item?.id?.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.6}
              heartLess={false}
              onPress={() => navigation.push("movie", { movieId: item.id })}
            />
          )}
        />



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BlueDark,
  },
  moviePosterImageContainer: {
    height: setHeight(35),
    width: setWidth(145),
    alignItems: "center",
    position: "absolute",
    left: setWidth((100 - 145) / 2),
    top: 0,
    elevation: 8,
  },
  moviePosterImage: {
    width: setWidth(145),
    height: setHeight(35),
  },
  linearGradient: {
    width: setWidth(100),
    height: setHeight(6),
    position: "absolute",
    top: 0,
    elevation: 9,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    left: 0,
    top: 50,
    elevation: 20,
  },
  headerText: {
    color: Colors.White,
    fontFamily: Fonts.Bold,
  },
  playButton: {
    position: "absolute",
    top: 110,
    left: setWidth(50) - 70 / 2,
    elevation: 10,
  },
  movieTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 7
  },
  movieTitle: {
    color: Colors.GrayText,
    fontFamily: 'RalewayRegular',
    fontSize: 17,
    width: setWidth(70),
    textAlign: "center",
  },
  ratingText: {
    marginLeft: 5,
    color: Colors.GrayText,
    fontFamily: Fonts.Extra_Bold,
    fontSize: 15,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  genreText: {
    color: Colors.GrayDarkText,
    paddingHorizontal: 20,
    paddingTop: 5,
    fontFamily: 'RalewayMedium',
    fontSize: 13,
    textAlign: "center",
  },
  overviewContainer: {
    backgroundColor: 'rgba(41, 160, 206, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
  },
  overviewTitle: {
    color: Colors.GrayText,
    fontFamily: Fonts.Bold,
    fontSize: 18,
  },
  overviewText: {
    color: Colors.GrayText,
    fontFamily: 'RalewayRegular',
    fontSize: 14,
    textAlign: "justify",
    lineHeight: 20
  },
  castTitle: {
    marginLeft: 20,
    marginVertical: 5,
    color: Colors.GrayText,
    fontSize: 21,
    fontFamily: 'RalewayRegular',
    color: Colors.GrayText,
  },
  castSubMenuContainer: {
    marginLeft: 20,
    flexDirection: "row",
    marginVertical: 5,
  },
  castSubMenuText: {
    marginRight: 10,
    color: Colors.GrayText,
    fontFamily: 'RalewaySemiBold',
    fontSize: 13,
    marginBottom: 5,
  },
  extraListTitle: {
    marginLeft: 20,
    fontSize: 21,
    fontFamily: 'RalewayRegular',
    color: Colors.GrayText,
    padding: 0,
    marginVertical: 20,
  },
});

export default MovieScreen;
