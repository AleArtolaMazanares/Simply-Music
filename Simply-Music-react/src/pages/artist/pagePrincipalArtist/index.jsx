import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../pagePrincipalArtist/style.css";

function PagePrincipalArtist() {
  // Obtener el id de la URL utilizando useParams de React Router
  const { id } = useParams();

  // Estado para almacenar IDs relacionados con el contenido del artista

  const [saveID, setSaveId] = useState([]);

  // Estado para almacenar IDs relacionados con el contenido del artista
  const [idContent, setIdContent] = useState([]);

  // Estado para almacenar información sobre el contenido del artista
  const [contentArtist, setContentArtist] = useState([]);

  // Estado para controlar si se está cargando la información
  const [loading, setLoading] = useState(true);

  // Función para obtener IDs relacionados con el contenido del artista
  const fetchContentArtists = async () => {
    try {
      // Construir la URL para la solicitud
      const url = `http://localhost:3001/users/content_artists/get_ids_by_user?user_id=${id}`;

      // Hacer la solicitud a la API
      const response = await fetch(url);

      // Verificar si la solicitud fue exitosa
      if (response.ok) {
        const data = await response.json();
        // Almacenar los IDs en el estado
        setIdContent(data);
      } else {
        console.error("Error al obtener datos del servidor");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  // Efecto para llamar a fetchContentArtists cuando el ID cambia
  useEffect(() => {
    fetchContentArtists();
  }, [id]);

  // Función para obtener información sobre el artista y sus canciones asociadas
  const fetchArtistAndSongs = async () => {
    try {
      // Hacer una solicitud para cada ID en idContent
      const artistPromises = idContent.map(async (contentId) => {
        // Construir la URL para la solicitud del artista
        const artistUrl = `http://localhost:3001/users/content_artists/${contentId}`;
        // Hacer la solicitud del artista a la API
        const artistResponse = await fetch(artistUrl);

        // Verificar si la solicitud del artista fue exitosa
        if (!artistResponse.ok) {
          throw new Error(
            `Error en la solicitud para el ID ${contentId}: ${artistResponse.status}`
          );
        }

        // Obtener los datos del artista
        const artistData = await artistResponse.json();
        // Almacenar el ID para usarlo en enlaces
        setSaveId(artistData.id);

        // Construir la URL para la solicitud de canciones del artista
        const songsUrl = `http://localhost:3001/users/songs/get_songs_by_content_artist/${contentId}`;
        // Hacer la solicitud de canciones a la API
        const songsResponse = await fetch(songsUrl);

        // Verificar si la solicitud de canciones fue exitosa
        if (!songsResponse.ok) {
          throw new Error(
            `Error en la solicitud de canciones para el ID ${contentId}: ${songsResponse.status}`
          );
        }

        // Obtener los datos de las canciones
        const songsData = await songsResponse.json();

        // Agregar las canciones al objeto del artista
        artistData.songs = songsData;

        return artistData;
      });

      // Esperar a que todas las solicitudes se completen
      const artists = await Promise.all(artistPromises);

      // Actualizar el estado con los datos obtenidos
      setContentArtist(artists);
      setLoading(false);
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  // Efecto para llamar a fetchArtistAndSongs cuando idContent cambia
  useEffect(() => {
    // Asegúrate de que idContent tenga elementos antes de llamar a fetchArtistAndSongs
    if (idContent.length > 0) {
      fetchArtistAndSongs();
    }
  }, [idContent]);

  // Renderizado del componente
  return (
    <div className="containerar">
      {/* Renderizar un mensaje de carga o la información del artista */}
      {loading ? (
        <p>Cargando Perfil.....</p>
      ) : (
        contentArtist.map((artist) => (
          <div key={artist.id} className="artist-info">
            <p>{artist.name}</p>
            {/* Mostrar la imagen del artista */}
            <img src={artist.image} alt="" id="imgContentArtist" />

            {/* Mostrar las canciones del artista */}
            <h3>YOUR SONGS:</h3>
            {artist.songs.length > 0 ? (
              <ul>
                {artist.songs.map((song) => (
                  <li key={song.id}>
                    {song.title_song} - {song.genre} - {song.song_duration}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay canciones para este artista</p>
            )}
          </div>
        ))
      )}
      {/* Enlaces para editar datos, enviar canciones, mensajes y crear álbum */}
      <div className="linksArtist">
        <Link to={`/editPageArtist/${idContent[0]}`} className="link-style">
          Edit Data
        </Link>
        <br />
        <Link to={`/songSubmit/${idContent}`} className="link-style">
          Submit song
        </Link>
        <br />
        <Link to={`/messageArtist/${idContent}`} className="link-style">
          Message
        </Link>
        <br />
        <Link to={`/AlbumArtist/${saveID}`} className="link-style">
          Create Album
        </Link>
        <br />
      </div>
    </div>
  );
}

export default PagePrincipalArtist;
