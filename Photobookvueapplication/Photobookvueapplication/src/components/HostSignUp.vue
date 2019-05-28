<template>
    <div id="Wrapper">
        <img src="images/photobooktitle.png" width="90%" height="90%" />
        <form>
            <input name="Name" class="textbox" type="text" v-model="HostName" placeholder="Name" /> <br /> <br />
            <input name="Email" class="textbox" type="email" v-model="HostEmail" placeholder="Email" /> <br /> <br />
            <input name="Password" class="textbox" type="password" v-model="HostPassword" placeholder="Password" /> <br /> <br />
            <input name="ConfirmPassword" class="textbox" type="password" v-model="HostConfirmPassword" placeholder="Confirm Password" /> <br /> <br />
            <input class="button" v-on:click="postHostSignUp" type="button" value="Click to sign up as an host" width="100px" Height="50px" /><br />
        </form>


    </div>
</template>

<script>
    export default {

        methods: {

            postHostSignUp: function () {
                var url = 'https://photobookwebapi1.azurewebsites.net/api/Account/Host'
                var data = {
                    email: this.HostEmail,
                    password: this.HostPassword,
                    name: this.HostName
                }
                    
                if (this.HostName === null) {
                    alert("Please enter a valid name");
                    return;
                }

                if (this.HostEmail === null) {
                    alert("Please enter a valid email (1)");
                    return;
                }
               
                if (this.HostPassword === null) {
                    alert("Please enter valid password");
                    return;
                }

                if (this.HostConfirmPassword !== this.HostPassword) {
                    alert("The confirmed password does not match selected password");
                    return;
                }
                
                var vuecomponent = this;
                var cookie = this.$cookie;

                fetch(url, {
                    method: 'POST',
                    credential: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }),
                    mode: 'cors',
                    body: JSON.stringify(data)
                })
                    .then(function (response) {
                      if (response.status == '200') {
                          if ((cookie.get('LoggedInGuest') == 'True') || (cookie.get('LoggedInHost') == 'True')) {
                          vuecomponent.logout();
                          }
                          vuecomponent.HostLogin();
                          
                        } else {
                            alert("Error: Host could not be signed up");
                        }

                    })
            },
            logout: function () {
                var url = 'https://photobookwebapi1.azurewebsites.net/api/Account/Logout';
                
                var cookie = this.$cookie;

                fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/json', 'Accept': 'application/json'
                    }),
                    mode: 'cors'
                }).then(function (response) {
                    if (response.status == '200' || response.status == '204') {
                        cookie.delete('LoggedInHost')
                        cookie.delete('LoggedInGuest')
                        cookie.delete('currenteventpin')
                        cookie.delete('currenteventname')
                        cookie.delete('currentguest')

                    }
                    else {
                        alert("Failed to log out")
                    }
                })
            },
            HostLogin: function () {
                this.logout();
                var url = 'https://photobookwebapi1.azurewebsites.net/api/Account/Login';

                var dataToBeSend = {
                    userName: this.HostEmail,
                    passWord: this.HostPassword
                };
                
                var router = this.$router;
                var cookie = this.$cookie;
                var vuecomponent = this;

               
                    fetch(url, {
                        method: 'POST',
                        credentials: 'include',
                        headers: new Headers({
                            'Content-Type': 'application/json', 'Accept': 'application/json'
                        }),
                        mode: 'cors',
                        body: JSON.stringify(dataToBeSend)

                    }).then(function (response) {
                        if (response.status == '200' || response.status == '204') {
                            cookie.set('LoggedInHost', 'True')
                            cookie.set('LoggedInEmail', vuecomponent.HostEmail)
                            router.push({ name: 'HostHomePage' })
                        }
                        else {
                            alert("Email or password was wrong")
                        }

                    })
                

            },

        },
        data: function () {
            return {
                HostName: null,
                HostEmail: null,
                HostPassword: null,
                HostConfirmPassword: null

            }
        },

    }

</script>

<style scoped>
</style>