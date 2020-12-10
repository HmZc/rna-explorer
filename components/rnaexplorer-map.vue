<script>
    import * as apiRoutesHelper from '~/helpers/api-routes'
    const DEFAULT_COORDINATE = { lat: 46, lng: 2 }
    const DEFAULT_ZOOM = { out: 5, in: 18 }
    export default {
        name: `rnaexplorer-search-map`,
        DEFAULT_COORDINATE,
        DEFAULT_ZOOM,
        props: {
            setMarker: { type: Object, required: true, default: () => ({}) }
        },
        data() {
            return {
                isMarkerTooltipVisible: false,
                setMapCoordinate: DEFAULT_COORDINATE,
                setMapZoom: DEFAULT_ZOOM.out
            }
        },
        watch: {
            setMarker() {
                if (Object.keys(this.setMarker).length) {
                    if ('geometry' in this.setMarker) {
                        this.setMapCoordinate = {
                            lat: this.setMarker.geometry.coordinates[1],
                            lng: this.setMarker.geometry.coordinates[0]
                        }
                        this.isMarkerTooltipVisible = true
                    } else {
                        this.convertAddressToCoordinates()
                    }
                    this.setMapZoom = DEFAULT_ZOOM.in
                }
                return this.setMapCoordinate
            }
        },
        methods: {
            async convertAddressToCoordinates() {
                const { $axios } = this
                const address = this.$options.filters.singleSpace(
                    this.setMarker.fields.siege_social
                )
                try {
                    const response = await $axios.$get(
                        apiRoutesHelper.geocode({ address })
                    )
                    if (response.results.length) {
                        this.isMarkerTooltipVisible = true
                        return (this.setMapCoordinate =
                            response.results[0].geometry.location)
                    }
                    this.resetMap()
                    this.openNotification(address)
                } catch (error) {}
            },
            openNotification(address) {
                this.$notification.error({
                    message: `Impossible d'afficher sur la carte l'adresse suivante : ${address}`,
                    placement: 'bottomRight',
                    duration: 0
                })
            },
            resetMap() {
                this.setMapZoom = DEFAULT_ZOOM.out
                this.setMapCoordinate = DEFAULT_COORDINATE
                this.isMarkerTooltipVisible = false
            }
        }
    }
</script>

<template lang="pug">
    GmapMap.map(:zoom="setMapZoom" :center="setMapCoordinate")
        GmapMarker(
            :visible="isMarkerTooltipVisible"
            :position="setMapCoordinate"
            :clickable="true"
            @click="isMarkerTooltipVisible=true"
        )
        GmapInfoWindow(
            v-if="isMarkerTooltipVisible"
            :options="{pixelOffset: {width: 0,height: -35}}"
            :position="setMapCoordinate"
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
