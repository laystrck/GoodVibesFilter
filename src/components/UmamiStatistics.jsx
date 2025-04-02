/**
 * GoodVibesFilter | Umami statistics script
 */

import { useEffect } from "react"

function UmamiStatistics() {
    useEffect(() => {
        if (import.meta.env.REACT_APP_ENABLE_UMAMI_STATISTICS !== "true") {
            return
        }

        const umamiScript = document.createElement("script")

        umamiScript.src = import.meta.env.REACT_APP_UMAMI_URL
        umamiScript.async = true
        umamiScript.defer = true
        umamiScript.setAttribute(
            "data-website-id",
            import.meta.env.REACT_APP_UMAMI_ID
        )
        umamiScript.setAttribute("data-do-not-track", "true")

        document.body.appendChild(umamiScript)
    })

    return <></>
}

export default UmamiStatistics
