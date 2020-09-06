<script>
    import Qs from 'qs'
    import * as apiRoutesHelper from '~/helpers/api-routes'
    import OpenassoHeader from '~/components/openasso-header.vue'
    import OpenassoSidebar from '~/components/search/openasso-sidebar.vue'
    import OpenassoChartBar from '~/components/charts/openasso-chart-bar.vue'

    export default {
        components: {
            OpenassoHeader,
            OpenassoSidebar,
            OpenassoChartBar
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
                    data: response
                }
            } catch (error) {}
        },
        data() {
            return {
                data: [],
                test: [],
                height: 0
            }
        },
        mounted() {
            this.matchHeight()
        },
        methods: {
            matchHeight() {
                this.height = this.$refs.main.clientHeight
            },
            selectedMesh(selectedMesh) {
                this.test = selectedMesh
                this.updateData(selectedMesh)
            },
            updateData(selectedMesh) {
                return (this.test = this.data.facet_groups.find(
                    (mesh) => mesh.name === selectedMesh
                ).facets)
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
                OpenassoSidebar(@selectedMesh="selectedMesh")
            main(ref="main")
                OpenassoChartBar(:data="test" :height="height")
  
</template>

<style lang="scss" scoped>
    .container {
        display: grid;
        grid-template-areas:
            'header header header'
            'nav content content';
        grid-template-rows: 64px auto;
        grid-template-columns: 270px 1000px auto; // ~~~~
        grid-gap: 0;
        height: 100vh;
    }
    header {
        grid-area: header;
    }
    nav {
        grid-area: nav;
        border: 1px solid #e8e8e8;
    }
    main {
        grid-area: content;
        background: #e6f7fe;
    }
</style>
