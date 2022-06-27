import React, { useState, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';

import {
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Platform,
  StyleSheet, Text, View, FlatList
} from "react-native";
import { ScrollView } from 'react-native-virtualized-view';
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import GenreCard from "../components/GenreCard";
import MovieCard from "../components/MovieCard";
import ItemSeparator from "../components/ItemSeparator";
import GenresItem from "../components/GenresItem";
import Rating from '../components/Rating';
import { getMovies } from "../services/SortService"
import {
  getNowPlayingMovies,
  getUpcomingMovies,
  getAllGenres,
} from "../services/MovieService";


const { width, height } = Dimensions.get('window');
const SPACING = 7;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.53 : width * 0.55;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 1.2;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Cargando...</Text>
  </View>
);


const Backdrop = ({ movies, scrollX }) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }} >
      <FlatList
        data={movies}
        keyExtractor={(item) => `${item.key}-backdrop`}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, BACKDROP_HEIGHT],
          });

          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                width,
                height: translateX,
                overflow: 'hidden'
              }}
            >
              <Image
                source={{ uri: item.backdrop }}
                blurRadius={1}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute',
                }}
              />
            </Animated.View>
          );
        }}
      />

      <LinearGradient
        colors={['rgba(17, 24, 32, 0.7)', Colors.BlueDarker]}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
};


