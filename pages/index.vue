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
            loading: false
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
                // load more data
                this.fetchData()
            }
        })
    },
    methods: {
        async fetchData(nuxtContext) {
            const { $axios } = this
            this.loading = true
            try {
                const response = await $axios.$get(
                    `https://public.opendatasoft.com/api/records/1.0/search/?dataset=associations&rows=100&&start=${this.apiPaging}`
                )
                this.loading = false
                this.apiPaging++
                return (this.data = this.data.concat(response.records))
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
            <openasso-sidebar />
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
.wrapper-content {
    background: white;
    padding: var(--big-gutter);
}
</style>
