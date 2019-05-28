<template>
    <div id="app">
        <header class="topnav">

            <router-link tag="img" src="images/titleonlyp.png" class="alignleft" to="/"></router-link>
            <router-link class="alignleft" to="/HostSignUp"> Signup as Event Host</router-link>

            <router-link class="alignright" to="/Privacy">Privacy</router-link>
            <router-link class="alignright" to="/AboutPhotobook">About Photobook</router-link>



        </header>
        
        <router-view></router-view>
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
