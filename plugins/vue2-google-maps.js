import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyALHAcoHlSJk4_PCx1QNjNkSD5jq-6QH1E',
        libraries: 'places'
    }
})
