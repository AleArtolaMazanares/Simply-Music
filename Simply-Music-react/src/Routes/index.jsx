// RoutesPages.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/User/mainPage/index";
import Register from "../pages/User/register/index";
import LoginForm from "../pages/User/login/index";
import HomePage from "../pages/User/homePage/index";
import NavBar from "../pages/User/navbar";
import NavBarArtist from "../pages/artist/NavBarArtist";
import ArtistView from "../pages/artist";
import Artist from "../pages/User/FormArtist";
import MainArtist from "../pages/artist/MainArtist";
import PagePrincipalArtist from "../pages/artist/pagePrincipalArtist";
import ArtistDetailPage from "../pages/User/ArtistDetailPage";
import EditPage from "../pages/artist/pagePrincipalArtist/edit";
import SongSubmit from "../pages/artist/pagesubmitSong";
import PlaySong from "../pages/User/playSong";
import MessageArtist from "../pages/artist/messageArtist";
import Album from "../pages/User/album";
import AlbumArtist from "../pages/artist/albumArtist";
import ReproductorMusic from "../pages/User/reproductor album";
import NavBarAdmin from "../pages/admin/navBarAdmin";
import MainAdmin from "../pages/admin/mainPage";
import EditPageAdmin from "../pages/admin/mainPage/Edit";
import DeatilsAdminArtist from "../pages/admin/mainPage/DeatilsAdminArtist";
import { SimplyProvider } from "../components/simplyContext/simplyProvider";
import ProtectedRoute from "../components/ProtectedRoute";
import PlaySongArtist from "../pages/artist/PlaySongArtist";
import { MusicProvider } from "../components/MusicContext/MusicContext";

function RoutesPages() {
  return (
    <SimplyProvider>
      <MusicProvider>
        <Routes caseSensitive>
          <Route path="/" element={<MainPage />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<LoginForm />} />
          {/* Rutas para Usuarios */}
          <Route element={<NavBar />}>
            <Route
              path="home"
              element={
                <ProtectedRoute
                  element={<HomePage />}
                  requiredRoles={["user", "artist"]}
                />
              }
            />
            <Route
              path="FormArtist"
              element={
                <ProtectedRoute element={<Artist />} requiredRoles={["user"]} />
              }
            />
            <Route
              path="Album"
              element={
                <ProtectedRoute element={<Album />} requiredRoles={["user"]} />
              }
            />
            <Route
              path="PlaySong/:id"
              element={
                <ProtectedRoute
                  element={<PlaySong />}
                  requiredRoles={["user", "artist"]}
                />
              }
            />
            <Route
              path="reproductorMusic/:id"
              element={
                <ProtectedRoute
                  element={<ReproductorMusic />}
                  requiredRoles={["user"]}
                />
              }
            />
            <Route
              path="artists/:id"
              element={
                <ProtectedRoute
                  element={<ArtistDetailPage />}
                  requiredRoles={["user", "artist"]}
                />
              }
            />
          </Route>{" "}
          {/*cierre de rutas */}
          {/* Rutas para Artistas */}
          <Route element={<NavBar />}>
            <Route
              path="PlaySongArtist/:id"
              element={
                <ProtectedRoute
                  element={<PlaySongArtist />}
                  requiredRoles={["artist"]}
                />
              }
            />
            <Route
              path="messageArtist/:id"
              element={
                <ProtectedRoute
                  element={<MessageArtist />}
                  requiredRoles={["artist"]}
                />
              }
            />
            <Route
              path="user/:id"
              element={
                <ProtectedRoute
                  element={<ArtistView />}
                  requiredRoles={["artist", "user"]}
                />
              }
            />
            <Route
              path="songSubmit/:id"
              element={
                <ProtectedRoute
                  element={<SongSubmit />}
                  requiredRoles={["artist"]}
                />
              }
            />
            <Route
              path="MainArtist/:id"
              element={
                <ProtectedRoute
                  element={<MainArtist />}
                  requiredRoles={["artist"]}
                />
              }
            />
            <Route
              path="AlbumArtist/:id"
              element={
                <ProtectedRoute
                  element={<AlbumArtist />}
                  requiredRoles={["artist"]}
                />
              }
            />
            <Route
              path="editPageArtist/:id"
              element={
                <ProtectedRoute
                  element={<EditPage />}
                  requiredRoles={["artist"]}
                />
              }
            />
          </Route>
          {/* Rutas para Administradores */}
          <Route element={<NavBar />}>
            <Route
              path="/admin"
              element={
                <ProtectedRoute
                  element={<MainAdmin />}
                  requiredRoles={["admin"]}
                />
              }
            />
            <Route
              path="editArtistPageAdmin/:id"
              element={
                <ProtectedRoute
                  element={<DeatilsAdminArtist />}
                  requiredRoles={["admin"]}
                />
              }
            />
            <Route
              path="editPageAdmin/:id"
              element={
                <ProtectedRoute
                  element={<EditPageAdmin />}
                  requiredRoles={["admin"]}
                />
              }
            />
          </Route>
        </Routes>
      </MusicProvider>
    </SimplyProvider>
  );
}

export default RoutesPages;
