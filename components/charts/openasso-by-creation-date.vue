<script>
    import { GChart } from 'vue-google-charts'

    export default {
        name: `openasso-by-creation-date`,
        components: {
            GChart
        },
        props: {
            data: { type: Array, required: true, default: () => [] },
            height: { type: Number, required: false }
        },
        computed: {
            formatedData() {
                return [
                    ['year', 'total'],
                    ...this.data
                        .filter(
                            (item) =>
                                parseInt(item.path) > 2004 &&
                                parseInt(item.path) <= 2020
                        )
                        .map((item) => [item.path, item.count])
                ]
            },
            chartOptions() {
                return {
                    chartArea: {
                        width: '85%',
                        height: '80%'
                    },
                    title:
                        'Visualisation basée sur le jeu de données téléchargeable en haut à droite',
                    titleTextStyle: {
                        color: '#c1c1c1',
                        bold: false,
                        italic: true
                    },
                    curveType: 'function',
                    height: this.height - 150,
                    legend: 'none',
                    animation: {
                        duration: 500,
                        easing: 'out',
                        startup: true
                    },
                    vAxis: {
                        textStyle: {
                            fontSize: '10'
                        },
                        format: 'short'
                    },
                    hAxis: {
                        textStyle: {
                            fontSize: '10'
                        }
                    }
                }
            }
        }
    }
</script>

<template lang="pug">
    div
        h1(class="openasso-by-creation-date_title") Évolution du nombre de créations d'associations depuis 2005
        GChart( 
            type="LineChart"
            :data="formatedData" 
            :options="chartOptions"
        )   
</template>

<style lang="scss" scoped>
    .openasso-by-creation-date_title {
        font-size: 1.3rem;
    }
</style>
