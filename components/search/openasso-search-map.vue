<script>
    export default {
        name: `openasso-search-map`,
        props: {
            data: { type: Array, required: true }
        },
        data() {
            return {
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
            // GOOGLE : "String addresses load more slowly,
            // especially when you have more than 10 addresses."
            chartData() {
                return [['city']].concat(
                    this.data.map((e) => [e.fields.siege_social])
                )
            }
        }
    }
</script>

<template lang="pug">
    GChart.chart( 
        type="Map" 
        :settings="chartSettings" 
        :data="chartData" 
        :options="chartOptions"
    )
</template>

<style lang="scss" scoped>
    .chart {
        height: calc(100vh - var(--header-height));
    }
</style>
