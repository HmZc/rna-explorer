require('dotenv').config()

module.exports = {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'RNA Explorer',
                content:
                    "outil de recherche d'associations basé sur le répertoire national des associations francaises"
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [`~assets/global-styles/index.scss`, 'ant-design-vue/dist/antd.css'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: '~plugins/filters', ssr: true },
        { src: '~plugins/vue-json-csv', ssr: true },
        { src: '~plugins/vue-google-charts', ssr: true },
        { src: '@/plugins/vue2-google-maps', ssr: true }
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        [
            '@nuxtjs/axios',
            { baseURL: 'https://public.opendatasoft.com/api/records/1.0/' }
        ],
        '@nuxtjs/style-resources'
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    /*
     ** Build configuration
     */
    build: {
        transpile: ['vue2-google-maps']
    },
    env: {
        GMAP_API_KEY: process.env.GMAP_API_KEY,
        APP_VERSION: require('./package.json').version
    },
    // nuxt collects anonymous telemetry data about general usage by asking everytime the permission...
    telemetry: false
}