const HomeScreen = ({ navigation }) => {
  const [activeGenre, setActiveGenre] = useState("Todos");
  const [nowPlayingMovies, setNowPlayingMovies] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState({});
  const [genres, setGenres] = useState([{ id: 10110, name: "Todos" }]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [movies, setMovies] = useState([]);
  const [loadingS, setLoadingS] = useState(false);


  const setHeight = (h) => (height / 100) * h;


  useEffect(() => {
    const fetchData = async () => {
      setLoadingS(true)
      const movies = await getMovies({activeGenre, setLoadingS});
      // Se añaden items separadores
      // [empty_item, ...movies, empty_item]
      setMovies([{ key: 'empty-left' }, ...movies, { key: 'empty-right' }]);
    };

      fetchData({activeGenre});

  }, [activeGenre]);



  useEffect(() => {
    getNowPlayingMovies().then((movieResponse) =>
      setNowPlayingMovies(movieResponse.data)
    );
    getUpcomingMovies().then((movieResponse) =>
      setUpcomingMovies(movieResponse.data)
    );
    getAllGenres().then((genreResponse) =>
    setGenres([...genres, ...genreResponse.data.genres])
   );

  }, []);

  

  if (movies.length === 0) {
    return <Loading />;
  }


  return (

    <View style={styles.container} >

      <Backdrop movies={movies} scrollX={scrollX} />

      {loadingS && <ActivityIndicator size="large" color={Colors.BlueMedium} 
      style={{marginTop: 20, marginBottom: 6, position: 'absolute', left: width/2.3}} />}


      <ScrollView style={{ flex: 1, marginTop: 10, height: 20 }}>


        <StatusBar
          style="auto"
          translucent={false}
          backgroundColor={Colors.Basic_Backgroud}
        />

        <View style={styles.headerContainer}>
          { (activeGenre === 'Todos') ? <Text style={styles.headerTitle}>TOP Cine</Text> : <Text style={styles.headerTitle}>{activeGenre}</Text>}

        
          <Image  style={{width: width*0.3, resizeMode: 'contain', position: 'absolute', right: 10}}
          source={require("../../assets/logo3.4.png")} />
        </View>

        <View style={{ flex: 1.4 }}>
          <Animated.FlatList
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: 'visible',
              padding: 0,
              margin: 0,
              borderRadius: 30,
              //height: '10%'
            }}
            showsHorizontalScrollIndicator={false}
            data={movies}
            keyExtractor={(item) => item.key}
            horizontal
            bounces={false}
            decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
            renderToHardwareTextureAndroid
            contentContainerStyle={{ alignItems: 'flex-start', overflow: 'visible', margin: 0, padding: 0 }}
            snapToInterval={ITEM_SIZE}
            snapToAlignment='start'
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
              if (!item.poster) {
                return <View style={{ width: EMPTY_ITEM_SIZE }} />;
              }

              const inputRange = [
                (index - 1.5) * ITEM_SIZE,
                (index - 1) * ITEM_SIZE,
                index * ITEM_SIZE,
              ];

              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [50, 5, 50],
              });

              return (
                <TouchableOpacity onPress={() => navigation.navigate("movie", { movieId: item.key })}>
                  <View style={{
                    width: ITEM_SIZE,
                    justifyContent: 'flex-start', alignItems: 'center',
                    borderColor: "transparent",
                    borderWidth: 4,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    overflow: 'hidden',
                    height: '100%',
                    maxHeight: 0.6*height,
                    borderRadius: 20,
                    margin: 0,
                    padding: 0
                  }}
                  >
                    <Animated.View
                      style={{
                        paddingHorizontal: SPACING * 1.5,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        transform: [{ translateY }],
                        backgroundColor: 'rgba(255, 255, 255, 0)',
                        overflow: 'visible',
                        width: '100%',
                        height: '100%',
                        borderRadius: 12,
                        paddingVertical: 10,
                        marginVertical: 0
                      }}
                      onPress={() => navigation.navigate("movie", { movieId: item.key })}

                    >
                      <Image
                        source={{ uri: item.poster }}
                        style={styles.posterImage}
                      />
                      <Text style={{
                        fontSize: 14, alignSelf: 'flex-start',
                        textAlign: 'left',
                        fontFamily: 'RalewaySemiBold',
                        color: Colors.GrayText
                      }} >
                        {item.title}
                      </Text>
                      <Rating rating={item.rating} />
                      <GenresItem genres={item.genres} />
                      <Text style={{
                        fontSize: 12,
                        fontFamily: Fonts.Bold,
                        fontFamily: 'RalewayBold',
                        color: Colors.GrayDarkText,
                        alignSelf: 'flex-start'
                      }}>
                        {item.releaseDate.split('-')[0]}
                      </Text>
                    </Animated.View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>


        <ItemSeparator height={setHeight(3)} />


        <View style={styles.genreListContainer}>
          <FlatList
            style={{ position: 'relative', flex: 1 }}
            data={genres}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListHeaderComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            renderItem={({ item }) => (
              <GenreCard
                genreName={item.name}
                active={item.name === activeGenre}
                onPress={setActiveGenre}
              />
            )}
          />
        </View>


        <View style={styles.headerContainer}>
          <Text style={{ ...styles.headerTitle, marginBottom: 12 }}>Descubre</Text>
        </View>

        <View>
          <FlatList
            style={{ position: 'relative', flex: 1 }}
            data={nowPlayingMovies.results.reverse()}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListHeaderComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            renderItem={({ item }) => (
              <MovieCard
                title={item.title}
                language={item.original_language}
                voteAverage={item.vote_average}
                voteCount={item.vote_count}
                poster={item.poster_path}
                size={0.5}
                heartLess={false}
                onPress={() => navigation.navigate("movie", { movieId: item.id })}
              />
            )}
          />
        </View>


        <View style={styles.headerContainer}>
          <Text style={{ ...styles.headerTitle, marginBottom: 12 }}>Estrenos</Text>
        </View>

        <View>
          <FlatList
            data={upcomingMovies.results}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListHeaderComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            renderItem={({ item }) => (
              <MovieCard
                title={item.title}
                language={item.original_language}
                voteAverage={item.vote_average}
                voteCount={item.vote_count}
                poster={item.poster_path}
                size={0.5}
                heartLess={false}
                onPress={() => navigation.navigate("movie", { movieId: item.id })}
              />
            )}
          />
        </View>

      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Basic_Backgroud,
    overflow: 'visible'
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 0,
    margin: 0
  },
  headerTitle: {
    fontSize: 21,
    fontFamily: 'RalewayRegular',
    color: Colors.GrayText,
    padding: 0,
    margin: 0
  },
  headerSubTitle: {
    fontSize: 10,
    color: Colors.Active,
    fontFamily: Fonts.Bold,
  },
  genreListContainer: {
    flex: 0.5,
    position: 'relative',
    bottom: 2,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center"

  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.35,
    resizeMode: 'cover',
    borderRadius: 20,
    marginTop: 3,
    marginBottom: 0,
    padding: 0,
    margin: 8
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BlueDarker
  }
});

export default HomeScreen;
