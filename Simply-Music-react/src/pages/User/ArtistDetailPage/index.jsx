import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../ArtistDetailPage/style.css";
import CardArtistDetail from "../../../components/cardAtistDetails/index";
import Messages from "../../../components/messages/index";
import Songs from "../../../components/Songs";

const ArtistDetailPage = () => {
  const { id } = useParams();
  const [prueba, setPrueba] = useState({});
  const [canciones, setCanciones] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingArtist, setLoadingArtist] = useState(true);
  const [loadingSongs, setLoadingSongs] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songsResponse = await fetch(
          `http://localhost:3001/users/songs/get_songs_by_content_artist/${id}`
        );

        if (!songsResponse.ok) {
          throw new Error(
            `Error en la solicitud de canciones: ${songsResponse.statusText}`
          );
        }

        const songsData = await songsResponse.json();
        setCanciones(songsData);
        setLoadingSongs(false);

        const artistResponse = await fetch(
          `http://localhost:3001/users/content_artists/${id}`
        );

        if (!artistResponse.ok) {
          throw new Error(
            `Error en la solicitud de información del artista de contenido: ${artistResponse.statusText}`
          );
        }

        const artistData = await artistResponse.json();
        setPrueba(artistData);
        setLoadingArtist(false);

        const messagesResponse = await fetch(
          `http://localhost:3001/users/messages/get_messages_by_artist/${id}`
        );

        if (!messagesResponse.ok) {
          throw new Error(
            `Error en la solicitud de mensajes: ${messagesResponse.statusText}`
          );
        }

        const messagesData = await messagesResponse.json();
        setMessages(messagesData);
        setLoadingMessages(false);
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
      }
    };

    fetchData();
  }, [id]);



  return (
    <div class="containerArtistDetails">
      <div class="artistInfoArtistDetail">
        {loadingArtist ? (
          <p>Cargando artista...</p>
        ) : (
          <>
            <CardArtistDetail prueba={prueba} messages={messages} />
          </>
        )}
      </div>

      <div className="ContainerPlaySong">
        <Songs canciones={canciones} loadingSongs={loadingSongs} />
      </div>
    </div>
  );
};

export default ArtistDetailPage;
