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
                toast.error(
                    "Oops, that doesn't seem to be a valid playlist! Is it publicly available?"
                )
        )
    }

    return (
        <div className="playlist-input-area">
            <small>
                <label htmlFor="plInput">
                    You can alternatively enter a playlist link here:
                </label>
            </small>
            <input
                onChange={handleInputChange}
                placeholder="Playlist link from Spotify, in format: https://open.spotify.com/playlist/12345..."
                className="form-control form-control-sm"
                id="plInput"
            />
        </div>
    )
}

export default PlaylistDirectInput
