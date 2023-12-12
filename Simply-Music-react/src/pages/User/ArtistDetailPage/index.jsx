// Import the necessary libraries and components from React and React Router DOM
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Import additional styles and necessary components
import "../ArtistDetailPage/style.css";
import CardArtistDetail from "../../../components/cardAtistDetails/index";
import Messages from "../../../components/messages/index";
import Songs from "../../../components/Songs";

// Create the functional component ArtistDetailPage
const ArtistDetailPage = () => {
  // Get the 'id' parameter from the URL using React Router DOM's useParams
  const { id } = useParams();

  // States to store artist information, songs, and messages
  const [prueba, setPrueba] = useState({});
  const [canciones, setCanciones] = useState([]);
  const [messages, setMessages] = useState([]);

  // States to control the loading state of artists, songs, and messages
  const [loadingArtist, setLoadingArtist] = useState(true);
  const [loadingSongs, setLoadingSongs] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);

  // useEffect is used to perform actions after the component mounts or when 'id' changes
  useEffect(() => {
    // Asynchronous fetchData function to make data requests to the server
    const fetchData = async () => {
      try {
        // Get artist songs from the server
        const songsResponse = await fetch(
          `http://localhost:3001/users/songs/get_songs_by_content_artist/${id}`
        );

        // Handle errors in the songs response
        if (!songsResponse.ok) {
          throw new Error(
            `Error in the songs request: ${songsResponse.statusText}`
          );
        }

        // Extract and set the state of songs
        const songsData = await songsResponse.json();
        setCanciones(songsData);
        setLoadingSongs(false);

        // Get artist information from the server
        const artistResponse = await fetch(
          `http://localhost:3001/users/content_artists/${id}`
        );

        // Handle errors in the artist information response
        if (!artistResponse.ok) {
          throw new Error(
            `Error in the content artist information request: ${artistResponse.statusText}`
          );
        }

        // Extract and set the state of artist information
        const artistData = await artistResponse.json();
        setPrueba(artistData);
        setLoadingArtist(false);

        // Get artist messages from the server
        const messagesResponse = await fetch(
          `http://localhost:3001/users/messages/get_messages_by_artist/${id}`
        );

        // Handle errors in the messages response
        if (!messagesResponse.ok) {
          throw new Error(
            `Error in the messages request: ${messagesResponse.statusText}`
          );
        }

        // Extract and set the state of messages
        const messagesData = await messagesResponse.json();
        setMessages(messagesData);
        setLoadingMessages(false);
      } catch (error) {
        // Capture and handle errors during data requests
        console.error("Error in the request:", error.message);
      }
    };

    // Call the fetchData function when the component mounts or when 'id' changes
    fetchData();
  }, [id]);

  // Render the artist detail page
  return (
    <div class="containerArtistDetails">
      <div class="artistInfoArtistDetail">
        {/* Show loading message or render the CardArtistDetail component with artist information */}
        {loadingArtist ? (
          <p>Loading artist...</p>
        ) : (
          <>
            <CardArtistDetail prueba={prueba} messages={messages} />
          </>
        )}
      </div>

      {/* Render the Songs component with the list of artist songs */}
      <div className="ContainerPlaySong">
        <Songs canciones={canciones} loadingSongs={loadingSongs} />
      </div>
    </div>
  );
};

// Export the ArtistDetailPage component
export default ArtistDetailPage;
