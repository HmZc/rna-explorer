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
                    width: 400,
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
                    ellipsis: true,
                    width: 500
                },
                {
                    title: 'deptartements',
                    dataIndex: 'fields.dept',
                    key: 'fields.dept',
                    width: 120
                },
                {
                    title: 'commune',
                    dataIndex: 'fields.commune',
                    key: 'fields.commune',
                    ellipsis: true
                },
                {
                    title: 'actions',
                    dataIndex: 'fields',
                    key: 'fields.idassoc',
                    scopedSlots: { customRender: 'actions' }
                }
            ]
        }
    }
}
</script>

<template>
    <div>
        <a-table
            :row-class-name="
                (record, index) =>
                    // antd does not provide a way to make striped rows in table
                    // it should be done like that if expandable row is used
                    index % 2 === 0 ? 'ant-table-tbody--row-grey' : ''
            "
            :scroll="{ y: 'calc(100vh - 128px)' }"
            table-layout="fixed"
            :columns="columns"
            :data-source="data"
            size="small"
            :pagination="false"
            :loading="loading"
            :row-key="(record, i) => `item-${i}`"
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
            <span slot="actions" slot-scope="actions">
                <a
                    :disabled="
                        actions.internet_http === '' &&
                            actions.internet_smtp === ''
                    "
                    :href="actions.internet_http || actions.internet_smtp"
                    target="_blank"
                    >site internet</a
                >
                <a-divider type="vertical" />
                <a
                    :href="`https://www.google.fr/search?q=${actions.idassoc}`"
                    target="_blank"
                    title="recherche Google"
                    >recherche par RNA
                </a>
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
