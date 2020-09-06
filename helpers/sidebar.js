export const MESH_COM_KEY = 'commune'
export const MESH_REG_KEY = 'nom_reg'
export const MESH_DEP_KEY = 'nom_dep'

export const MESH_COM_LABEL = 'communale'
export const MESH_REG_LABEL = 'régionale'
export const MESH_DEP_LABEL = 'départementale'

export const MESHES = Object.freeze([
    { key: MESH_COM_KEY, label: MESH_COM_LABEL },
    { key: MESH_REG_KEY, label: MESH_REG_LABEL },
    { key: MESH_DEP_KEY, label: MESH_DEP_LABEL }
])

export function getDefaultMesh() {
    return MESH_REG_KEY
}
