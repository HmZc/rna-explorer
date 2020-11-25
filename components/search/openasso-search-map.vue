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
        watch: {
            marker() {
                if (Object.keys(this.marker).length) {
                    if ('geometry' in this.marker) {
                        this.mapCoordinate = {
                            lat: this.marker.geometry.coordinates[1],
                            lng: this.marker.geometry.coordinates[0]
                        }
                    } else {
                        this.convertAddressToCoordinates()
                    }
                    this.updateZoom()
                }
                return this.mapCoordinate
            }
        },
        methods: {
            updateZoom() {
                this.mapZoom = 18
            },
            async convertAddressToCoordinates() {
                const { $axios } = this
                const address = this.marker.fields.siege_social.replace(
                    /  +/g,
                    ' '
                )
                try {
                    const response = await $axios.$get(
                        `https://nominatim.openstreetmap.org/search.php?q=${address}&format=jsonv2`
                    )
                    this.mapCoordinate = {
                        lat: parseFloat(response[0].lat),
                        lng: parseFloat(response[0].lon)
                    }
                } catch (error) {}
            }
        }
    }
</script>

<template lang="pug">
    GmapMap.map(:zoom="mapZoom" :center="mapCoordinate")
        GmapMarker(
            v-if="Object.keys(marker).length"
            :position="mapCoordinate"
            :clickable="true"
            @click="markerTooltip=true"
        )
        GmapInfoWindow(
            v-if="Object.keys(marker).length"
            :options="{pixelOffset: {width: 0,height: -35}}"
            :position="mapCoordinate"
            :opened="markerTooltip"
            @closeclick="markerTooltip=false"
        ) 
            .map-marker__tooltip-name {{marker.fields.nouveau_titre || marker.fields.titre}}
            .map-marker__tooltip-adress {{marker.fields.siege_social || marker.fields.adresse_to_geocode}}
</template>

<style lang="scss" scoped>
    .map {
        height: calc(100vh - var(--header-height));
    }
    .map-marker__tooltip-name {
        font-weight: bold;
    }
</style>
