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

import PlaylistSelect from "./PlaylistSelect"
import FilterListSelect from "./FilterListSelect"
import PlaylistDirectInput from "./PlaylistDirectInput"
import UmamiStatistics from "./UmamiStatistics"

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
    const [filterList, setFilterList] = useState({
        name: "...",
        artists: [],
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
            toast.error("Oops, there's been a problem with the Spotify login!")
        }
    }

    function handleLoginClick(e) {
        e.preventDefault()

        const v4id = uuidv4()

        cookies.set("spotify_auth_state", v4id)

        window.location.href =
            "https://accounts.spotify.com/authorize?client_id=" +
            process.env.REACT_APP_SPOTIFY_CLIENT_ID +
            "&response_type=token&redirect_uri=" +
            process.env.REACT_APP_ENCODED_REDIRECT_URI +
            "&state=" +
            v4id +
            "&scope=playlist-read-private,playlist-read-collaborative,playlist-modify-private"
    }

    function handleActionClick(e) {
        e.preventDefault()

        createFilteredPlaylist(spotify, selectedPl.id, filterList.artists)
            .then(() => {
                toast.success(
                    "We've saved your playlist to your Spotify account!"
                )
            })
            .catch(() => {
                toast.error("Oops, an error has occurred!")
            })
    }

    return (
        <div className="container center-content">
            <div className="content-box text-center">
                <h1 className="main-title">
                    GoodVibesFilter{" "}
                    <span role="img" aria-label="CD & cool">
                        💿😎
                    </span>
                </h1>
                <p>
                    You've had enough of genres you hate on your Spotify
                    playlists? The charts are full of it? No problem -
                    GoodVibesFilter filters your playlists easily from unwanted
                    genres!
                </p>
                <p className="spotify-login-area">
                    <button
                        onClick={handleLoginClick}
                        className="btn btn-spotify text-white"
                    >
                        Log in with Spotify
                    </button>
                </p>
                {loginAlright && (
                    <>
                        <PlaylistSelect
                            spotifyApi={spotify}
                            plSet={setSelectedPl}
                        />
                        <PlaylistDirectInput
                            spotifyApi={spotify}
                            plSet={setSelectedPl}
                        />
                        {selectedPl.id !== "-1" && (
                            <>
                                <FilterListSelect flSet={setFilterList} />
                                {filterList.name !== "..." && (
                                    <>
                                        <p className="action-description">
                                            We will create a new playlist named
                                            "{selectedPl.name}{" "}
                                            (GoodVibesFilter)" in your your
                                            Spotify account, which will not
                                            contain {filterList.name} anymore.
                                            The original playlist won't be
                                            touched.
                                        </p>
                                        <p>
                                            <button
                                                onClick={handleActionClick}
                                                className="btn btn-appprimary text-white"
                                            >
                                                Okay, let's go!
                                            </button>
                                        </p>
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
                <hr className="footer-sep" />
                <p>
                    {new Date().getFullYear()} • contact via e-mail:{" "}
                    <a href={"mailto:" + process.env.REACT_APP_CONTACT_EMAIL}>
                        {process.env.REACT_APP_CONTACT_EMAIL}
                    </a>{" "}
                    • Open Source on{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/laystrck/GoodVibesFilter"
                    >
                        GitHub
                    </a>{" "}
                    •{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={process.env.REACT_APP_PRIVACY_POLICY_URL}
                    >
                        privacy policy
                    </a>
                </p>
            </div>
            <ToastContainer />
            <UmamiStatistics />
        </div>
    )
}

export default App
