/**
 * GoodVibesFilter | filter list selection
 */

import { useEffect, useState } from "react"

import filteredArtists from "./../utils/filteredArtists.json"

function FilterListSelect(props) {
    const [filters, setFilters] = useState([])

    useEffect(() => {
        setFilters(filteredArtists.filterLists)
    }, [filters, setFilters])

    function handleFlChange(e) {
        const val = e.target.value

        if (val === "-1") {
            return props.flSet({
                name: "...",
                artists: [],
            })
        }

        props.flSet(filters[val])
    }

    return (
        <div className="playlist-select-area">
            <label htmlFor="flSelect">
                Which genre do you want to filter from your playlist?
            </label>
            <select
                defaultValue="-1"
                onChange={handleFlChange}
                className="form-select"
                id="flSelect"
            >
                <option value="-1">Please choose a filter list...</option>
                {filters.map((flData, fI) => (
                    <option key={fI} value={fI}>
                        {flData.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default FilterListSelect
