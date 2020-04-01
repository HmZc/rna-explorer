<script>
export default {
    name: `openasso-sidebar`
}
</script>

<template>
    <a-layout-sider width="250" style="background: #fff">
        <a-menu mode="inline" :style="{ height: '100%' }">
            filtres
        </a-menu>
    </a-layout-sider>
</template>

<style lang="scss" scoped>
.ant-menu {
    padding: var(--big-gutter);
}
</style>
