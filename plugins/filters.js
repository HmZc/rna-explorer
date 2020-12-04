import Vue from 'vue'

Vue.filter(`bigNumber`, (value) => {
    if (value > 999 && value < 1000000) return (value / 1000).toFixed(0) + 'K'
    // convert to K for valueber from > 1000 < 1 million
    else if (value > 1000000) return (value / 1000000).toFixed(0) + 'M'
    // convert to M for valueber from > 1 million
    else if (value < 900) return value // if value < 1000, nothing to do
})

Vue.filter(`truncate`, (value, limit) => {
    if (value.length > limit) return value.substring(0, limit) + ` ...`
    return value
})

Vue.filter(`singleSpace`, (value) => {
    return value.replace(/  +/g, ' ')
})
