import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../playSong/style.css";
import HandleSong from "../../../components/handleSong";
import InfoArtist from "../../../components/InfoArtist";
import BtnPagination from "../../../components/BtnPagination";
import Related from "../../../components/related";

const PlaySong = () => {
  // Obtener el parámetro de la URL (id de la canción)
  const { id } = useParams();

  // Estados para gestionar la información de la canción y la reproducción
  const [song, setSong] = useState({});
  const [audioKey, setAudioKey] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [saveContentArtist, setSaveContentArtist] = useState([]);
  const [genre, setGenre] = useState("");
  const [additionalSongs, setAdditionalSongs] = useState([]);
  const [relatedSongs, setRelatedSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [artists, setArtists] = useState([]);
  const [playedSongs, setPlayedSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying2, setIsPlaying2] = useState(autoPlay);
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(6);

  useEffect(() => {
    // Efecto de reacción para cargar los detalles de la canción al montar el componente
    const fetchSong = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/songs/${id}`);

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        setSong(data);
        setGenre(data.genre);
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
      }
    };

    fetchSong();
  }, [id]);

  useEffect(() => {
    // Efecto de reacción para llamar a funciones adicionales al montar el componente
    prueba();
    fetchArtists();
  }, []);

  const prueba = async () => {
    // Función para obtener información específica de la canción desde otra ruta de la API
    const url = `http://localhost:3001/users/songs/get_songs_by_id/${id}`;
    const response = await fetch(url);
    const data1 = await response.json();
    setSaveContentArtist(data1[0].content_artist_id);
  };

  const fetchArtists = async () => {
    // Función para obtener la lista de artistas desde la API
    try {
      const response = await fetch(
        "http://localhost:3001/users/content_artists"
      );
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      const data = await response.json();

      // Obtén una lista de artistas en un orden aleatorio
      const shuffledArtists = shuffleArray(data).slice(0, 3);

      setArtists(shuffledArtists);
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  const handlePlay = () => setIsPlaying(true);

  const handleEnded = () => {
    // Manejar el evento de finalización de reproducción
    setIsPlaying(false);
    playAnotherSong();
  };

  const playAnotherSong = async () => {
    // Seleccionar aleatoriamente otra canción para reproducir
    try {
      const data = await fetchSongs();
      const songsWithId75 = filterSongsById(data, saveContentArtist);

      if (songsWithId75.length > 1) {
        const randomSong = getRandomSong(songsWithId75);
        updateSongState(randomSong);
      } else {
        console.log(
          "No hay suficientes canciones filtradas disponibles para reproducir otra."
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  const loadMoreSongs = async () => {
    // Cargar más canciones relacionadas al género y al ID del contenido del artista actual
    try {
      const data = await fetchSongs();
      const filteredSongs = filterSongsByGenreAndId(
        data,
        genre,
        saveContentArtist
      );

      if (filteredSongs.length > 1) {
        const randomSong = getRandomSong(filteredSongs);
        updateAdditionalSongs(randomSong);
      } else {
        console.log(
          "No hay suficientes canciones filtradas disponibles para cargar más."
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  const loadRelatedSongs = async () => {
    // Cargar canciones relacionadas al género actual
    try {
      const data = await fetchSongs();
      const relatedSongsList = filterSongsByGenre(data, genre);

      if (relatedSongsList.length > 0) {
        setRelatedSongs(relatedSongsList);
      } else {
        console.log("No hay suficientes canciones relacionadas disponibles.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  useEffect(() => {
    // Efecto de reacción para cargar canciones relacionadas al cambiar género o ID del contenido del artista
    loadRelatedSongs();
  }, [genre, saveContentArtist]);

  const playRelatedSong = (relatedSong) => {
    // Manejar la reproducción de una canción relacionada
    if (!isPlaying2) {
      setIsPlaying2(!isPlaying2);
    } else {
      setIsPlaying2(isPlaying2);
    }

    updateSongState(relatedSong);
  };

  const updateSongState = (newSong) => {
    // Actualizar varios estados para reflejar la nueva canción que se va a reproducir
    setSong(newSong);
    setAudioKey((prevKey) => prevKey + 1);
    setAutoPlay(true);

    // Agregar la canción actual al estado de canciones reproducidas
    setPlayedSongs([...playedSongs, newSong]);
    // Actualizar el índice de la canción actual
    setCurrentSongIndex(playedSongs.length);
  };

  const fetchSongs = async () => {
    // Función para obtener la lista completa de canciones desde la API
    const response = await fetch("http://localhost:3001/users/songs");
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    return await response.json();
  };

  const filterSongsById = (songs, idToFilter) =>
    songs.filter((song) => song.content_artist_id === idToFilter);

  const filterSongsByGenre = (songs, genreToFilter) =>
    songs.filter((song) => song.genre === genreToFilter);

  const filterSongsByGenreAndId = (songs, genreToFilter, idToFilter) => {
    return filterSongsByGenre(
      filterSongsById(songs, idToFilter),
      genreToFilter
    );
  };

  const getRandomSong = (songs) => {
    // Obtener una canción aleatoria que no sea la actual
    let randomIndex = Math.floor(Math.random() * songs.length);
    while (songs[randomIndex].id === song.id) {
      randomIndex = Math.floor(Math.random() * songs.length);
    }
    return songs[randomIndex];
  };

  const updateAdditionalSongs = (newSong) => {
    // Actualizar el estado de canciones adicionales
    setAdditionalSongs([...additionalSongs, newSong]);
    setAudioKey((prevKey) => prevKey + 1);
    setAutoPlay(true);
  };

  // Función para mezclar aleatoriamente un array (algoritmo de Fisher-Yates)
  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // Mientras haya elementos para mezclar
    while (currentIndex !== 0) {
      // Elegir un elemento sin mezclar
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Intercambiar el elemento elegido con el actual
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const playPreviousSong = () => {
    // Manejar la reproducción de la canción anterior en la lista de reproducción
    if (currentSongIndex > 0) {
      const previousSongIndex = currentSongIndex - 1;
      setCurrentSongIndex(previousSongIndex);
      if (!isPlaying2) {
        setIsPlaying2(!isPlaying2);
      } else {
        setIsPlaying2(isPlaying2);
      }

      const previousSong = playedSongs[previousSongIndex];
      updateSongState(previousSong);
    } else {
      console.log("No hay canción anterior disponible.");
    }
  };

  const playNextSong = async () => {
    // Manejar la reproducción de la siguiente canción en la lista de reproducción
    try {
      const data = await fetchSongs();
      const songsWithId75 = filterSongsById(data, saveContentArtist);
      if (!isPlaying2) {
        setIsPlaying2(!isPlaying2);
      } else {
        setIsPlaying2(isPlaying2);
      }
      if (songsWithId75.length > 1) {
        const randomSong = getRandomSong(songsWithId75);
        updateSongState(randomSong);
        // No inicia la reproducción automáticamente
      } else {
        console.log(
          "No hay suficientes canciones filtradas disponibles para reproducir otra."
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  // Obtener las canciones de la página actual
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = relatedSongs.slice(indexOfFirstSong, indexOfLastSong);

  // Renderizar el componente
  return (
    <div className="containerPlaySongs">
      <div className="playSongsReproductor">
        <div className="containerLogoR">
          <img
            src="https://cdn.discordapp.com/attachments/1110957174655553606/1181636395106836510/simply_Mesa_de_trabajo_1.png?ex=6581c7a6&is=656f52a6&hm=9b51e57aaaf6ff6cbe6a70c9b360e681e08465d18d188c9ac5a82b62902d69c8&"
            alt=""
          />
        </div>

        {!song.title_song &&
          additionalSongs.length === 0 &&
          relatedSongs.length === 0 && <div className="">Loading</div>}
        {/* Componente para manejar la reproducción de la canción */}
        <HandleSong
          song={song}
          genre={genre}
          audioKey={audioKey}
          autoPlay={autoPlay}
          handleEnded={handleEnded}
          playAnotherSong={playAnotherSong}
          isPlaying={isPlaying2}
          setIsPlaying={setIsPlaying2}
          playNextSong={playNextSong}
          playPreviousSong={playPreviousSong}
          setCurrentPage={setCurrentPage}
          relatedSongs={relatedSongs}
          songsPerPage={songsPerPage}
        />
      </div>
      <div>
        {relatedSongs.length > 0 && (
          <div className="aditionalSongs">
            {/* Componente para mostrar canciones relacionadas */}
            <>
              <Related
                currentSongs={currentSongs}
                playRelatedSong={playRelatedSong}
                isPlaying={isPlaying}
                song={song}
                isPlaying2={isPlaying2}
                setCurrentPage={setCurrentPage}
                relatedSongs={relatedSongs}
                songsPerPage={songsPerPage}
              />
            </>
          </div>
        )}
      </div>
      {/* Componente para mostrar información del artista */}
      <InfoArtist artists={artists} />
    </div>
  );
};

export default PlaySong;
