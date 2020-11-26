/**
 * GoodVibesFilter | playlist editing logic
 */

import { filteredArtistsList } from "./../utils/filteredArtists"

export const createFilteredPlaylist = (spotify, plId) => {
    return new Promise((resolve, reject) => {
        spotify.getMe().then(
            (data) => {
                const uId = data.id

                spotify.getPlaylist(plId).then(
                    (data) => {
                        const plName = data.name
                        const fUris = filterUris(data.tracks.items)

                        spotify
                            .createPlaylist(uId, {
                                name: plName + " (GoodVibesFilter)",
                                public: false,
                            })
                            .then(
                                (data) => {
                                    const plId = data.id

                                    spotify
                                        .addTracksToPlaylist(plId, fUris)
                                        .then(
                                            () => {
                                                resolve()
                                            },
                                            () => {
                                                reject("playlist_fill_error")
                                            }
                                        )
                                },
                                () => {
                                    reject("playlist_create_error")
                                }
                            )
                    },
                    () => {
                        reject("playlist_read_error")
                    }
                )
            },
            () => {
                reject("user_info_read_error")
            }
        )
    })
}

const filterUris = (trackObjs) => {
    const filteredUris = []

    trackObjs.forEach((trackObj) => {
        const trUri = trackObj.track.uri
        const trArtists = trackObj.track.artists

        let mustBeFiltered = false

        trArtists.forEach((artist) => {
            const arName = artist.name

            if (filteredArtistsList.includes(arName)) {
                mustBeFiltered = true
            }
        })

        if (!mustBeFiltered) {
            filteredUris.push(trUri)
        }
    })

    return filteredUris
}
