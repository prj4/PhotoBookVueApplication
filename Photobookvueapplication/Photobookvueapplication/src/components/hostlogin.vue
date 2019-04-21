<template>
    <div id="Wrapper">
        <img src="images/photobooktitle.png" width="90%" height="90%" />
        <form>
            <input class="textbox" type="email" v-model="HostEmail"  placeholder="Email" /> <br /> <br />
            <input class="textbox" type="password" v-model="HostPassword" placeholder="Password" /> <br /> <br />
            <input class="button" type="button" v-on:click="postHostLogin" value="Click to login as host" width="100px" Height="50px" /> <br />
        </form>
        <p>{{message}}</p>
    </div>
</template>

<script>
import axios from 'axios';


    export default {
        methods: {
            postHostLogin: function () {
                return fetch(
                    "https://photobookwebapi1.azurewebsites.net/api/Account/Login",
                    {
                    body: JSON.stringify({ HostEmail, HostPassword}),
                    ca
                    
                    
                    }).then(response => response.json())

            }
        },        data () {
            return {
                HostEmail: null,
                HostPassword: null,
                message: null
                }
        },
        name: 'hostlogin',
        props: {
            msg: String
        }



  };
</script>

<style scoped>
</style>