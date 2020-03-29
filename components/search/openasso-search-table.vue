<script>
export default {
    name: `openasso-search-table`,
    props: {
        data: { type: Array, required: true },
        loading: { type: Boolean, required: true }
    },
    data() {
        return {
            columns: [
                {
                    title: 'nom',
                    dataIndex: 'fields.titre',
                    key: 'fields.titre',
                    width: 400
                },
                {
                    title: 'tags',
                    dataIndex: 'fields.theme_libelle',
                    key: 'fields.theme_libelle',
                    scopedSlots: { customRender: 'tags' },
                    width: 450
                },
                {
                    title: 'deptartements',
                    dataIndex: 'fields.dept',
                    key: 'fields.dept',
                    defaultSortOrder: 'null',
                    sorter: (a, b) => a.fields.dept - b.fields.dept,
                    width: 150
                },
                {
                    title: 'commune',
                    dataIndex: 'fields.commune',
                    key: 'fields.commune',
                    width: 250
                },
                {
                    title: 'site internet',
                    dataIndex: 'fields.internet_http',
                    key: 'fields.internet_http',
                    scopedSlots: { customRender: 'website' }
                }
            ]
        }
    }
}
</script>

<template>
    <a-table
        :scroll="{ y: 500 }"
        :columns="columns"
        :data-source="data"
        size="small"
        :pagination="false"
        :loading="loading"
    >
        <span slot="tags" slot-scope="tags">
            <a-tag
                v-for="tag in tags ? tags.split(',') : tags"
                :key="tag"
                color="blue"
            >
                {{ tag }}
            </a-tag>
        </span>
        <span slot="website" slot-scope="website">
            {{ website ? website : 'non renseigné' }}
        </span>
        <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
            {{
                record.fields.objet
                    ? record.fields.objet
                    : 'Description non renseignée'
            }}
        </p>
    </a-table>
</template>
