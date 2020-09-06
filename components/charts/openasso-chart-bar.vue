<script>
    import { GChart } from 'vue-google-charts'

    export default {
        name: `openasso-chart-bar`,
        components: {
            GChart
        },
        props: {
            data: { type: Array, required: true, default: () => [] },
            height: { type: Number, required: false }
        },
        computed: {
            chartOptions() {
                return {
                    legend: 'none',
                    colors: ['#1890ff'],
                    height: this.height,
                    chartArea: {
                        height: '80%',
                        width: '80%'
                    },
                    animation: { duration: 2500, easing: 'out' },
                    tooltip: {
                        textStyle: { color: '#001529', fontSize: '14' },
                        showColorCode: false,
                        format: 'short'
                    },
                    vAxis: {
                        textStyle: {
                            color: '#000',
                            fontSize: '10'
                        }
                    },
                    hAxis: {
                        textStyle: {
                            color: '#000',
                            fontSize: '10'
                        },
                        format: 'short'
                    },
                    bar: { groupWidth: 2 }
                }
            },
            formatedData() {
                return [
                    ...[['Nom', 'Total']],
                    ...this.data.map((item) => [item.name, item.count])
                ]
            }
        }
    }
</script>

<template lang="pug">
    GChart( 
        type="BarChart"
        :data="formatedData"
        :options="chartOptions"
    )
</template>

<style lang="scss" scoped></style>
