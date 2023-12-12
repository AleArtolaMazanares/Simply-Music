// Imports
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

// BtnPagination Component
function BtnPagination({ setCurrentPage, relatedSongs, songsPerPage }) {
  return (
    // Pagination button container
    <div className="btnPagination">
      {/* Button to go back one page */}
      <button 
        onClick={() =>
          // Update the current page by subtracting 1, ensuring it doesn't go below 1
          setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage))
        }
      >
        {/* Left arrow icon */}
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      {/* Button to go forward one page */}
      <button className="btnPagination"
        onClick={() =>
          // Update the current page by adding 1, ensuring it doesn't exceed the total pages
          setCurrentPage((prevPage) =>
            prevPage < Math.ceil(relatedSongs.length / songsPerPage)
              ? prevPage + 1
              : prevPage
          )
        }
      >
        {/* Right arrow icon */}
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
}

// Export the BtnPagination component
export default BtnPagination;
