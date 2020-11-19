/**
 * GoodVibesFilter | main app
 */

import { useState } from "react"
import SpotifyWebApi from "spotify-web-api-js"
import Cookies from "universal-cookie"
import { v4 as uuidv4 } from "uuid"
import { ToastContainer, toast } from "react-toastify"
import { createFilteredPlaylist } from "./../logic/playlist"
import { parseHash } from "./../utils/url"
import { settingsValues } from "./../utils/settings"

import PlaylistSelect from "./PlaylistSelect"

import "./BootstrapImport.scss"
import "react-toastify/dist/ReactToastify.css"
import "./App.scss"

function App() {
    const params = parseHash(window.location.hash)
    const hashExists =
        params["access_token"] !== undefined && params["state"] !== undefined
    let loginAlright = false

    const [selectedPl, setSelectedPl] = useState({
        id: "-1",
        name: "...",
    })

    let spotify
    const cookies = new Cookies()

    if (hashExists) {
        const accessToken = params["access_token"]
        const givenState = params["state"]

        const shouldState = cookies.get("spotify_auth_state")

        if (givenState === shouldState) {
            spotify = new SpotifyWebApi()
            spotify.setAccessToken(accessToken)

            loginAlright = true
        } else {
            toast(
                "Hoppla, es ist ein Problem bei der Spotify-Anmeldung aufgetreten!",
                {
                    className: "cst-error-toast",
                }
            )
        }
    }

    function handleLoginClick(e) {
        e.preventDefault()

        const v4id = uuidv4()

        cookies.set("spotify_auth_state", v4id)

        window.location.href =
            "https://accounts.spotify.com/authorize?client_id=" +
            settingsValues.spotify_client_id +
            "&response_type=token&redirect_uri=" +
            settingsValues.encoded_redirect_uri +
            "&state=" +
            v4id +
            "&scope=playlist-read-private,playlist-read-collaborative,playlist-modify-private"
    }

    function handleActionClick(e) {
        e.preventDefault()

        createFilteredPlaylist(spotify, selectedPl.id)
            .then(() => {
                toast(
                    "Wir haben deine Playlist in deinem Spotify-Konto gespeichert!",
                    {
                        className: "cst-success-toast",
                    }
                )
            })
            .catch((err) => {
                toast("Hoppla, da ist ein Fehler aufgetreten!", {
                    className: "cst-error-toast",
                })
            })
    }

    return (
        <div className="container center-content">
            <div className="text-center">
                <h1 className="main-title">
                    GoodVibesFilter{" "}
                    <span role="img" aria-label="CD & cool">
                        💿😎
                    </span>
                </h1>
                <p>
                    Du hast genug von Deutschrap auf deinen Spotify-Playlists?
                    Die Charts sind voll damit? Kein Problem - GoodVibesFilter
                    macht deine Playlists ganz einfach Deutschrap-frei!
                </p>
                <p className="spotify-login-area">
                    <button
                        onClick={handleLoginClick}
                        className="btn btn-spotify"
                    >
                        Mit Spotify anmelden
                    </button>
                </p>
                {loginAlright && (
                    <>
                        <PlaylistSelect
                            spotifyApi={spotify}
                            plSet={setSelectedPl}
                        />
                        {selectedPl.id !== "-1" && (
                            <>
                                <p className="action-description">
                                    Wir werden eine neue Playlist mit dem Namen
                                    "{selectedPl.name} (GoodVibesFilter)" in
                                    deinem Spotify-Konto erstellen, die kein
                                    Deutschrap mehr enthält. Die originale
                                    Playlist wird davon nicht berührt.
                                </p>
                                <p>
                                    <button
                                        onClick={handleActionClick}
                                        className="btn btn-primary"
                                    >
                                        Alles klar, los geht's!
                                    </button>
                                </p>
                            </>
                        )}
                    </>
                )}
                <hr className="footer-sep" />
                <p>
                    {new Date().getFullYear()} • Kontakt via E-Mail:{" "}
                    <a href="mailto:hey@layst.rocks">hey@layst.rocks</a>
                </p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default App
