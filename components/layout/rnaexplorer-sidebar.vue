<script>
    import debounce from 'lodash.debounce'
    import { Select, Badge, Input, Button } from 'ant-design-vue'

    const APP_VERSION = process.env.APP_VERSION

    export default {
        name: `rnaexplorer-sidebar`,
        APP_VERSION,
        components: {
            'a-select': Select,
            'a-select-option': Select.Option,
            'a-badge': Badge,
            'a-input': Input,
            'a-input-search': Input.Search,
            'a-button': Button
        },
        props: {
            associations: { type: Array, default: () => [] },
            totalAssociations: { type: Number, default: () => 0 },
            territories: { type: Array, default: () => ({}) }
        },
        data() {
            return {
                search: ``,
                isDownloadable: false,
                // ANTDV - select box (placeholder): should be init with the following value: undefined
                // if you use v-model
                // Otherwise placeholder will not show up
                // https://github.com/ant-design/ant-design/issues/5768
                selectedTerritory: undefined
            }
        },
        computed: {
            AppVersion() {
                return APP_VERSION
            }
        },
        created() {
            this.updatedSearch = debounce(this.updatedSearch, 300)
        },
        methods: {
            formatedNhits() {
                return new Intl.NumberFormat(`fr-FR`).format(
                    this.totalAssociations
                )
            },
            updatedSearch() {
                this.search.length
                    ? (this.isDownloadable = true)
                    : (this.isDownloadable = false)
                return this.$emit(`search`, {
                    searchBoxValue: this.search,
                    selectBoxValue: this.selectedTerritory
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
        .sidebar-body
            a-input-search(
                v-model="search"
                placeholder="recherche par mot-clé, n°RNA"
                @change="updatedSearch()"
                allow-clear
            )
            a-select(
                v-model="selectedTerritory"
                placeholder="filtrer par région"
                class="sidebar-body__select"
                allow-clear
                option-label-prop="label"
                @change="updatedSearch()"
            )
                a-select-option(
                    v-for="territory in territories"
                    :key="territory.path"
                    :label="territory.path"
                    class="sidebar-body__select-item"
                )
                    a-badge(
                        class="sidebar-body__select-item-count"
                        :count="territory.count | bigNumber"
                        :number-style="{backgroundColor: '#fff',fontSize: '.7rem',color: '#999',boxShadow: '0 0 0 1px #d9d9d9 inset'}"
                    )
                    span.sidebar-body__select-item-path {{ territory.path }}
            download-csv.sidebar-body__download(:data="associations.map((item) => item.fields)")
                a-button(block type="primary" :disabled="!isDownloadable" large icon="download" title="Limité aux 50 premiers échantillons") Exporter le resultat (csv)
        .sidebar-footer
            p(class="sidebar-footer__text") Application web basée sur le répertoire national des associations (registre officiel recensant l’ensemble des informations sur les associations nationales, loi 1901). RNA Explorer met à disposition une interface web permettant d'explorer le RNA sous différentes formes.
            span Version : {{AppVersion}}
            .sidebar-footer__github
                client-only
                    github-button(href="https://github.com/HmZc/rna-explorer" data-icon="octicon-star" data-size="small" aria-label="Star HmZc/rna-explorer on GitHub") Star        

</template>

<style lang="scss" scoped>
    .sidebar {
        position: relative;
        height: 100%;
    }
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
    .sidebar-body {
        padding: var(--big-gutter) var(--gutter);
    }
    .sidebar-body__select {
        width: 100%;
        margin: var(--gutter) 0;
    }
    .sidebar-body__download {
        bottom: var(--big-gutter);
    }
    .sidebar-body__select-item-count {
        float: right;
    }
    .sidebar-body__select-item-path {
        font-size: 0.8em;
    }
    .sidebar-footer {
        position: absolute;
        bottom: 10px;
        text-align: center;
        color: var(--c-text-lighter);
        width: 100%;
    }
    .sidebar-footer__text {
        padding: var(--big-gutter);
        font-size: 0.8rem;
        color: var(--c-text-lighter);
    }
</style>
