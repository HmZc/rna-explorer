<script>
    import { Select } from 'ant-design-vue'
    import { GChart } from 'vue-google-charts'
    import * as explorerHelpers from '~/helpers/explorer.js'

    export default {
        name: `openasso-by-territory`,
        components: {
            'a-select': Select,
            'a-select-option': Select.Option,
            GChart,
            explorerHelpers
        },
        props: {
            data: { type: Array, required: true, default: () => [] },
            height: { type: Number, required: true, default: 800 }
        },
        data() {
            return {
                selectedMesh: explorerHelpers.getDefaultMesh()
            }
        },
        computed: {
            chartOptions() {
                // colors should be variables
                return {
                    title:
                        'Visualisation basée sur le jeu de données téléchargeable en haut à droite',
                    titleTextStyle: {
                        color: '#c1c1c1',
                        bold: false,
                        italic: true
                    },
                    legend: 'none',
                    colors: ['#1890ff'],
                    height: this.height - 150,
                    chartArea: {
                        width: '70%',
                        height: '80%'
                    },
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
                            fontSize: '10'
                        },
                        format: 'short'
                    }
                }
            },
            formatedData() {
                return [
                    ['name', 'total', { role: 'annotation' }],
                    ...this.data
                        .find((mesh) => mesh.name === this.selectedMesh)
                        .facets.map((item) => [
                            item.name,
                            item.count,
                            item.count
                        ])
                        .slice(0, 20) // ~~~
                ]
            }
        },
        methods: {
            getMeshes() {
                return explorerHelpers.MESHES
            },
            updateMesh(mesh) {
                this.selectedMesh = mesh
            }
        }
    }
</script>

<template lang="pug">
    div(class="openasso-by-territory_container")
        div(class="openasso-by-territory_heading")
            h1(class="openasso-by-territory_title") Total d'associations - Maille :  
            a-select(
                class="openasso-by-territory_select"
                v-model="selectedMesh"
                @change="updateMesh(selectedMesh)"
            )
                a-select-option(
                    v-for="mesh in getMeshes()"
                    :key="mesh.key"
                    :label="mesh.label"
                )
                    span {{ mesh.label }} 
        GChart( 
            type="BarChart"
            :data="formatedData" 
            :options="chartOptions"
        )
</template>

<style lang="scss" scoped>
    .openasso-by-territory_heading {
        display: flex;
        align-items: baseline;
    }
    .openasso-by-territory_title {
        font-size: 1.3rem;
    }
    .openasso-by-territory_select {
        min-width: 200px;
        margin-left: 10px;
    }
</style>
