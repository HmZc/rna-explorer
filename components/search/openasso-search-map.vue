<script>
    import GmapCluster from 'vue2-google-maps/dist/components/cluster'
    export default {
        name: `openasso-search-map`,
        components: {
            GmapCluster
        },
        props: {
            data: { type: Object, required: true },
            markers: { type: Array, required: true }
        },
        data() {
            return {
                window_open: false,
                chartSettings: {
                    mapsApiKey: process.env.GMAP_API_KEY,
                    packages: ['map']
                },
                chartOptions: {
                    showTooltip: true,
                    showInfoWindow: true,
                    mapType: 'normal'
                }
            }
        },
        computed: {
            chartData() {
                return this.markers.map((marker) => {
                    return {
                        name: marker.fields.titre,
                        adress: marker.fields.adresse_to_geocode,
                        lat: parseFloat(marker.geometry.coordinates[1]),
                        lng: parseFloat(marker.geometry.coordinates[0])
                    }
                })
            }
        },
        methods: {
            openWindow() {
                this.window_open = true
            }
        }
    }
</script>

<template lang="pug">
    GmapMap.map(:zoom="6" :center="{ lat: 46, lng: 2 }")
        GmapCluster(
            :maxZoom="8"
            :zoomOnClick="true"
        )
            GmapMarker(
                :key="index"
                v-for="(m, index) in chartData"
                :position="m"
                :clickable="true"
                @click="openWindow"
            )
            GmapInfoWindow(
                v-for="(m, index) in chartData"
                :key="`widow-${index}`"
                :opened="window_open" 
                @closeclick="window_open=false" 
                :options="{pixelOffset: {width: 0,height: -35}}"
                :position="m"
            ) 
                .map-marker__tooltip-name {{m.name }} 
                .map-marker__tooltip-adress {{m.adress}}
</template>

<style lang="scss" scoped>
    .map {
        height: calc(100vh - var(--header-height));
    }
    .map-marker__tooltip-name {
        font-weight: bold;
    }
</style>
