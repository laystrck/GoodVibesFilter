/**
 * GoodVibesFilter | playlist selection
 */

import { useEffect, useState } from "react"
import { toast } from "react-toastify"

function PlaylistSelect(props) {
    const spotify = props.spotifyApi

    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        spotify.getUserPlaylists().then(
            (data) => setPlaylists(data.items),
            () => toast.error("Oops, we couldn't sign you in at Spotify!")
        )
    }, [spotify, setPlaylists])

    function handlePlChange(e) {
        const val = e.target.value

        if (val === "-1") {
            return props.plSet({
                id: val,
                name: "...",
            })
        }

        props.plSet({
            id: playlists[val].id,
            name: playlists[val].name,
        })
    }

    return (
        <div className="playlist-select-area">
            <label htmlFor="plSelect">
                Which playlist do you want to choose?
            </label>
            <select
                defaultValue="-1"
                onChange={handlePlChange}
                className="form-select"
                id="plSelect"
            >
                <option value="-1">Please choose a playlist...</option>
                {playlists.map((plData, pI) => (
                    <option key={pI} value={pI}>
                        {plData.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default PlaylistSelect
