<template>
    <div id="Wrapper">
        
            <input class="textbox" type="email" v-model="HostEmail" placeholder="Email" /> <br /> <br />
            <input class="textbox" type="password" v-model="HostPassword" placeholder="Password" /> <br /> <br />
            <input class="button" type="button" v-on:click="postHostLogin" value="Click to login as host" width="100px" Height="50px" /> <br />
        
    </div>
</template>

<script>
    export default {


        methods: {
            
        },
        data() {
            return {
                HostEmail: null,
                HostPassword: null,
            }
        },
        name: 'HostHomePage',
        props: {
            msg: String,
            


        }



    };

</script>

<style scoped>
</style>