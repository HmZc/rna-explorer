<script>
    import Qs from 'qs' // A querystring parsing and stringifying library
    import { Layout } from 'ant-design-vue'
    import * as apiRoutesHelper from '~/helpers/api-routes'
    import OpenassoHeader from '~/components/openasso-header.vue'
    import OpenassoSearchTable from '~/components/search/openasso-search-table.vue'
    import OpenassoSearchMap from '~/components/search/openasso-search-map.vue'
    import OpenassoSidebar from '~/components/search/openasso-sidebar.vue'

    export default {
        components: {
            'a-layout': Layout,
            'a-layout-header': Layout.Header,
            OpenassoHeader,
            OpenassoSearchTable,
            OpenassoSearchMap,
            OpenassoSidebar
        },
        async asyncData(nuxtContext) {
            const { $axios } = nuxtContext
            try {
                const response = await $axios.$get(apiRoutesHelper.list(), {
                    params: {
                        facet: [`nom_reg`, `commune`, `nom_dep`],
                        rows: 50
                    },
                    paramsSerializer: (params) => {
                        return Qs.stringify(params, { arrayFormat: `repeat` })
                    }
                })
                return {
                    records: response.records,
                    nhits: response.nhits,
                    territories: response.facet_groups[1].facets
                }
            } catch (error) {}
        },
        data() {
            return {
                apiPaging: 0,
                records: [],
                nhits: 0,
                isTableLoading: false,
                search: ``,
                territories: {},
                selectedTerritory: ``,
                setMarker: {}
            }
        },
        mounted() {
            // Should be a plugin
            const table = document.querySelector('.ant-table-body')
            const scroll = (event) => {
                const maxScroll =
                    event.target.scrollHeight - event.target.clientHeight
                const currentScroll = event.target.scrollTop
                if (currentScroll >= maxScroll) {
                    this.fetchData()
                }
            }
            table.addEventListener('scroll', scroll, false)
        },
        methods: {
            async fetchData(nuxtContext) {
                if (this.nhits <= this.apiPaging) return
                const { $axios } = this
                this.apiPaging += 50
                const params = {
                    rows: 50,
                    start: this.apiPaging,
                    q: this.search
                }
                if (this.selectedTerritory)
                    params['refine.nom_reg'] = this.selectedTerritory
                try {
                    const response = await $axios.$get(apiRoutesHelper.list(), {
                        params
                    })
                    this.nhits = response.nhits

                    return [
                        (this.records = this.records.concat(response.records)),
                        (this.nhits = response.nhits)
                    ]
                } catch (error) {}
            },

            async searchTerm(term) {
                // Force table scroll position to top
                document.querySelector('.ant-table-body').scrollTo(0, 0)
                const { $axios } = this
                this.isTableLoading = true
                this.apiPaging = 0
                const params = {
                    rows: 50,
                    q: term.searchBoxValue
                }
                if (term.selectBoxValue)
                    params['refine.nom_reg'] = term.selectBoxValue
                try {
                    const response = await $axios.$get(apiRoutesHelper.list(), {
                        params
                    })
                    this.selectedTerritory = term.selectBoxValue
                    this.isTableLoading = false
                    this.search = term.searchBoxValue
                    this.records = response.records
                    this.nhits = response.nhits
                } catch (error) {}
            }
        }
    }
</script>

<template lang="pug">
        //- antdv provides a layout system based on flex. 
        //- It makes layout shifting when we refresh the app, that is why we use grid
        .container
            header
                a-layout-header.header
                    openasso-header
            nav
                openasso-sidebar(
                    :data="records"
                    :total-associations="nhits"
                    :territories="territories"
                    @search="searchTerm"
                    @selectedTerritory="searchTerm"
                )
            main
                openasso-search-table(:data="records" @addMarkerToMap="setMarker = $event" :loading="isTableLoading")
            aside
                openasso-search-map(:setMarker="setMarker")
</template>

<style lang="scss" scoped>
    .container {
        display: grid;
        grid-template-areas:
            'header header header'
            'nav content aside';
        grid-template-rows: 64px auto;
        grid-template-columns: 270px 60% auto; // ~~~~
        grid-gap: 0;
        height: 100vh;
    }
    header {
        grid-area: header;
    }
    nav {
        grid-area: nav;
        border: 1px solid var(--c-border-color);
    }
    aside {
        grid-area: aside;
    }
    main {
        grid-area: content;
    }
</style>
