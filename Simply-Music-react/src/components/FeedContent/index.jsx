import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import "../FeedContent/style.css";
import SpinnerLoading from "../SpinerLoading/index"; // Importa el componente SpinnerLoading

function FeedContent() {
  // Estados para almacenar información
  const [feeds, setFeeds] = useState([]); // Almacena los feeds obtenidos del servidor
  const { id } = useParams(); // Obtiene el parámetro de la URL
  const authenticatedUserId = id; // ID del usuario autenticado (obtenido de tu sistema de autenticación)
  const [editingFeed, setEditingFeed] = useState(null); // Almacena el ID del feed que está siendo editado
  const [loading, setLoading] = useState(true); // Indica si la carga de feeds está en progreso

  // Efecto secundario para obtener los feeds cuando el componente se monta
  useEffect(() => {
    // Función para obtener los feeds
    const fetchFeeds = async () => {
      try {
        const response = await fetch("http://localhost:3001/users/feeds");

        // Verifica si la solicitud fue exitosa
        if (!response.ok) {
          throw new Error("Error al obtener los feeds");
        }

        // Obtiene los datos de la respuesta
        const data = await response.json();

        // Obtiene información detallada del usuario para cada feed
        const feedsWithUserInfo = await Promise.all(
          data.map(async (feed) => {
            const userResponse = await fetch(
              `http://localhost:3001/users/users/${feed.user_id}`
            );
            const userData = await userResponse.json();
            return { ...feed, user_info: userData };
          })
        );

        // Actualiza el estado con los feeds obtenidos
        setFeeds(feedsWithUserInfo);

        // Cambia el estado de carga a falso cuando la carga está completa
        setLoading(false);
      } catch (error) {
        // Manejo de errores en caso de que la solicitud falle
        console.error("Error de solicitud:", error.message);

        // Cambia el estado de carga a falso en caso de error
        setLoading(false);
      }
    };

    // Llama a la función para obtener los feeds cuando el componente se monta
    fetchFeeds();
  }, []); // El segundo argumento del useEffect es un array vacío, se ejecuta solo una vez al montar el componente

  // Función para eliminar un feed
  const deleteFeed = async (feedId) => {
    try {
      // Realiza la solicitud para eliminar el feed
      const response = await fetch(
        `http://localhost:3001/users/feeds/${feedId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Verifica si la solicitud fue exitosa
      if (!response.ok) {
        throw new Error("Error al eliminar el feed");
      }

      // Actualiza el estado para reflejar la eliminación del feed
      setFeeds((prevFeeds) => prevFeeds.filter((feed) => feed.id !== feedId));
    } catch (error) {
      // Manejo de errores en caso de que la solicitud falle
      console.error("Error de solicitud:", error.message);
    }
  };

  // Función para editar un feed con validación de campo en blanco
  const editFeed = async (feedId, newContent) => {
    try {
      // Validar que el nuevo contenido no esté en blanco
      if (!newContent.trim()) {
        // Muestra una alerta si el contenido está en blanco
        alert("El contenido no puede estar en blanco");
        return; // No continúa con la edición si hay campos en blanco
      }

      // Realiza la solicitud para editar el feed
      const response = await fetch(
        `http://localhost:3001/users/feeds/${feedId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: newContent,
          }),
        }
      );

      // Verifica si la solicitud fue exitosa
      if (!response.ok) {
        throw new Error("Error al editar el feed");
      }

      // Actualiza el estado para reflejar la edición del feed
      setFeeds((prevFeeds) =>
        prevFeeds.map((feed) =>
          feed.id === feedId ? { ...feed, content: newContent } : feed
        )
      );

      // Finaliza la edición
      setEditingFeed(null);
    } catch (error) {
      // Manejo de errores en caso de que la solicitud falle
      console.error("Error de solicitud:", error.message);
    }
  };

  return (
    <div className="feedContainer">
      {loading && <SpinnerLoading />} {/* Muestra el indicador de carga mientras se cargan los feeds */}
      {feeds.map((feed) => (
        <div className="feedCard" key={feed.id}>
          {editingFeed === feed.id ? (
            <div>
              {/* Formulario de edición si está en modo de edición */}
              <input
                type="text"
                value={feed.content}
                onChange={(e) =>
                  setFeeds((prevFeeds) =>
                    prevFeeds.map((f) =>
                      f.id === feed.id
                        ? { ...f, content: e.target.value }
                        : f
                    )
                  )
                }
              />
              <button onClick={() => editFeed(feed.id, feed.content)}>
                Guardar
              </button>
            </div>
          ) : (
            <div>
              {/* Vista normal si no está en modo de edición */}
              {feed.content} - {feed.date}{" "}
              {String(feed.user_id) === String(authenticatedUserId) && (
                <div>
                  <button onClick={() => deleteFeed(feed.id)}>Eliminar</button>
                  <button onClick={() => setEditingFeed(feed.id)}>Editar</button>
                </div>
              )}
              <p>
                Propietario: {feed.user_info.name_users}{" "}
                {feed.user_info.role === "artist" && (
                  <FontAwesomeIcon icon={faCrown} />
                )}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FeedContent;
