<template>
    <div id="app">
        
        <router-link to="/"> home </router-link>
        <router-link to="/hostlogin"> hostlogin </router-link>
        <router-view></router-view>
        <!--<Home msg="Hello world!" />-->
    </div>
</template>

<script>
    import Home from './components/Home.vue';

    export default {
        name: 'app',
        components: {
            Home
        }
    };
</script>

<style>
</style>
