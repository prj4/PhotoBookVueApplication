<template>
    <div id="Wrapper">
        <img src="images/photobooktitle.png" width="90%" height="90%" />
        <form>
            <input class="textbox" type="email" v-model="HostEmail"  placeholder="Email" /> <br /> <br />
            <input class="textbox" type="password" v-model="HostPassword" placeholder="Password" /> <br /> <br />
            <input class="button" type="button" v-on:click="postHostLogin" value="Click to login as host" width="100px" Height="50px" /> <br />
        </form>
    </div>
</template>

<script>

    export default {


        methods: {
            postHostLogin: function () {
                var url = 'https://photobookwebapi1.azurewebsites.net/api/Account/Login';
                
                var data = {
                    userName: this.HostEmail,
                    passWord: this.HostPassword
                };
                

                
                 fetch(url,{
                     method: 'POST',
                     headers: new Headers({
                         'Content-Type': 'application/json', 'Accept': 'application/json'
                     }),
                     mode: 'cors',
                     body: JSON.stringify(data)
                     
                     }).then(response => response.json())
                     .then(data => this.message = data)
                     

            }
        },
        data () {
            return {
                HostEmail: null,
                HostPassword: null,
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