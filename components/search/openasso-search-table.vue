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
                columns: [
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
                        key: 'fields.theme_libelle',
                        scopedSlots: { customRender: 'tags' },
                        ellipsis: true,
                        width: 500
                    },
                    {
                        title: 'département',
                        dataIndex: 'fields.dept',
                        key: 'fields.dept',
                        width: 120
                    },
                    {
                        title: 'commune',
                        dataIndex: 'fields.commune',
                        key: 'fields.commune',
                        ellipsis: true,
                        width: 160
                    },
                    {
                        title: 'actions',

                        fixed: 'right',
                        width: 115,
                        scopedSlots: { customRender: 'actions' }
                    }
                ]
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
    )
        span(slot="nom" slot-scope="nom")   
            span(v-html="nom.titre ? nom.titre: nom.nouveau_titre ? nom.nouveau_titre : nom.ancien_titre ? nom.ancien_titre:`<a href='https://www.google.fr/search?q=RNA ${nom.idassoc}' target='_blank' title='recherche externe avec RNA &#8599;'>NOM INTROUVABLE</a>` ")

        span(slot="tags" slot-scope="tags")
            a-tag(v-for="tag in tags ? tags.split(',') : tags" :key="tag" color="blue") {{tag}}
        span(slot="actions" slot-scope="actions")
            a(
                :disabled="actions.fields.internet_http === '' && actions.fields.internet_smtp === ''" 
                :href="actions.fields.internet_http || actions.fields.internet_smtp" 
                target="_blank"
            ) site internet
            a-divider( type="vertical" )
            a-icon(@click="$emit('addMarkerToMap', actions)" type="pushpin" theme="twoTone" style="fontSize:1.2em" title="afficher sur la carte")
        p(slot="expandedRowRender" slot-scope="record" style="margin: 0") {{ record.fields.objet ? record.fields.objet : 'Description non renseignée'}}
</template>
