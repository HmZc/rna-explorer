<script>
    import Qs from 'qs'
    import { Layout } from 'ant-design-vue'
    import * as apiRoutesHelper from '~/helpers/api-routes'
    import RnaexplorerHeader from '~/components/layout/rnaexplorer-header.vue'
    import RnaexplorerChartByTerritory from '~/components/charts/rnaexplorer-by-territory.vue'
    import RnaexplorerChartByCreationDate from '~/components/charts/rnaexplorer-by-creation-date.vue'

    export default {
        components: {
            'a-layout-header': Layout.Header,
            RnaexplorerHeader,
            RnaexplorerChartByTerritory,
            RnaexplorerChartByCreationDate
        },
        async asyncData(nuxtContext) {
            const { $axios } = nuxtContext
            try {
                const response = await $axios.$get(apiRoutesHelper.list(), {
                    params: {
                        facet: [
                            `nom_reg`,
                            `commune`,
                            `nom_dep`,
                            `datedeclaration`
                        ],
                        rows: 50
                    },
                    paramsSerializer: (params) => {
                        return Qs.stringify(params, { arrayFormat: `repeat` })
                    }
                })
                return {
                    data: response
                }
            } catch (error) {}
        },
        data() {
            return {
                data: [],
                height: 0
            }
        },
        computed: {
            formatedCreationDateData() {
                return this.data.facet_groups.filter(
                    (facet) => facet.name === 'datedeclaration'
                )[0].facets
            }
        },
        mounted() {
            this.matchHeight()
        },
        methods: {
            matchHeight() {
                this.height = this.$refs.main.clientHeight
            }
        },
        head: {
            title: 'RNA EXPLORER - Analyser',
            meta: [
                {
                    hid: 'analyse-desc',
                    name: 'description',
                    content:
                        'Représentation graphique des données issues du répertoire national des associations (RNA)'
                }
            ]
        }
    }
</script>

<template lang="pug">
        //- antdv provides a layout system based on flex. 
        //- It makes layout shifting when we refresh the app, that is why we use grid
        .container
            header
                a-layout-header.header
                    rnaexplorer-header
            main(ref="main")
                RnaexplorerChartByTerritory( class="chart-total" :data="data.facet_groups" :height="height")
                RnaexplorerChartByCreationDate(class="chart-declaration-date" :data="formatedCreationDateData" :height="height")

  
</template>

<style lang="scss" scoped>
    main {
        background: whitesmoke;
        display: grid;
        grid-template-areas: 'chart-total chart-declaration-date';
        grid-template-columns: 1fr 1fr;
        grid-gap: 0;
        grid-column-gap: var(--big-gutter);
        height: calc(100vh - var(--header-height));
        padding: var(--big-gutter) var(--big-gutter);
        box-sizing: 0;
    }
    header {
        grid-area: header;
    }
    nav {
        grid-area: nav;
        border: 1px solid var(--c-border-color);
    }
    .chart-total {
        grid-area: chart-total;
    }
    .chart-declaration-date {
        grid-area: chart-declaration-date;
    }
</style>
