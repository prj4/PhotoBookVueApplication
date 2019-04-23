<template>
    
    <div id="app">
        <header class="topnav">
            <nav>
                <router-link tag="img" src="images/titleonlyp.png" class="alignleft" to="/"></router-link>
                
                <a class="alignleft" href="hostsignuppage.html"> Signup as Event Host</a>
                <a class="alignright"> Privacy</a>
                <a class="alignright"> About Photobook</a>
            </nav>


        </header>

        <br /> <br />

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
