<script>
    import OpenassoLogo from '~/components/openasso-logo.vue'

    export default {
        name: `openasso-header`,
        components: { OpenassoLogo }
    }
</script>

<template lang="pug">
    a-layout-header 
        openasso-logo
        a-menu(
            theme="dark"
            mode="horizontal"
            :default-selected-keys="[$route.path]" 
            :style="{ lineHeight: '64px' }"
        )
            a-menu-item(key="/")
                nuxt-link(to="/") Rechercher
            a-menu-item(key="explorer" disabled)                                                                                           
                nuxt-link(to="/explorer") Explorer
</template>

<style lang="scss" scoped>
    .ant-layout-header {
        padding: 0;
    }
</style>
