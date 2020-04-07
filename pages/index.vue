<script>
import OpenassoHeader from '~/components/openasso-header.vue'
import OpenassoSearchTable from '~/components/search/openasso-search-table.vue'
import OpenassoSidebar from '~/components/search/openasso-sidebar.vue'
import * as apiRoutesHelper from '~/helpers/api-routes'

export default {
    components: { OpenassoHeader, OpenassoSearchTable, OpenassoSidebar },
    async asyncData(nuxtContext) {
        const { $axios } = nuxtContext
        try {
            const response = await $axios.$get(apiRoutesHelper.list(), {
                params: { rows: `100` }
            })
            return { data: response.records, nhits: response.nhits }
        } catch (error) {}
    },
    data() {
        return {
            apiPaging: 0,
            data: [],
            nhits: 0,
            loading: false,
            wordSearched: ``
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
            if (this.wordSearched) return
            const { $axios } = this
            this.loading = true
            try {
                const response = await $axios.$get(apiRoutesHelper.list(), {
                    params: {
                        rows: `100`,
                        start: this.apiPaging,
                        q: this.wordSearched
                    }
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

        async search(data) {
            const { $axios } = this
            this.loading = true
            try {
                const response = await $axios.$get(apiRoutesHelper.list(), {
                    params: {
                        rows: `100`,
                        q: data
                    }
                })
                this.loading = false
                this.wordSearched = data
                this.data = response.records
                this.nhits = response.nhits
            } catch (error) {}
        }
    }
}
</script>
<template>
    <a-layout>
        <a-layout-header class="header">
            <openasso-header />
        </a-layout-header>
        <a-layout>
            <openasso-sidebar :total-associations="nhits" @search="search" />
            <a-layout style="padding: 0 24px 24px">
                <a-layout-content
                    :style="{
                        background: '#fff',
                        padding: '0',
                        margin: 0,
                        minHeight: '280px'
                    }"
                >
                    <openasso-search-table :data="data" :loading="loading" />
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<style lang="scss" scoped>
.ant-layout-content {
    padding: var(--big-gutter);
}
</style>
