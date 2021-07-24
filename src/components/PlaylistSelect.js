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
            () =>
                toast("Hoppla, wir konnten dich nicht bei Spotify anmelden!", {
                    className: "cst-error-toast",
                })
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
                Welche Playlist möchtest du auswählen?
            </label>
            <select
                defaultValue="-1"
                onChange={handlePlChange}
                className="form-select"
                id="plSelect"
            >
                <option value="-1">Bitte wähle eine Playlist...</option>
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
