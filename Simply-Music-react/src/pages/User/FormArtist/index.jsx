import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PagePrincipalArtist from "../../artist/pagePrincipalArtist";
import "./style.css";

function Artist() {
  // Obtener el ID del parámetro de la URL
  const { id } = useParams();

  // Estado para almacenar los datos del formulario del artista
  const [formData, setFormData] = useState({
    name_artist: "",
    email: "",
    password: "",
    password_confirmation: "",
    social: "",
    mp3_file: null,
    description_artist: "",
    tags: "",
  });

  // Estado para controlar el estado de envío del formulario
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  // Estado para verificar si el formulario ya se envió para el usuario actual
  const [usuarioActualEnviado, setUsuarioActualEnviado] = useState(false);

  // Efecto para obtener la información del formulario enviado para el usuario actual
  useEffect(() => {
    const verificarFormularioEnviado = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/users/artists/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();

          // Asegúrate de que data y data.formularioEnviado no sean nulos
          if (data && data.formularioEnviado !== null) {
            setUsuarioActualEnviado(data.formularioEnviado);
          } else {
            console.error("Datos de formulario enviados nulos.");
          }
        } else {
          console.error(
            "Error al obtener la información del formulario enviado."
          );
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    verificarFormularioEnviado();
  }, [id]);

  // Efecto para manejar cambios en formularioEnviado y usuarioActualEnviado
  useEffect(() => {
    // Verifica si el formulario ya fue enviado para otro usuario
    if (formularioEnviado || usuarioActualEnviado) {
      setFormularioEnviado(false);
    }
  }, [formularioEnviado, usuarioActualEnviado]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si ya se ha enviado para este usuario, no hagas nada
    if (formularioEnviado || usuarioActualEnviado) {
      return;
    }

    try {
      // Crear un objeto FormData para enviar datos del formulario al servidor
      const formDataForServer = new FormData();

      for (const key in formData) {
        formDataForServer.append(`artist[${key}]`, formData[key]);
      }

      // Enviar la solicitud POST al servidor
      const response = await fetch("http://localhost:3001/users/artists", {
        method: "POST",
        body: formDataForServer,
        credentials: "include",
      });

      if (response.ok) {
        // Actualizar el estado para indicar que el formulario se ha enviado
        setFormularioEnviado(true);
        // Redirige a la ruta deseada
        window.location.href = `/home`; // Reemplaza con tu ruta de destino
      } else {
        // Manejar casos de inicio de sesión fallido aquí si es necesario
        console.error("Inicio de sesión fallido:", response.statusText);
        // Puedes mostrar un mensaje de error al usuario, por ejemplo, utilizando el estado local
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  // Si ya se envió el formulario para este usuario, redirigir al usuario a otra vista
  if (formularioEnviado || usuarioActualEnviado) {
    return <PagePrincipalArtist />;
  }

  // Renderizar el formulario
  return (
    <div className="formNewArtist">
      <div id="infoNewArtist">
        <p>
          Join us in this immersive journey and share your music with others!
        </p>
      </div>

      <div className="contentArtistForm">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Mapear los campos del formulario y renderizar los elementos de entrada correspondientes */}
          {Object.entries(formData).map(([key, value]) => (
            <React.Fragment key={key}>
              <label>
                {/* Mostrar el nombre del campo y reemplazar guiones bajos con espacios */}
                {key.replace(/_/g, " ")}:
                {/* Comprobar si la clave es "mp3_file" para renderizar un campo de archivo */}
                {key === "mp3_file" ? (
                  <input type="file" name={key} onChange={handleChange} />
                ) : (
                  ({
                    /* Para otras claves, renderizar un campo de texto o contraseña según sea necesario */
                  },
                  (
                    <input
                      type={key.includes("password") ? "password" : "text"}
                      name={key}
                      value={value}
                      onChange={handleChange}
                    />
                  ))
                )}
              </label>
              <br />
            </React.Fragment>
          ))}
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default Artist;
