// Import React and necessary hooks from React Router DOM
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PagePrincipalArtist from "../../artist/pagePrincipalArtist"; // Import component for redirection after submission
import "./style.css"; // Import specific component styles

// Define the functional component Artist
function Artist() {
  // Get the ID from the URL parameter using useParams
  const { id } = useParams();

  // State to store artist form data
  const [formData, setFormData] = useState({
    name_artist: "",
    email: "",
    password: "",
    password_confirmation: "",
    social: "",
    mp3_file: null,
    description_artist: "",
    tags: "",
  });

  // State to control the form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);

  // State to check if the form has already been submitted for the current user
  const [currentUserSubmitted, setCurrentUserSubmitted] = useState(false);

  // Effect to get information about the submitted form for the current user
  useEffect(() => {
    const checkFormSubmitted = async () => {
      try {
        // Make a request to the server to check if the form has already been submitted
        const response = await fetch(
          `http://localhost:3001/users/artists/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        // Handle the response of the form submission information
        if (response.ok) {
          const data = await response.json();

          // Ensure that data and data.formSubmitted are not null
          if (data && data.formSubmitted !== null) {
            setCurrentUserSubmitted(data.formSubmitted);
          } else {
            console.error("Null form submission data.");
          }
        } else {
          console.error("Error retrieving form submission information.");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    // Call the function to check form submission when mounting the component or when 'id' changes
    checkFormSubmitted();
  }, [id]);

  // Effect to handle changes in formSubmitted and currentUserSubmitted
  useEffect(() => {
    // Check if the form has already been submitted for another user
    if (formSubmitted || currentUserSubmitted) {
      setFormSubmitted(false);
    }
  }, [formSubmitted, currentUserSubmitted]);

  // Handle changes in form field values
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If already submitted for this user, do nothing
    if (formSubmitted || currentUserSubmitted) {
      return;
    }

    try {
      // Create a FormData object to send form data to the server
      const formDataForServer = new FormData();

      for (const key in formData) {
        formDataForServer.append(`artist[${key}]`, formData[key]);
      }

      // Send the POST request to the server
      const response = await fetch("http://localhost:3001/users/artists", {
        method: "POST",
        body: formDataForServer,
        credentials: "include",
      });

      // Handle the response of the POST request
      if (response.ok) {
        // Update the state to indicate that the form has been submitted
        setFormSubmitted(true);
        // Redirect to the desired route
        window.location.href = `/home`; // Replace with your destination route
      } else {
        // Handle cases of failed form submission here if necessary
        console.error("Form submission failed:", response.statusText);
        // You can display an error message to the user, for example, using local state
      }
    } catch (error) {
      console.error("Error in the request:", error);
    }
  };

  // If the form has already been submitted for this user, redirect the user to another view
  if (formSubmitted || currentUserSubmitted) {
    return <PagePrincipalArtist />;
  }

  // Render the form
  return (
    <div className="formNewArtist">
      <div id="infoNewArtist">
        <p>
          Join us in this immersive journey and share your music with others!
        </p>
      </div>

      <div className="contentArtistForm">
        {/* Render the form */}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Map over the form fields and render the corresponding input elements */}
          {Object.entries(formData).map(([key, value]) => (
            <React.Fragment key={key}>
              <label>
                {/* Display the field name and replace underscores with spaces */}
                {key.replace(/_/g, " ")}:
                {/* Check if the key is "mp3_file" to render a file input field */}
                {key === "mp3_file" ? (
                  <input type="file" name={key} onChange={handleChange} />
                ) : (
                  ({
                    /* For other keys, render a text or password input field as needed */
                  },
                  (
                    <input
                      type={key.includes("password") ? "password" : "text"}
                      name={key}
                      value={value}
                      onChange={handleChange}
                    />
                  ))
                )}
              </label>
              <br />
            </React.Fragment>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Artist;
