<script>
import Qs from 'qs'
import * as apiRoutesHelper from '~/helpers/api-routes'

import OpenassoHeader from '~/components/openasso-header.vue'
import OpenassoSearchTable from '~/components/search/openasso-search-table.vue'
import OpenassoSidebar from '~/components/search/openasso-sidebar.vue'

export default {
    components: { OpenassoHeader, OpenassoSearchTable, OpenassoSidebar },
    async asyncData(nuxtContext) {
        const { $axios } = nuxtContext
        try {
            const response = await $axios.$get(apiRoutesHelper.list(), {
                params: { facet: [`nom_reg`, `commune`, `nom_dep`], rows: 100 },
                paramsSerializer: (params) => {
                    return Qs.stringify(params, { arrayFormat: `repeat` })
                }
            })
            return {
                data: response.records,
                nhits: response.nhits,
                territories: response
            }
        } catch (error) {}
    },
    data() {
        return {
            apiPaging: 1,
            data: [],
            nhits: 0,
            loading: false,
            search: ``,
            territories: {},
            selectedTerritory: ``
        }
    },
    mounted() {
        // try accessing by using refs
        const tableContent = document.querySelector('.ant-table-body')
        tableContent.addEventListener('scroll', (event) => {
            const maxScroll =
                event.target.scrollHeight - event.target.clientHeight
            const currentScroll = event.target.scrollTop
            if (currentScroll === maxScroll) {
                this.fetchData()
            }
        })
    },
    methods: {
        async fetchData(nuxtContext) {
            if (this.nhits <= 100) return
            const { $axios } = this
            this.loading = true
            const params = {
                rows: `100`,
                start: this.apiPaging,
                q: this.search
            }
            if (this.selectedTerritory)
                params['refine.nom_reg'] = this.selectedTerritory
            try {
                const response = await $axios.$get(apiRoutesHelper.list(), {
                    params
                })
                this.loading = false
                this.apiPaging++
                this.nhits = response.nhits

                return [
                    (this.data = this.data.concat(response.records)),
                    (this.nhits = response.nhits)
                ]
            } catch (error) {}
        },

        async searchTerm(term) {
            const { $axios } = this
            this.loading = true
            this.apiPaging = 1
            const params = {
                rows: `100`,
                q: term.searchBoxValue
            }
            if (term.selectBoxValue)
                params['refine.nom_reg'] = term.selectBoxValue
            try {
                const response = await $axios.$get(apiRoutesHelper.list(), {
                    params
                })
                this.selectedTerritory = term.selectBoxValue
                this.loading = false
                this.search = term.searchBoxValue
                this.data = response.records
                this.nhits = response.nhits
            } catch (error) {}
        }
    }
}
</script>
<template>
    <!-- 
        antdv provides a layout system based on flex. 
        It makes layout shifting when we refresh the app, that is why we use grid
    -->
    <div class="container">
        <header>
            <a-layout-header class="header">
                <openasso-header />
            </a-layout-header>
        </header>
        <nav>
            <openasso-sidebar
                :data="data"
                :total-associations="nhits"
                :territories="territories"
                @search="searchTerm"
                @selectedTerritory="searchTerm"
            />
        </nav>
        <main>
            <openasso-search-table :data="data" :loading="loading" />
        </main>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: grid;
    grid-template-areas:
        'header header header'
        'nav content content';
    grid-template-rows: 64px auto;
    grid-template-columns: 270px auto auto;
    grid-gap: 0;
    height: 100vh;
}
header {
    grid-area: header;
}

nav {
    grid-area: nav;
}

main {
    grid-area: content;
}
</style>
