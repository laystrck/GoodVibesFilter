/**
 * GoodVibesFilter | Umami statistics script
 */

import { useEffect } from "react"

function UmamiStatistics() {
    useEffect(() => {
        const umamiScript = document.createElement("script")

        umamiScript.src = "https://umami.landway.space/umami.js"
        umamiScript.async = true
        umamiScript.defer = true
        umamiScript.setAttribute(
            "data-website-id",
            "553f3f44-d949-41f4-929d-3a55656888ee"
        )
        umamiScript.setAttribute("data-do-not-track", "true")

        document.body.appendChild(umamiScript)
    })

    return <></>
}

export default UmamiStatistics
