<script>
export default {
    name: `openasso-sidebar`,
    props: {
        totalAssociations: { type: Number, required: true }
    },
    data() {
        return {
            search: ''
        }
    },
    methods: {
        formatedNhits() {
            return new Intl.NumberFormat('fr-FR').format(this.totalAssociations)
        }
    }
}
</script>

<template>
    <a-layout-sider class="sidebar" width="250" theme="light">
        <div class="sidebar-header">
            <div class="sidebar-header__title">
                Nombre total d'associations :
            </div>
            {{ formatedNhits() }}
        </div>
        <div class="sidebar-inner">
            <a-input-search
                v-model="search"
                placeholder="recherche par mot-clé"
                @change="$emit(`search`, search)"
            />
        </div>
    </a-layout-sider>
</template>

<style lang="scss" scoped>
.sidebar-header {
    padding: var(--gutter);
    background: #e6f7fe;
    color: #8e8e8e;
    font-size: 1.5rem;
    text-align: center;
}
.sidebar-header__title {
    font-size: 0.8rem;
}
.sidebar-inner {
    padding: var(--big-gutter) var(--gutter);
}
</style>
