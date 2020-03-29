<script>
import OpenassoHeader from '~/components/openasso-header.vue'
import OpenassoSearchTable from '~/components/search/openasso-search-table.vue'

export default {
    components: { OpenassoHeader, OpenassoSearchTable },
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
                    `https://public.opendatasoft.com/api/records/1.0/search/?dataset=associations&rows=100&&start=${(this.apiPaging += 1)}`
                )
                this.loading = false
                return (this.data = this.data.concat(response.records))
            } catch (error) {}
        }
    }
}
</script>
<template>
    <a-layout class="wrapper">
        <openasso-header />
        <a-layout-content>
            <div class="wrapper-content">
                <openasso-search-table :data="data" :loading="loading" />
            </div>
        </a-layout-content>
    </a-layout>
</template>

<style lang="scss" scoped>
.ant-layout {
    height: 100vh;
}
.ant-layout-content {
    padding: var(--big-gutter);
}
.wrapper-content {
    background: white;
    padding: var(--big-gutter);
}
</style>
