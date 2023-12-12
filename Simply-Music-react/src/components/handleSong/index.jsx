// Importaciones necesarias
import React, { useState, useRef } from "react";
import "../handleSong/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";

// Función principal del componente
function HandleSong({
  song,
  genre,
  audioKey,
  autoPlay,
  handleEnded,
  isPlaying,
  setIsPlaying,
  playPreviousSong,
  playNextSong,
}) {
  // Estado para almacenar el tiempo actual de reproducción
  const [currentTime, setCurrentTime] = useState(0);
  // Estado para almacenar la duración total de la canción
  const [duration, setDuration] = useState(0);

  // Referencia al elemento de audio
  const audioRef = useRef();

  // Función para manejar la reproducción o pausa de la canción
  const handlePlay = () => {
    // Si está en reproducción, pausa; de lo contrario, reproduce
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    // Actualizar el estado de reproducción
    setIsPlaying(!isPlaying);
  };

  // Función para pausar la reproducción de la canción
  const handlePause = () => {
    audioRef.current.pause();
    // Actualizar el estado de reproducción a falso
    setIsPlaying(false);
  };

  // Función para manejar la actualización del tiempo de reproducción
  const handleTimeUpdate = () => {
    // Actualizar el estado del tiempo actual de reproducción
    setCurrentTime(audioRef.current.currentTime);
  };

  // Función para manejar la carga de datos del audio
  const handleLoadedData = () => {
    // Obtener y actualizar la duración total de la canción
    setDuration(audioRef.current.duration);
  };

  // Función para manejar el clic en la barra de progreso y saltar a una posición específica
  const handleProgressBarClick = (e) => {
    // Calcular el tiempo de reproducción según la posición del clic
    const clickedTime =
      (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
    // Establecer la posición de reproducción en el tiempo calculado
    audioRef.current.currentTime = clickedTime;
    // Actualizar el estado del tiempo actual de reproducción
    setCurrentTime(clickedTime);
  };

  // Función para formatear el tiempo en minutos y segundos
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    // Formatear el tiempo en el formato "mm:ss"
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    return formattedTime;
  };

  // Renderización del componente
  return (
    <div>
      {/* Verificación de existencia de datos de la canción */}
      {song.title_song && (
        <>
          {/* Contenedor de información de la canción */}
          <div className="songsContentContainer">
            <img src={song.image} alt="" id="" />
            <p>{song.title_song}</p>
            {/* Mostrar el género si está disponible */}
            {genre && <p>Genre: {genre}</p>}
          </div>

          {/* Contenedor del reproductor de audio */}
          {song.song_file && (
            <div className="custom-audio-container">
              {/* Elemento de audio */}
              <audio
                key={audioKey}
                controls={false}
                autoPlay={autoPlay}
                onEnded={handleEnded}
                ref={audioRef}
                className="custom-audio-player"
                onTimeUpdate={handleTimeUpdate}
                onLoadedData={handleLoadedData}
              >
                {/* Fuente de audio */}
                <source
                  src={`http://localhost:3001${song.song_file.url}`}
                  type="audio/mp3"
                />
                Tu navegador no soporta la etiqueta de audio.
              </audio>

              {/* Visualización del tiempo de reproducción y duración */}
              <div className="song-duration">
                <p>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </p>
              </div>

              {/* Barra de progreso */}
              <div
                className="custom-progress-bar-container"
                onClick={handleProgressBarClick}
              >
                <div
                  className="custom-progress-bar"
                  style={{
                    width: `${(currentTime / duration) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Controles de reproducción */}
              <div className="custom-controls">
                {/* Botón para reproducir la canción anterior */}
                <button id="buttonsPlaySongs" onClick={playPreviousSong}>
                  <FontAwesomeIcon icon={faStepBackward} />
                </button>

                {/* Botón para reproducir o pausar la canción */}
                <button
                  id="buttonsPlaySongsPlay"
                  onClick={isPlaying ? handlePause : handlePlay}
                >
                  {isPlaying ? (
                    <FontAwesomeIcon icon={faPause} />
                  ) : (
                    <FontAwesomeIcon icon={faPlay} />
                  )}
                </button>

                {/* Botón para reproducir la siguiente canción */}
                <button id="buttonsPlaySongs" onClick={playNextSong}>
                  <FontAwesomeIcon icon={faStepForward} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Exportar el componente HandleSong
export default HandleSong;
