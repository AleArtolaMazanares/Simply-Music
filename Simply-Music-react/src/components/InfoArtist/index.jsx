import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

function InfoArtist({artists}) {
  return (
    <div className="relatedArtistsContainer">
      <p id="relatedArtist">You maybe like:</p>
      {artists.map((artist, index) => (
        <div key={index}>
          <Link to={`/artists/${artist.id}`}>
            <div className="imgRelatedArtist"> <img src={artist.image} alt={`Artist ${index + 1}`} id="" /></div>
           
          </Link>
        </div>
      ))}
    </div>
  );
}

export default InfoArtist;
