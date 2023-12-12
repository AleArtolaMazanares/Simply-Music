import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../pagePrincipalArtist/style.css";

function PagePrincipalArtist() {
  const { id } = useParams();
  const [saveID, setSaveId] = useState([]);
  const [idContent, setIdContent] = useState([]);
  const [contentArtist, setContentArtist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContentArtists = async () => {
    try {
      const url = `http://localhost:3001/users/content_artists/get_ids_by_user?user_id=${id}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setIdContent(data);
      } else {
        console.error("Error al obtener datos del servidor");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    fetchContentArtists();
  }, [id]);

  const handleDeleteSong = async (songId) => {
    try {
      const deleteUrl = `http://localhost:3001/users/songs/${songId}`;
      const deleteResponse = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (!deleteResponse.ok) {
        throw new Error(
          `Error al eliminar la canción ${songId}: ${deleteResponse.status}`
        );
      }

      const updatedSongs = contentArtist[0].songs.filter(
        (song) => song.id !== songId
      );
      contentArtist[0].songs = updatedSongs;
      setContentArtist([...contentArtist]);
    } catch (error) {
      console.error("Error al eliminar la canción:", error.message);
    }
  };

  const fetchArtistAndSongs = async () => {
    try {
      const artistPromises = idContent.map(async (contentId) => {
        const artistUrl = `http://localhost:3001/users/content_artists/${contentId}`;
        const artistResponse = await fetch(artistUrl);

        if (!artistResponse.ok) {
          throw new Error(
            `Error en la solicitud para el ID ${contentId}: ${artistResponse.status}`
          );
        }

        const artistData = await artistResponse.json();
        setSaveId(artistData.id);

        const songsUrl = `http://localhost:3001/users/songs/get_songs_by_content_artist/${contentId}`;
        const songsResponse = await fetch(songsUrl);

        if (!songsResponse.ok) {
          throw new Error(
            `Error en la solicitud de canciones para el ID ${contentId}: ${songsResponse.status}`
          );
        }

        const songsData = await songsResponse.json();
        artistData.songs = songsData;

        return artistData;
      });

      const artists = await Promise.all(artistPromises);

      setContentArtist(artists);
      setLoading(false);
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  useEffect(() => {
    if (idContent.length > 0) {
      fetchArtistAndSongs();
    }
  }, [idContent]);

  return (
    <div className="containerar">
      {loading ? (
        <p>Cargando Perfil.....</p>
      ) : (
        contentArtist.map((artist) => (
          <div key={artist.id} >
           <div className="artist-info"><p>{artist.name}</p>
            <img src={artist.image} alt="" id="imgContentArtist" /></div> 
         <div className="songsArtistPage"> <h3>YOUR SONGS:</h3>
            {artist.songs.length > 0 ? (
              <ul>
                {artist.songs.map((song) => (
                  <li key={song.id}>
                    {song.title_song} - {song.genre} - {song.song_duration}
                    <button onClick={() => handleDeleteSong(song.id)}>
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay canciones para este artista</p>
            )}</div>
           
          </div>
          
        ))
      )}
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
