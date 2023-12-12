import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import "../playSong/style.css";
import HandleSong from "../../../components/handleSong";
import InfoArtist from "../../../components/InfoArtist";
import Related from "../../../components/related";

const PlaySong = () => {
  // Extract the song ID from the URL parameters
  const { id } = useParams();

  // State variables to manage song details, playback, and related data
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

  // Load the song details when the component mounts
  useEffect(() => {
    const fetchSong = async () => {
      try {
        // Fetch song details from the server based on the ID
        const response = await fetch(`http://localhost:3001/users/songs/${id}`);

        if (!response.ok) {
          throw new Error(`Error in request: ${response.status}`);
        }

        const data = await response.json();
        setSong(data);
        setGenre(data.genre);
      } catch (error) {
        console.error("Error in request:", error.message);
      }
    };

    fetchSong();
  }, [id]);

  // Additional effects when the component mounts
  useEffect(() => {
    // Fetch additional information about the song
    prueba();
    // Fetch a list of artists
    fetchArtists();
  }, []);

  // Fetch additional information about the song
  const prueba = async () => {
    const url = `http://localhost:3001/users/songs/get_songs_by_id/${id}`;
    const response = await fetch(url);
    const data1 = await response.json();
    setSaveContentArtist(data1[0].content_artist_id);
  };

  // Fetch a list of artists from the server
  const fetchArtists = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/users/content_artists"
      );
      if (!response.ok) {
        throw new Error(`Error in request: ${response.status}`);
      }
      const data = await response.json();
      // Get a random subset of artists
      const shuffledArtists = shuffleArray(data).slice(0, 3);
      setArtists(shuffledArtists);
    } catch (error) {
      console.error("Error in request:", error.message);
    }
  };

  // Handle the play button click
  const handlePlay = () => setIsPlaying(true);

  // Handle the end of song playback
  const handleEnded = () => {
    setIsPlaying(false);
    // Play another random song when the current one ends
    playAnotherSong();
  };

  // Play another random song
  const playAnotherSong = async () => {
    try {
      // Fetch the full list of songs
      const data = await fetchSongs();
      // Filter songs based on content_artist_id
      const songsWithId75 = filterSongsById(data, saveContentArtist);

      if (songsWithId75.length > 1) {
        // Get a random song that is different from the current one
        const randomSong = getRandomSong(songsWithId75);
        // Update the state to play the new song
        updateSongState(randomSong);
      } else {
        console.log(
          "There are not enough filtered songs available to play another."
        );
      }
    } catch (error) {
      console.error("Error in request:", error.message);
    }
  };

  // Load more songs based on genre and content_artist_id
  const loadMoreSongs = async () => {
    try {
      const data = await fetchSongs();
      // Filter songs based on genre and content_artist_id
      const filteredSongs = filterSongsByGenreAndId(
        data,
        genre,
        saveContentArtist
      );

      if (filteredSongs.length > 1) {
        // Get a random song from the filtered list
        const randomSong = getRandomSong(filteredSongs);
        // Update the state to include the new song
        updateAdditionalSongs(randomSong);
      } else {
        console.log(
          "There are not enough filtered songs available to load more."
        );
      }
    } catch (error) {
      console.error("Error in request:", error.message);
    }
  };

  // Load songs related to the current genre
  const loadRelatedSongs = async () => {
    try {
      const data = await fetchSongs();
      // Filter songs based on the current genre
      const relatedSongsList = filterSongsByGenre(data, genre);

      if (relatedSongsList.length > 0) {
        // Update the state with the related songs
        setRelatedSongs(relatedSongsList);
      } else {
        console.log("There are not enough related songs available.");
      }
    } catch (error) {
      console.error("Error in request:", error.message);
    }
  };

  // Execute the loadRelatedSongs function when the genre or content_artist_id changes
  useEffect(() => {
    loadRelatedSongs();
  }, [genre, saveContentArtist]);

  // Handle the play button click for related songs
  const playRelatedSong = (relatedSong) => {
    if (!isPlaying2) {
      setIsPlaying2(!isPlaying2);
    } else {
      setIsPlaying2(isPlaying2);
    }

    // Update the state to play the selected related song
    updateSongState(relatedSong);
  };

  // Update various state variables to play a new song
  const updateSongState = (newSong) => {
    setSong(newSong);
    setAudioKey((prevKey) => prevKey + 1);
    setAutoPlay(true);

    // Add the current song to the list of played songs
    setPlayedSongs([...playedSongs, newSong]);
    // Update the index of the current song
    setCurrentSongIndex(playedSongs.length);
  };

  // Fetch the full list of songs from the server
  const fetchSongs = async () => {
    const response = await fetch("http://localhost:3001/users/songs");
    if (!response.ok) {
      throw new Error(`Error in request: ${response.status}`);
    }
    return await response.json();
  };

  // Filter songs based on content_artist_id
  const filterSongsById = (songs, idToFilter) =>
    songs.filter((song) => song.content_artist_id === idToFilter);

  // Filter songs based on genre
  const filterSongsByGenre = (songs, genreToFilter) =>
    songs.filter((song) => song.genre === genreToFilter);

  // Filter songs based on genre and content_artist_id
  const filterSongsByGenreAndId = (songs, genreToFilter, idToFilter) => {
    return filterSongsByGenre(
      filterSongsById(songs, idToFilter),
      genreToFilter
    );
  };

  // Get a random song from a list of songs
  const getRandomSong = (songs) => {
    let randomIndex = Math.floor(Math.random() * songs.length);
    while (songs[randomIndex].id === song.id) {
      randomIndex = Math.floor(Math.random() * songs.length);
    }
    return songs[randomIndex];
  };

  // Update the state to include a new additional song
  const updateAdditionalSongs = (newSong) => {
    setAdditionalSongs([...additionalSongs, newSong]);
    setAudioKey((prevKey) => prevKey + 1);
    setAutoPlay(true);
  };

  // Shuffle an array using the Fisher-Yates algorithm
  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  // Handle playback of the previous song
  const playPreviousSong = () => {
    if (currentSongIndex > 0) {
      // Get the index of the previous song
      const previousSongIndex = currentSongIndex - 1;
      setCurrentSongIndex(previousSongIndex);
      if (!isPlaying2) {
        setIsPlaying2(!isPlaying2);
      } else {
        setIsPlaying2(isPlaying2);
      }

      // Get the previous song from the list of played songs
      const previousSong = playedSongs[previousSongIndex];
      // Update the state to play the previous song
      updateSongState(previousSong);
    } else {
      console.log("There is no previous song available.");
    }
  };

  // Handle playback of the next song
  const playNextSong = async () => {
    try {
      const data = await fetchSongs();
      // Filter songs based on content_artist_id
      const songsWithId75 = filterSongsById(data, saveContentArtist);
      if (!isPlaying2) {
        setIsPlaying2(!isPlaying2);
      } else {
        setIsPlaying2(isPlaying2);
      }
      if (songsWithId75.length > 1) {
        // Get a random song from the filtered list
        const randomSong = getRandomSong(songsWithId75);
        // Update the state to play the new song
        updateSongState(randomSong);
        // Don't start playback automatically
      } else {
        console.log(
          "There are not enough filtered songs available to play another."
        );
      }
    } catch (error) {
      console.error("Error in request:", error.message);
    }
  };

  // Get the songs for the current page
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = relatedSongs.slice(indexOfFirstSong, indexOfLastSong);

  // Render the component
  return (
    <div className="containerPlaySongs">
      <div className="playSongsReproductor">
        <div className="containerLogoR">
          <img
            src="https://cdn.discordapp.com/attachments/1110957174655553606/1181636395106836510/simply_Mesa_de_trabajo_1.png?ex=6581c7a6&is=656f52a6&hm=9b51e57aaaf6ff6cbe6a70c9b360e681e08465d18d188c9ac5a82b62902d69c8&"
            alt=""
          />
        </div>

        {/* Show a loading message when song details are not available */}
        {!song.title_song &&
          additionalSongs.length === 0 &&
          relatedSongs.length === 0 && <div className="">Loading</div>}

        {/* Component to handle song playback */}
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

      {/* Display related songs if available */}
      <div>
        {relatedSongs.length > 0 && (
          <div className="aditionalSongs">
            {/* Component to show related songs */}
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

      {/* Component to display artist information */}
      <InfoArtist artists={artists} />
    </div>
  );
};

export default PlaySong;
