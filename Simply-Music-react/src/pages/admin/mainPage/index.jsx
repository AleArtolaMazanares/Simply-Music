import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import MyButton from "../../../components/ButtonDeleteAdmin";
function MainAdmin() {
  const [users, setUsers] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responseUsers = await fetch("http://localhost:3001/users/users");
        const usersData = await responseUsers.json();

        const filteredUsers = usersData.filter((user) => user.role === "user");
        const filteredArtists = usersData.filter(
          (user) => user.role === "artist"
        );

        setUsers(filteredUsers);
        setArtists(filteredArtists);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Update filteredResults based on users, artists, and searchQuery
    setFilteredResults(
      [...users, ...artists].filter((user) =>
        user.name_users.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users, artists]);

  const handleDeleteUser = async (userId, isArtist) => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        if (isArtist) {
          setArtists((prevArtists) =>
            prevArtists.filter((artist) => artist.id !== userId)
          );
        } else {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userId)
          );
        }
        console.log(`Usuario con ID ${userId} eliminado correctamente.`);
      } else {
        console.error(`Error al eliminar el usuario con ID ${userId}`);
      }
    } catch (error) {
      console.error("Error al intentar eliminar el usuario:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Only update filteredResults if there is a non-empty search query
    if (query.trim() !== "") {
      setFilteredResults(
        [...users, ...artists].filter((user) =>
          user.name_users.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      // If the search query is empty, reset filteredResults to an empty array
      setFilteredResults([]);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <div>
        <input
          type="text"
          placeholder="Search users"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {searchQuery.trim() !== "" && filteredResults.length > 0 && (
            <div>
              <h3>Search Results</h3>
              <ul>
                {filteredResults.map((result) => (
                  <li key={result.id}>
                    <Link to={`/editPageAdmin/${result.id}`}>
                      {result.username}
                      <p>{result.name_users}</p>
                    </Link>
                    <MyButton
                      onClick={() =>
                        handleDeleteUser(result.id, result.role === "artist")
                      }
                    ></MyButton>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!searchQuery.trim() && (
            <div>
              <h3>User List</h3>
              <ul>
                {users.map((user) => (
                  <li key={user.id}>
                    <Link to={`/editPageAdmin/${user.id}`}>
                      {user.username}
                      <p>{user.name_users}</p>
                    </Link>
                    <MyButton
                      onClick={() => handleDeleteUser(user.id, false)}
                    ></MyButton>
                  </li>
                ))}
              </ul>

              <h3>Artist List</h3>
              <ul>
                {artists.map((artist) => (
                  <li key={artist.id}>
                    <Link to={`/editPageAdmin/${artist.id}`}>
                      {artist.username}
                      <p>{artist.name_users}</p>
                    </Link>
                    <MyButton
                      onClick={() => handleDeleteUser(artist.id, true)}
                    ></MyButton>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MainAdmin;
