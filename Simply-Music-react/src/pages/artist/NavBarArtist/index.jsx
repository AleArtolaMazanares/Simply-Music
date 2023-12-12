import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

function NavBarArtist() {
  const { id } = useParams();
  const [saveIdUser, setSaveIdUser] = useState(null);

  const getIdByUserId = async () => {
    try {
      const url = `http://localhost:3001/users/content_artists/${id}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setSaveIdUser(data);
      } else {
        console.error("Error al obtener datos del usuario");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    getIdByUserId();
  }, [id]);

  return (
    <>
      <div className="ContainerNavBarHomePage">

        {saveIdUser === null || saveIdUser === undefined ? (
            <Link to={`/user/${id}`}>Home</Link>
        ) : (
          <Link to={`/user/${saveIdUser.user_id}`}>Home</Link>
        )}

        {/* Verificar si saveIdUser es null o undefined */}
        {saveIdUser === null || saveIdUser === undefined ? (
          <Link to={`/MainArtist/${id}`}>Main</Link>
        ) : (
          <Link to={`/MainArtist/${saveIdUser.user_id}`}>Main</Link>
        )}

        <Link to={"/"}>Logout</Link>
      </div>
      <Outlet />
    </>
  );
}

export default NavBarArtist;
