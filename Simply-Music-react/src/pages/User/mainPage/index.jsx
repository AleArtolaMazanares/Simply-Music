import React from "react";
import "./style.css";

import InfoArtist from "./container1";
import ImgArtistPagePrincipal from "./container2";

function MainPage() {
  return (
    <div className="ContainerPrincipal">
      <div className="containerGlobal">
        <div className="container1">
          <InfoArtist />
          
        
        </div>
        <div className="container2">
          <ImgArtistPagePrincipal />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
