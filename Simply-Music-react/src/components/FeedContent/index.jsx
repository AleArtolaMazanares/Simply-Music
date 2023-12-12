import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function FeedContent() {
  // Estado para almacenar la información de los feeds
  const [feeds, setFeeds] = useState([]);
  const { id } = useParams(); // Obtener el parámetro de la URL (si estás utilizando React Router)
  // ID del usuario autenticado (supongamos que lo obtienes de tu sistema de autenticación)
  const authenticatedUserId = id; // Reemplázalo con la lógica para obtener el ID del usuario autenticado

  // Estado para gestionar la edición en línea
  const [editingFeed, setEditingFeed] = useState(null);

  useEffect(() => {
    // Función para obtener los feeds
    const fetchFeeds = async () => {
      try {
        const response = await fetch("http://localhost:3001/users/feeds");

        if (!response.ok) {
          throw new Error("Error al obtener los feeds");
        }

        const data = await response.json();
        setFeeds(data);
      } catch (error) {
        console.error("Error de solicitud:", error.message);
      }
    };

    // Llamar a la función para obtener los feeds cuando el componente se monta
    fetchFeeds();
  }, []); // El segundo argumento del useEffect es un array vacío, para que se ejecute solo una vez al montar el componente

  // Función para eliminar un feed
  const deleteFeed = async (feedId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/feeds/${feedId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el feed");
      }

      // Actualizar el estado para reflejar la eliminación del feed
      setFeeds((prevFeeds) => prevFeeds.filter((feed) => feed.id !== feedId));
    } catch (error) {
      console.error("Error de solicitud:", error.message);
    }
  };

  // Función para editar un feed
  const editFeed = async (feedId, newContent) => {
    try {
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

      if (!response.ok) {
        throw new Error("Error al editar el feed");
      }

      // Actualizar el estado para reflejar la edición del feed
      setFeeds((prevFeeds) =>
        prevFeeds.map((feed) =>
          feed.id === feedId ? { ...feed, content: newContent } : feed
        )
      );

      // Finalizar la edición
      setEditingFeed(null);
    } catch (error) {
      console.error("Error de solicitud:", error.message);
    }
  };

  return (
    <div>
      <h2>Feed Content</h2>
      <ul>
        {feeds.map((feed) => (
          <li key={feed.id}>
            {editingFeed === feed.id ? (
              // Mostrar campo de edición si se está editando este feed
              <div>
                <input
                  type="text"
                  value={feed.content}
                  onChange={(e) =>
                    setFeeds((prevFeeds) =>
                      prevFeeds.map((f) =>
                        f.id === feed.id ? { ...f, content: e.target.value } : f
                      )
                    )
                  }
                />
                <button onClick={() => editFeed(feed.id, feed.content)}>
                  Guardar
                </button>
              </div>
            ) : (
              // Mostrar el comentario normal si no se está editando
              <div>
                {feed.content} - {feed.date}{" "}
                {String(feed.user_id) === String(authenticatedUserId) && (
                  <div>
                    <button onClick={() => deleteFeed(feed.id)}>
                      Eliminar
                    </button>
                    <button onClick={() => setEditingFeed(feed.id)}>
                      Editar
                    </button>
                  </div>
                )}
                {/* Mostrar el botón de eliminación y edición solo si el usuario autenticado es el dueño del comentario */}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedContent;
