import React, { useState, useEffect } from "react";

function HandleFeed({ id }) {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/users/feeds/feeds_for_user/${id}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los feeds");
        }
        const data = await response.json();
        setFeeds(data);
      } catch (error) {
        console.error("Error de solicitud:", error.message);
      }
    };

    fetchFeeds();
  }, [id]);

  const handleDelete = async (feedId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/feeds/${feedId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el feed");
      }

      // Actualizar la lista de feeds después de la eliminación
      setFeeds((prevFeeds) => prevFeeds.filter((feed) => feed.id !== feedId));
    } catch (error) {
      console.error("Error de solicitud:", error.message);
    }
  };

  return (
    <div>
      <h2>Feeds for User {id}</h2>
      {feeds.length === 0 ? (
        <p>No hay comentarios.</p>
      ) : (
        <ul>
          {feeds.map((feed) => (
            <li key={feed.id}>
              {feed.content} - {feed.date}
              <button onClick={() => handleDelete(feed.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HandleFeed;
