const DATASET = `associations`
const GMAP_API_KEY = process.env.GMAP_API_KEY

export function list(routeParams = {}) {
    return `search/?dataset=${DATASET}`
}

export function geocode(routeParams = {}) {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${routeParams.address}&key=${GMAP_API_KEY}`
}
