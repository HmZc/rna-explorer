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
                    dataIndex: 'fields',
                    key: 'fields',
                    ellipsis: true,
                    customRender: (fields) => {
                        return fields.titre
                            ? fields.titre
                            : fields.nouveau_titre
                            ? fields.nouveau_titre
                            : fields.ancien_titre
                    }
                },
                {
                    title: 'tags',
                    dataIndex: 'fields.theme_libelle',
                    key: 'fields.theme_libelle',
                    scopedSlots: { customRender: 'tags' },
                    ellipsis: true
                },
                {
                    title: 'deptartements',
                    dataIndex: 'fields.dept',
                    key: 'fields.dept',
                    defaultSortOrder: 'null',
                    // sorter: (a, b) => a.fields.dept - b.fields.dept,
                    width: 150
                },
                {
                    title: 'commune',
                    dataIndex: 'fields.commune',
                    key: 'fields.commune',
                    ellipsis: true
                },
                {
                    title: 'site internet',
                    dataIndex: 'fields.internet_http',
                    key: 'fields.internet_http',
                    scopedSlots: { customRender: 'website' },
                    ellipsis: true
                }
            ]
        }
    }
}
</script>

<template>
    <div>
        <a-table
            :scroll="{ y: 'calc(100vh - 128px)' }"
            tableLayout="fixed"
            :columns="columns"
            :data-source="data"
            size="small"
            :pagination="false"
            :loading="loading"
        >
            <!-- :rowKey="(data) => data.fields" -->
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
                <a :href="website" target="_blank">{{ website }}</a>
            </span>
            <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
                {{
                    record.fields.objet
                        ? record.fields.objet
                        : 'Description non renseignée'
                }}
            </p>
        </a-table>
    </div>
</template>
