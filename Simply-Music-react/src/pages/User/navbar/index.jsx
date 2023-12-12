// NavBar.js
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { useSimplyContext } from "../../../components/simplyContext/simplyProvider";

import "./style.css";
import { useState, useEffect } from "react";

function NavBar() {
  const { userRole, decryptData } = useSimplyContext();
  const [prueba, setPrueba] = useState(null);
  const [userId, SetUserId] = useState([])

  const [isNavOpen, setIsNavOpen] = useState(true);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Ejemplo de cómo usar decryptData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionData = localStorage.getItem("sessionData");
        if (sessionData) {
          const decryptedData = await decryptData(sessionData);
          setPrueba(decryptedData);
          SetUserId(decryptedData.userId)
        }
      } catch (error) {
        console.error("Error during session decryption:", error);
      }
    };

    fetchData();
  }, [decryptData]);

  return (
    <>
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
        <div><p id="welcomeSession">WELCOME:</p></div>
          {prueba && <p id="nameSession">{prueba.name_users}</p>}
          {userRole === "user" && (
            <>
              <Link to={`/user/${userId}`}>
                <div>
                  <FontAwesomeIcon icon={faHouse} id="iconHome" />
                 Home
                </div>
              </Link>

              <Link to={`/FormArtist`}>
                <div>
                  <FontAwesomeIcon icon={faMicrophone} id="iconHome" />
                  Artist
                </div>
              </Link>
            </>
          )}

          {userRole === "artist" && (
            <>
              <Link to={`/user/${userId}`}>
                <FontAwesomeIcon icon={faMicrophone} id="iconHome" />
                Home
              </Link>
              <Link to={`/MainArtist/${userId}`}>
                <FontAwesomeIcon icon={faMicrophone} id="iconHome" />
                Main
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

        </div>
      </div>
      <Outlet />
    </>
  );
}

export default NavBar;
