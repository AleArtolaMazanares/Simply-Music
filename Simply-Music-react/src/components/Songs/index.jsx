import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

function Songs({canciones, loadingSongs}) {
  return (

    <div className="containerSongs">
      <div className="ContainerPlaySong">
      {loadingSongs ? (
        <p>Cargando canciones...</p>
      ) : (
        <>
          <h2>SONGS:</h2>
        
          {canciones.length > 0 ? (
            <div className="containerInfoPlaySong">
              {canciones.map((cancion) => (
                <Link
                  to={`/PlaySong/${cancion.id}`}
                  key={cancion.id}
                  class="link-style"
                >
                  <div className="InfoPlaySong">
                  <img src={cancion.image} alt="" id="pruebaImg" />
                    <p>{cancion.title_song}</p>
                   
                  </div>
                </Link>
                
              ))}
              
            </div>
          ) : (
            <p>No hay canciones</p>
          )}
        </>
      )}
      </div>
    </div>
    
  );
}

export default Songs;
