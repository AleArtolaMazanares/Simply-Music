import React from "react";
import NavBarAdmin from "../pages/admin/navBarAdmin";
import { Link } from "react-router-dom";

function MainPageInformation({
  searchQuery,
  handleInputChange,
  loading,
  filteredResults,
  handleDeleteUser,
  users,
  artists,
}) {
  return (
    <div className="containerGlobalMainPage">
      <div>
        <NavBarAdmin />
      </div>
      <div className="containerInformationUsersAndArtist">
        <div>
          <input
            type="text"
            placeholder="Search users and artist"
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
                      <button
                        onClick={() =>
                          handleDeleteUser(result.id, result.role === "artist")
                        }
                      >
                        Delete
                      </button>
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
                      <button onClick={() => handleDeleteUser(user.id, false)}>
                        Delete
                      </button>
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
                      <button onClick={() => handleDeleteUser(artist.id, true)}>
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPageInformation;
