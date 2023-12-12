import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PagePrincipalArtist from "../../artist/pagePrincipalArtist";

function EditPageAdmin() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    role: "",
    name_users: "",
  });
  const [contentArtistIds, setContentArtistIds] = useState([]);

  const fetchContentArtistIds = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/content_artists/get_ids_by_user?user_id=${id}`
      );
      if (!response.ok) {
        throw new Error(
          `Error fetching content artist IDs: ${response.statusText}`
        );
      }
      const data = await response.json();
      console.log(`respuesta ${data}`);
      setContentArtistIds(data);
    } catch (error) {
      console.error("Error fetching content artist IDs:", error.message);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/users/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching user data: ${response.statusText}`);
        }
        const userData = await response.json();
        setUserData(userData);
        setFormData({
          role: userData.role,
          name_users: userData.name_users,
        });
        setLoading(false);

        // Llamar a la función para obtener los IDs del contenido del artista
        fetchContentArtistIds(id);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/users/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // Enviar datos bajo la clave 'users'
        body: JSON.stringify({ users: formData }),
      });

      if (response.ok) {
        console.log("User information updated successfully");
      } else {
        const errorData = await response.json();
        console.error("Error updating user information:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div>
      <h2>Edit User Information</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Role:
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="artist">Artist</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <br />
          <label>
            Name:
            <input
              type="text"
              name="name_users"
              value={formData.name_users}
              onChange={handleChange}
            />
          </label>
          <br />
          {formData.role === "artist" && (
            <p>
              {loading
                ? "Loading..."
                : contentArtistIds.length > 0
                ? `Content Artist IDs: ${contentArtistIds.join(", ")}`
                : "Artist has not uploaded anything yet"}
            </p>
          )}
         
          {formData.role === "artist" &&  <Link to={`/editArtistPageAdmin/${contentArtistIds}`}><p>view details artist</p></Link>}
      
         
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
}

export default EditPageAdmin;
