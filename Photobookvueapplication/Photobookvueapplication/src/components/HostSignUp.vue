<template>
    <div id="Wrapper">
        <img src="images/photobooktitle.png" width="90%" height="90%" />
        <form >
            <input class="textbox" type="name" v-model="HostName" placeholder="Name" required /> <br /> <br />
            <input class="textbox" type="email" v-model="HostEmail" placeholder="Email" required /> <br /> <br />
            <input class="textbox" type="password" v-model="HostPassword" placeholder="Password" required pattern="[\w]{6,}"/> <br /> <br />
            <input class="textbox" type="password" v-model="HostConfirmPassword" placeholder="Confirm Password" required pattern="[\w]{6,}"/> <br /> <br />

        </form>
        <router-link to="/hostlogin">
            <button class="button" type="button" v-on:click="postHostSignUp" width="100px" Height="50px"> Sign up as Host</button>
        </router-link>

    </div>
</template>

<script>
    export default {

        methods: {
            postHostSignUp: function () {
                var url = 'https://photobookwebapi1.azurewebsites.net/api/Account/Host'

                var data = {
                    Name: this.HostName,
                    Email: this.HostEmail,
                    Password: this.HostPassword,
                };

                
                fetch(url, {
                    method: 'POST',
                    credential: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/json', 'Accept': 'application/json'
                    }),
                    mode: 'cors',
                    body: JSON.stringify(data)

                }).then(response => response.json())
                    .then(data => this.message = data)
                    .then(function (data){

                    })
                
            }
        },
        data() {
            return {
                Errors: [],
                HostName: null,
                HostEmail: null,
                HostPassword: null,
                HostConfirmPassword: null

            }
        }
    }


</script>

<style scoped>
</style>