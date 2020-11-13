<script>
    export default {
        name: `openasso-logo`
    }
</script>

<template lang="pug">
    h1.logo 
        | RNA 
        span.logo--light-weight Explorer
</template>

<style lang="scss" scoped>
    .logo {
        color: white;
        font-weight: bold;
        margin: 0;
        min-width: 220px;
        float: left;
    }
    .logo--light-weight {
        font-weight: 100;
    }
</style>
