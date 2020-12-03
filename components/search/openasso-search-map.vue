<script>
    const DEFAULT_COORDINATE = { lat: 46, lng: 2 }
    const DEFAULT_ZOOM = { out: 5, in: 18 }

    export default {
        name: `openasso-search-map`,
        DEFAULT_COORDINATE,
        DEFAULT_ZOOM,
        props: {
            setMarker: { type: Object, required: true, default: () => ({}) }
        },
        data() {
            return {
                isMarkerTooltipVisible: true,
                mapCoordinate: DEFAULT_COORDINATE,
                mapZoom: DEFAULT_ZOOM.out
            }
        },
        watch: {
            setMarker() {
                if (Object.keys(this.setMarker).length) {
                    if ('geometry' in this.setMarker) {
                        this.mapCoordinate = {
                            lat: this.setMarker.geometry.coordinates[1],
                            lng: this.setMarker.geometry.coordinates[0]
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
                this.mapZoom = DEFAULT_ZOOM.in
            },
            async convertAddressToCoordinates() {
                const { $axios } = this
                const address = this.setMarker.fields.siege_social.replace(
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
            v-if="Object.keys(setMarker).length"
            :position="mapCoordinate"
            :clickable="true"
            @click="isMarkerTooltipVisible=true"
        )
        GmapInfoWindow(
            v-if="Object.keys(setMarker).length"
            :options="{pixelOffset: {width: 0,height: -35}}"
            :position="mapCoordinate"
            :opened="isMarkerTooltipVisible"
            @closeclick="isMarkerTooltipVisible=false"
        ) 
            .map-marker__tooltip-name {{setMarker.fields.nouveau_titre || setMarker.fields.titre}}
            .map-marker__tooltip-adress {{setMarker.fields.siege_social || setMarker.fields.adresse_to_geocode}}
</template>

<style lang="scss" scoped>
    .map {
        height: calc(100vh - var(--header-height));
    }
    .map-marker__tooltip-name {
        font-weight: bold;
    }
</style>
