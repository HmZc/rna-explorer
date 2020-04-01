<script>
import OpenassoLogo from '~/components/openasso-logo.vue'

export default {
    name: `openasso-header`,
    components: { OpenassoLogo }
}
</script>

<template>
    <a-layout-header>
        <openasso-logo />
        <a-menu
            theme="dark"
            mode="horizontal"
            :default-selected-keys="[$route.path]"
            :style="{ lineHeight: '64px' }"
        >
            <a-menu-item key="/">
                <nuxt-link to="/">Rechercher</nuxt-link>
            </a-menu-item>
            <a-menu-item key="/explorer">
                <nuxt-link to="explorer">Explorer</nuxt-link>
            </a-menu-item>
        </a-menu>
    </a-layout-header>
</template>

<style lang="scss" scoped>
.ant-layout-header {
    padding: 0;
}
</style>
