<script>
import OpenassoLogo from '~/components/openasso-logo.vue'

export default {
    name: `openasso-header`,
    components: { OpenassoLogo },
    props: {
        path: {
            type: String,
            required: true
        }
    }
}
</script>

<template>
    <a-layout-header>
        <openasso-logo />
        <a-menu
            theme="dark"
            mode="horizontal"
            :default-selected-keys="['1']"
            :style="{ lineHeight: '64px' }"
        >
            <a-menu-item key="1">
                <nuxt-link to="/">Rechercher</nuxt-link>
            </a-menu-item>
            <a-menu-item key="2">
                <nuxt-link to="explorer">Explorer</nuxt-link>
            </a-menu-item>
        </a-menu>
    </a-layout-header>
</template>
