import { View, Image, TouchableOpacity, Text, Linking, Share } from 'react-native'
import React from 'react'
import { getPoster, getVideo } from '../../services/MovieService'
import { LinearGradient } from "expo-linear-gradient"
import { Feather, Ionicons } from "@expo/vector-icons";
import { AntDesign } from 'react-native-vector-icons';

function TopImage({ movie, styles, Colors, navigation }) {
  return (
    <View style={styles.moviePosterImageContainer}>

      <Image
        style={styles.moviePosterImage}
        resizeMode="cover"
        source={{ uri: getPoster(movie?.backdrop_path) }} />

      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', Colors.BlueDark]}
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          bottom: 0
        }}
      />

    </View>
  )
}

function HeaderButtons({ movie, styles, Colors, navigation }) {

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate("home")}>

        <AntDesign name="back" size={35} color={Colors.White} />
      </TouchableOpacity>



      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          Share.share({ message: `${movie?.title}\n\n${movie?.homepage}` })
        }>

        <AntDesign name="sharealt" size={30} color={Colors.White} />
      </TouchableOpacity>

    </View>
  )

}


function PlayButton({ movie, styles, Colors }) {

  return (
    <TouchableOpacity
      style={styles.playButton}
      onPress={() => Linking.openURL(getVideo(movie.videos.results[0].key))}
    >

      <Ionicons name="md-play-outline" size={70} color={Colors.White} />
    </TouchableOpacity>

  )

}


export { TopImage, HeaderButtons, PlayButton };