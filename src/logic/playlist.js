/**
 * GoodVibesFilter | playlist filtering logic
 */

/**
 * Filter a playlist using the given filter list
 *
 * @param {object} spotify Spotify API
 * @param {string} plId playlist ID
 * @param {string[]} filterList List of the artists which should be filtered
 * @returns {Promise} Nothing on success or error code
 */
export const createFilteredPlaylist = (spotify, plId, filterList) => {
    return new Promise((resolve, reject) => {
        spotify.getMe().then(
            (data) => {
                const uId = data.id

                spotify.getPlaylist(plId).then(
                    (data) => {
                        const plName = data.name
                        const fUris = filterUris(data.tracks.items, filterList)

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

/**
 * Generate a list of filtered Spotify URI's using the given filter list
 *
 * @param {object[]} trackObjs Spotify track objects
 * @param {string[]} filterList List of the artists which should be filtered
 * @returns {string|null} List of filtered Spotify URI's or null on failure
 */
const filterUris = (trackObjs, filterList) => {
    const filteredUris = []

    trackObjs.forEach((trackObj) => {
        if (trackObj.track === null) {
            return
        }

        const trUri = trackObj.track.uri
        const trArtists = trackObj.track.artists

        let mustBeFiltered = false

        trArtists.forEach((artist) => {
            const arName = artist.name

            if (filterList.includes(arName)) {
                mustBeFiltered = true
            }
        })

        if (!mustBeFiltered) {
            filteredUris.push(trUri)
        }
    })

    return filteredUris
}
