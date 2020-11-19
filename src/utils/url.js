/**
 * GoodVibesFilter | URL utils
 */

exports.parseHash = (hash) => {
    let params = []

    hash = hash.substr(1)
    hash.split("&").forEach((param) => {
        const paramParts = param.split("=")

        if (paramParts.length !== 2) {
            return
        }

        const paramName = paramParts[0]
        const paramVal = paramParts[1]

        params[paramName] = paramVal
    })

    return params
}
