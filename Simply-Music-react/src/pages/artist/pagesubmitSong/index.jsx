import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSimplyContext } from "../../../components/simplyContext/simplyProvider";
function SongSubmit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { decryptData } = useSimplyContext();
  const [userId, SetUserId] = useState([]);

  const [formData, setFormData] = useState({
    title_song: "",
    song_file: null,
    genre: "",
    song_duration: "",
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionData = localStorage.getItem("sessionData");
        if (sessionData) {
          const decryptedData = await decryptData(sessionData);
          SetUserId(decryptedData.userId);
        }
      } catch (error) {
        console.error("Error during session decryption:", error);
      }
    };

    fetchData();
  }, [decryptData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let processedValue = value;

    // Convertir el valor del campo 'genre' a minúsculas si no es un campo de archivo
    if (name === "genre" && type !== "file") {
      processedValue = value.toLowerCase();
    }

    // Actualizar el estado del formulario con el nuevo valor
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : processedValue,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar campos obligatorios
    const requiredFields = [
      "title_song",
      "song_file",
      "genre",
      "song_duration",
    ];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      // Mostrar un mensaje de error si faltan campos obligatorios
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Por favor, complete los campos obligatorios: ${emptyFields.join(
          ", "
        )}`,
      });
      return;
    }

    try {
      // Crear un objeto FormData para enviar al servidor
      const formDataForServer = new FormData();
      formDataForServer.append("song[content_artist_id]", id || "");

      // Agregar los campos del formulario al objeto FormData
      for (const key in formData) {
        formDataForServer.append(`song[${key}]`, formData[key]);
      }

      // Enviar la solicitud al servidor
      const response = await fetch("http://localhost:3001/users/songs", {
        method: "POST",
        body: formDataForServer,
      });

      // Verificar si la solicitud fue exitosa
      if (response.ok) {
        // Mostrar un mensaje de éxito
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });

        // Redirigir a una nueva ubicación
        navigate(`/MainArtist/${userId}`);
      } else {
        // Mostrar un mensaje de error si la solicitud no fue exitosa
        console.error("Error al crear la canción:", response.statusText);
      }
    } catch (error) {
      // Capturar y manejar errores
      console.error("Error en la solicitud:", error);
    }
  };
  // Lista de géneros musicales
  const musicGenres = [
    "Pop",
    "Rock",
    "Hip Hop",
    "Country",
    "Jazz",
    "Electronic",
    "Classical",
    "Blues",
    "R&B",
    "Reggae",
    "Folk",
    "Indie",
    "Metal",
    "Punk",
    "Soul",
    "Funk",
    "Disco",
    "Gospel",
    "Techno",
    "House",
    "Ambient",
    "Dubstep",
    "Salsa",
    "Bachata",
    "Mariachi",
    "Ska",
    "Trap",
    "Rap",
    "K-pop",
    "J-pop",
    "Reggaeton",
    "Opera",
    "Alternative",
    "Grime",
    "Country Rock",
    "Fusion",
    "Garage",
    "Hard Rock",
    "New Wave",
    "Psychedelic",
    "Surf",
    "Trance",
    "Rancheras",
  ];

  return (
    <div>
      <h2>Song Submission Form</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {Object.entries(formData).map(
          ([key, value]) =>
            key !== "content_artist_id" && (
              <React.Fragment key={key}>
                <label>
                  {key.replace(/_/g, " ")}:
                  {key === "genre" ? (
                    <select name={key} value={value} onChange={handleChange}>
                      <option value="" disabled>
                        Selecciona un género
                      </option>
                      {musicGenres.map((genre) => (
                        <option key={genre} value={genre.toLowerCase()}>
                          {genre}
                        </option>
                      ))}
                    </select>
                  ) : key === "song_file" ? (
                    <input type="file" name={key} onChange={handleChange} />
                  ) : (
                    <input
                      type={key.includes("password") ? "password" : "text"}
                      name={key}
                      value={value}
                      onChange={handleChange}
                    />
                  )}
                </label>
                <br />
              </React.Fragment>
            )
        )}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default SongSubmit;
