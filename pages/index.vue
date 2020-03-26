<script>
import OpenassoLogo from '~/components/openasso-logo.vue'

export default {
    components: { OpenassoLogo }
}
</script>
<template>
    <a-layout class="wrapper">
        <a-layout-header>
            <openasso-logo />
            <a-menu
                theme="dark"
                mode="horizontal"
                :default-selected-keys="['1']"
            >
                <a-menu-item key="1">Rechercher</a-menu-item>
                <a-menu-item key="2">Explorer</a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout-content>
            <div class="wrapper-content">
                content
            </div>
        </a-layout-content>
    </a-layout>
</template>

<style lang="scss" scoped>
.ant-layout {
    height: 100vh;
}
.ant-layout-header {
    display: flex;
    align-items: center;
}
.ant-layout-content {
    padding: var(--big-gutter);
}
.wrapper-content {
    background: white;
    padding: var(--gutter);
}
</style>
