<script>
    import { Layout, Menu, Button } from 'ant-design-vue'
    import RnaexplorerLogo from '~/components/ui/rnaexplorer-logo.vue'

    export default {
        name: `rnaexplorer-header`,
        components: {
            RnaexplorerLogo,
            'a-layout-header': Layout.Header,
            'a-menu': Menu,
            'a-menu-item': Menu.Item,
            'a-button': Button
        }
    }
</script>

<template lang="pug">
    a-layout-header 
        rnaexplorer-logo
        a-menu(
            theme="dark"
            mode="horizontal"
            :default-selected-keys="[$route.path]" 
            :style="{ lineHeight: '64px' }"
        )
            a-menu-item(key="/")
                nuxt-link(to="/") Rechercher
            a-menu-item(key="/explorer")                                                                                           
                nuxt-link(to="/explorer") Explorer
        a-button(class="export-data-btn" type="danger" ghost icon="download" href="https://public.opendatasoft.com/explore/dataset/associations/download/?format=csv&timezone=Europe/Berlin&lang=fr&use_labels_for_header=true&csv_separator=%3B") Exporter l'intégralité du jeu de données (csv)
</template>

<style lang="scss" scoped>
    .ant-layout-header {
        display: flex;
        align-items: center;
        padding: 0;
    }
    .export-data-btn {
        margin: auto 0 auto auto;
    }
</style>
