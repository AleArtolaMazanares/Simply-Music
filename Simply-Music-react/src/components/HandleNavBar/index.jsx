import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function HandleNavBar({ isNavOpen, toggleNav, userRole, userId, prueba }) {
  return (
    <div className={`sidebar ${isNavOpen ? "open" : ""}`}>
      <div className="menu-toggle" onClick={toggleNav}>
        ☰
      </div>
      <div className="logoNavBar">
        <img
          src="https://cdn.discordapp.com/attachments/1110957174655553606/1181636395106836510/simply_Mesa_de_trabajo_1.png?ex=6581c7a6&is=656f52a6&hm=9b51e57aaaf6ff6cbe6a70c9b360e681e08465d18d188c9ac5a82b62902d69c8&"
          alt=""
        />
      </div>
      <div className="menu-items">
        {userRole === "user" && (
          <>
            <Link to={`/home`}>
              <div>
                <FontAwesomeIcon icon={faHouse} id="iconHome" />
                Home
              </div>
            </Link>

            <Link to={`/FormArtist`}>
              <div>
                <FontAwesomeIcon icon={faHouse} id="iconHome" />
                artist
              </div>
            </Link>
          </>
        )}

        {userRole === "artist" && (
          <>
            <Link to={`/user/${userId}`}>
              <FontAwesomeIcon icon={faMicrophone} id="iconHome" />
              home
            </Link>
            <Link to={`/MainArtist/${userId}`}>
              <FontAwesomeIcon icon={faMicrophone} id="iconHome" />
              main
            </Link>
          </>
        )}
        {userRole === "admin" && (
          <>
            <p>aquí van las rutas de admin</p>
          </>
        )}
        <Link to={"/"}>Logout</Link>
      </div>
      <div className="menuHome">
        <h3>MUSIC LIBRARY</h3>
        {prueba && <p>{prueba.name_users}</p>}
        {/* Verificación de nulidad antes de acceder a la propiedad */}
      </div>
    </div>
  );
}

export default HandleNavBar;
