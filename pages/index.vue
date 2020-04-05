<script>
import OpenassoHeader from '~/components/openasso-header.vue'
import OpenassoSearchTable from '~/components/search/openasso-search-table.vue'
import OpenassoSidebar from '~/components/search/openasso-sidebar.vue'

export default {
    components: { OpenassoHeader, OpenassoSearchTable, OpenassoSidebar },
    data() {
        return {
            apiPaging: 0,
            data: [],
            totalAssociations: 0,
            loading: false,
            wordSearched: ``
        }
    },
    mounted() {
        this.fetchData()
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
                const response = await $axios.$get(
                    `https://public.opendatasoft.com/api/records/1.0/search/?dataset=associations&rows=100&&start=${this.apiPaging}&q=${this.wordSearched}`
                )
                this.loading = false
                this.apiPaging++
                this.totalAssociations = response.nhits
                return (this.data = this.data.concat(response.records))
            } catch (error) {}
        },

        async search(data) {
            const { $axios } = this
            this.loading = true
            try {
                const response = await $axios.$get(
                    `https://public.opendatasoft.com/api/records/1.0/search/?dataset=associations&rows=100&q=${data}`
                )
                this.loading = false
                this.wordSearched = data
                this.data = response.records
                this.totalAssociations = response.nhits
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
            <openasso-sidebar
                :totalAssociations="totalAssociations"
                @search="search"
            />
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
