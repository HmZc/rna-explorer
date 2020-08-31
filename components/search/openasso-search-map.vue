<script>
    import GmapCluster from 'vue2-google-maps/dist/components/cluster'
    export default {
        name: `openasso-search-map`,
        components: {
            GmapCluster
        },
        props: {
            marker: { type: Object, required: true, default: () => ({}) }
        },
        data() {
            return {
                markerTooltip: true,
                mapCoordinate: { lat: 46, lng: 2 },
                mapZoom: 5,
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
            markerFocus() {
                if (Object.keys(this.marker).length) {
                    this.updateZoom()
                    return {
                        lat: this.marker.geometry.coordinates[1],
                        lng: this.marker.geometry.coordinates[0]
                    }
                }
                return this.mapCoordinate
            }
        },
        methods: {
            updateZoom() {
                this.mapZoom = 18
            }
        }
    }
</script>

<template lang="pug">
    GmapMap.map(:zoom="mapZoom" :center="markerFocus")
        GmapMarker(
            v-if="Object.keys(marker).length"
            :position="{lat: marker.geometry.coordinates[1], lng: marker.geometry.coordinates[0]}"
            :clickable="true"
            @click="markerTooltip=true"
        )
        GmapInfoWindow(
            v-if="Object.keys(marker).length"
            :options="{pixelOffset: {width: 0,height: -35}}"
            :position="{lat: marker.geometry.coordinates[1], lng: marker.geometry.coordinates[0]}"
            :opened="markerTooltip"
            @closeclick="markerTooltip=false"
        ) 
            .map-marker__tooltip-name {{marker.fields.titre}}
            .map-marker__tooltip-adress {{marker.fields.adresse_to_geocode}}
</template>

<style lang="scss" scoped>
    .map {
        height: calc(100vh - var(--header-height));
    }
    .map-marker__tooltip-name {
        font-weight: bold;
    }
</style>
