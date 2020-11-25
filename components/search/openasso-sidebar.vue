<script>
    import debounce from 'lodash.debounce'
    import { Select, Badge, Input, Button } from 'ant-design-vue'

    export default {
        name: `openasso-sidebar`,
        components: {
            'a-select': Select,
            'a-select-option': Select.Option,
            'a-badge': Badge,
            'a-input': Input,
            'a-input-search': Input.Search,
            'a-button': Button
        },
        props: {
            data: { type: Array, default: () => [] },
            totalAssociations: { type: Number, default: () => 0 },
            territories: { type: Object, default: () => ({}) }
        },
        data() {
            return {
                search: '',
                enableDownload: true,
                // ANTDV - select box (placeholder): should be init with the following value: undefined
                // if you use v-model
                // Otherwise placeholder will not show up
                // https://github.com/ant-design/ant-design/issues/5768
                selectedTerritory: undefined
            }
        },
        created() {
            this.updatedSearch = debounce(this.updatedSearch, 300)
        },
        methods: {
            formatedNhits() {
                return new Intl.NumberFormat('fr-FR').format(
                    this.totalAssociations
                )
            },
            updatedSearch() {
                this.search.length
                    ? (this.enableDownload = false)
                    : (this.enableDownload = true)
                return this.$emit(`search`, {
                    searchBoxValue: this.search,
                    selectBoxValue: this.selectedTerritory,
                    type: 'input'
                })
            }
        }
    }
</script>

<template lang="pug">
    .sidebar
        .sidebar-header
            .sidebar-header__title Nombre total d'associations : {{ selectedTerritory }}
            .sidebar-header__total {{ formatedNhits() }}
        .sidebar-inner
            a-input-search(
                v-model="search"
                placeholder="recherche par mot-clé, RNA"
                @change="updatedSearch()"
            )
            a-select(
                v-model="selectedTerritory"
                placeholder="filtrer par région"
                class="sidebar-inner__select"
                allow-clear
                option-label-prop="label"
                @change="$emit('selectedTerritory', {selectBoxValue: $event, searchBoxValue: search,type: 'select'})"
            )
                a-select-option(
                    v-for="territory in territories.facet_groups[1].facets"
                    :key="territory.path"
                    :label="territory.path"
                    class="sidebar-inner__select-item"
                )
                    a-badge(
                        class="sidebar-inner__select-item-count"
                        :count="territory.count | bigNumber"
                        :number-style="{backgroundColor: '#fff',fontSize: '.7rem',color: '#999',boxShadow: '0 0 0 1px #d9d9d9 inset'}"
                    )
                    span.sidebar-inner__select-item-path {{ territory.path }}
            download-csv.sidebar-inner__download(:data="data.map((item) => item.fields)")
                a-button(block type="primary" :disabled="enableDownload" large icon="download" title="Limité aux 50 premiers échantillons") Exporter le resultat (csv)
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
    .sidebar-inner__select {
        width: 100%;
        margin: var(--gutter) 0;
    }
    .sidebar-inner__download {
        bottom: var(--big-gutter);
    }
    .sidebar-inner__select-item-count {
        float: right;
    }
    .sidebar-inner__select-item-path {
        font-size: 0.8em;
    }
</style>
