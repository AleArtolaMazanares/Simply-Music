import React from "react";
import "../related/style.css";
import BtnPagination from "../BtnPagination";

function Related({
  currentSongs,
  playRelatedSong,
  isPlaying,
  song,
  isPlaying2,

  setCurrentPage,
  relatedSongs,
  songsPerPage,
}) {
  return (
    <div className="containerSongsR">
    <div className="containerRelatedSongs">
      {currentSongs.map((relatedSong, index) => (
        <div
          key={index}
          onClick={() => playRelatedSong(relatedSong)}
          className={isPlaying && relatedSong.id === song.id ? "playing" : ""}
        >
        
            <img
            id="imgRelated"
            src={relatedSong.image}
            alt=""
            onClick={() => playRelatedSong(relatedSong)}
            className={
              isPlaying2 && relatedSong.id === song.id
                ? "rotation-animation"
                : ""
            }
          />
          <p id="titleRelatedSongs">{relatedSong.title_song}</p>
        
        </div>
      ))}
    
    </div>
    <div className="bottomPagination">
        <BtnPagination
          setCurrentPage={setCurrentPage}
          relatedSongs={relatedSongs}
          songsPerPage={songsPerPage}
        />
      </div>
    </div>
    
  );
}

export default Related;
