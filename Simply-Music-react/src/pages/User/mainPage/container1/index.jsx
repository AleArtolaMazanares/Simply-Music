import React from "react";
import "../container1/style.css";
import "./style.css";
import { Link } from "react-router-dom";

function InfoArtist() {
  return (
    <div className="mainContainerM">
      <div className="headerContainer">
        <h1 id="phrase2">SIMPLY MUSIC</h1>
        <h1>Discover your pation for the music</h1>
      </div>
      <div className="infoContainer">
      
        <p>
        Welcome to Simply Music, where the magic of music awaits you. 
        Explore a world of artists, discover new genres and find the best playlists.
        </p>
      </div>
      <div className="containerMainInfo">
      <div className="featuresContainer">
        <h3>Highlighted features</h3>
        <ul>
          <li>Explore a vast music library.</li>
          <li>Create and share your own playlists</li>
          <li>Connect with artists and music enthusiasts</li>
        </ul>
      </div>
      <div className="ctaContainer">
        <h3>Join Simply Music today</h3>
        <p>
        Join us to experience music in an entirely new way. If you're not a member yet, sign up now and start your musical journey!
        </p>
      </div>
      </div>
      <div className="buttonContainer">
        <div id="loginB">
         
          <Link to="/login" className="Links">
            LOGIN
          </Link>
        
        </div>
        <div id="registerB">
          <Link to="/register" className="Links">
            REGISTER
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InfoArtist;
