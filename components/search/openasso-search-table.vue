<script>
    export default {
        name: `openasso-search-table`,
        props: {
            data: { type: Array, required: true },
            totalAssociations: { type: Number, required: true },
            loading: { type: Boolean, required: true }
        },
        data() {
            return {
                tagRegex: /(?![^(]*\)),/g,
                columns: [
                    {
                        key: 'fields.recordid',
                        ellipsis: true,
                        width: 50,
                        scopedSlots: { customRender: 'id' },
                        align: 'center'
                    },
                    {
                        title: 'nom',
                        dataIndex: 'fields',
                        key: 'fields',
                        ellipsis: true,
                        width: 400,
                        scopedSlots: { customRender: 'nom' }
                    },
                    {
                        title: 'tags',
                        dataIndex: 'fields.theme_libelle',
                        scopedSlots: { customRender: 'tags' },
                        ellipsis: true,
                        width: 500
                    },
                    {
                        title: 'département',
                        dataIndex: 'fields.dept',
                        width: 120
                    },
                    {
                        title: 'commune',
                        dataIndex: 'fields.commune',
                        ellipsis: true,
                        width: 160
                    },
                    {
                        title: 'actions',
                        fixed: 'right',
                        width: 62,
                        scopedSlots: { customRender: 'actions' }
                    }
                ]
            }
        },
        methods: {
            addMarkerToMap(selectedRow) {
                this.$emit('addMarkerToMap', selectedRow)
            },
            customRow(selectedRow) {
                return {
                    on: {
                        click: (event) => {
                            if (selectedRow.geometry)
                                return this.addMarkerToMap(selectedRow)
                            return this.$notification.error({
                                message:
                                    "Impossible d'afficher sur la carte: Adresse introuvable",
                                placement: 'bottomRight'
                            })
                        }
                    }
                }
            }
        }
    }
</script>

<template lang="pug">
    //- antd does not provide a way to make striped rows in table
    //- it should be done as below if you use expandable row 
    a-table(
            :row-class-name="(record, index) =>index % 2 === 0 ? 'ant-table-tbody--row-grey' : ''"
            :scroll="{ y: 'calc(100vh - var(--header-height) - 40px)', x: 900 }"
            table-layout="fixed"
            :columns="columns"
            :data-source="data"
            size="small"
            :pagination="false"
            :loading="loading"
            :row-key="(record, i) => `item-${i}`"
            :expand-row-by-click="true"
            :customRow="customRow"
    )
        template(slot="id" slot-scope="id, record, index") {{index}}
        a-tooltip(slot="nom" slot-scope="nom" placement="right")
            template(slot="title") {{nom.objet | truncate(500) || `Description introuvable`}}
            span(v-html="nom.titre ? nom.titre: nom.nouveau_titre ? nom.nouveau_titre : nom.ancien_titre ? nom.ancien_titre:`<a onclick='event.stopPropagation()' rel='noreferrer' href='https://www.google.fr/search?q=RNA ${nom.idassoc}' target='_blank' title='recherche externe avec RNA &#8599;'>NOM INTROUVABLE POUR RNA ${nom.idassoc} &#8599;</a>` ")
        template(slot="tags" slot-scope="tags")
            a-tag(v-for="tag in tags ? tags.split(tagRegex) : tags" :key="tag" color="blue") {{tag}}
        template(slot="actions" slot-scope="actions")
            a(
                :disabled="actions.fields.internet_http === '' && actions.fields.internet_smtp === ''" 
                :href="actions.fields.internet_http || actions.fields.internet_smtp" 
                target="_blank"
                rel='noreferrer'
                @click.stop
            ) 
                a-icon(type="global" title="Aller vers le site internet")
            a-divider(type="vertical")
            a(:disabled="!actions.geometry" @click.stop="addMarkerToMap(actions)") 
                a-icon(type="pushpin")
</template>
