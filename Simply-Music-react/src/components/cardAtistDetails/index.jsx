import React from "react";
import "../cardAtistDetails/style.css";
import Messages from "../messages";

// CardArtistDetail Component
function CardArtistDetail({ informationArtist, messages }) {
  return (
    <div className="card">
      <div className="content">
        <div className="back">
          <div className="back-content">
            {/* Display artist name and image */}
            <p>{informationArtist.name}</p>
            <img src={informationArtist.image} alt="" id="pruebaImage" />
          </div>
        </div>
        <div className="front">
          <div className="img">
            {/* Circles and title */}
            <div className="circle" id="right"></div>
            <div className="circle" id="bottom"></div>
            <h1 id="titleCard">Simply Music</h1>
            
            {/* Artist information */}
            <div id="infoCardArtist">
              <p>{informationArtist.bio}</p>
            </div> 
            
            {/* Display messages related to the artist */}
            <div id="messagesArtistContent">
              <Messages messages={messages} />
            </div> 
          </div>

          <div className="front-content">
            {/* Display genre badge */}
            <small className="badge">{informationArtist.genre}</small>
            <div className="description">
              <div className="title">
                {/* Artist profile title */}
                <p className="title">
                  <strong>Artist profile</strong>
                </p>
                {/* SVG or other content related to artist profile */}
                <svg
                  fillRule="nonzero"
                  height="15px"
                  width="15px"
                  viewBox="0,0,256,256"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Include any SVG content here */}
                </svg>
              </div>
              {/* Additional information or footer */}
              <p className="card-footer">SIMPLY MUSIC &nbsp;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the CardArtistDetail component
export default CardArtistDetail;
