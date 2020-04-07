const API_DATASET = `associations`

export function list(routeParams = {}) {
    return `search/?dataset=${API_DATASET}`
}
