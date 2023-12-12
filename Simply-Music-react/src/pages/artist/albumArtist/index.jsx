import React, { useState } from "react";
import { useParams } from "react-router-dom";

function AlbumArtist() {
  const { id } = useParams();
  console.log(id);

  const [albumData, setAlbumData] = useState({
    name_album: "",
    img: "",
    description: "",
    song_files: [], // Cambiado a un array para permitir archivos múltiples
    content_artist_id: id,
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setAlbumData({
        ...albumData,
        [name]: files,
      });
    } else {
      setAlbumData({
        ...albumData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in albumData) {
      if (key === "song_files") {
        for (let i = 0; i < albumData[key].length; i++) {
          formData.append(`${key}[${i}]`, albumData[key][i]);
        }
      } else {
        formData.append(key, albumData[key]);
      }
    }

    try {
      const response = await fetch("http://localhost:3001/users/albums", {
        method: "POST",
        body: formData,
      });

      console.log("Response:", response);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setAlbumData({
        name_album: "",
        img: "",
        description: "",
        song_files: [],
        content_artist_id: id,
      });

      console.log("Álbum creado exitosamente");
    } catch (error) {
      console.error("Error al crear el álbum:", error.message);
    }
  };

  return (
    <div>
      <h2>Create Album</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name Album:
          <input
            type="text"
            name="name_album"
            value={albumData.name_album}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="img"
            value={albumData.img}
            onChange={handleInputChange}
          />
        </label>
        {albumData.img && (
          <img
            src={albumData.img}
            alt="Album Preview"
            style={{ maxWidth: "300px", marginTop: "10px" }}
          />
        )}
        <label>
          Description:
          <textarea
            name="description"
            value={albumData.description}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <label>
          Song Files:
          <input
            type="file"
            name="song_files"
            onChange={handleInputChange}
            multiple
          />
        </label>
        <button type="submit">Create Album</button>
      </form>
    </div>
  );
}

export default AlbumArtist;
