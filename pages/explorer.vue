<script>
import OpenassoHeader from '~/components/openasso-header.vue'

export default {
    components: { OpenassoHeader }
}
</script>
<template>
    <a-layout class="wrapper">
        <openasso-header />
        <a-layout-content>
            <div class="wrapper-content">
                charts
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
    padding: var(--big-gutter);
}
.scroller {
    height: 300px;
}
</style>
