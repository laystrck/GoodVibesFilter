/**
 * GoodVibesFilter | playlist direct input
 */

import { toast } from "react-toastify"

function PlaylistDirectInput(props) {
    const spotify = props.spotifyApi

    function isValidSpotifyShareURL(input) {
        const ssExp = new RegExp(/open\.spotify\.com\/playlist\/[A-Za-z0-9]*/)

        return input.match(ssExp) !== null
    }

    function getSpotifyPlID(input) {
        const ssExp = new RegExp(/open\.spotify\.com\/playlist\/([A-Za-z0-9]*)/)

        const res = input.match(ssExp)

        if (res === null) {
            return null
        }

        if (res.length < 2) {
            return null
        }

        return res[1]
    }

    function handleInputChange(e) {
        const val = e.target.value

        if (!isValidSpotifyShareURL(val)) {
            return
        }

        const plId = getSpotifyPlID(val)

        spotify.getPlaylist(plId).then(
            (data) =>
                props.plSet({
                    id: data.id,
                    name: data.name,
                }),
            () =>
                toast(
                    "Hoppla, das scheint keine gültige Playlist zu sein! Ist sie öffentlich abrufbar?",
                    {
                        className: "cst-error-toast",
                    }
                )
        )
    }

    return (
        <div className="playlist-input-area">
            <small>
                <label htmlFor="plInput">
                    Du kannst alternativ auch einen Playlist-Link hier eingeben:
                </label>
            </small>
            <input
                onChange={handleInputChange}
                placeholder="Playlist-Link aus Spotify, im Format: https://open.spotify.com/playlist/12345..."
                className="form-control form-control-sm"
                id="plInput"
            />
        </div>
    )
}

export default PlaylistDirectInput
