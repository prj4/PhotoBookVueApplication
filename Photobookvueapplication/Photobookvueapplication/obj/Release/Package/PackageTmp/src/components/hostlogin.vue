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
            autoLogin: function () {
                if (this.$cookie.get('LoggedIn') == 'True') {
                    var Email = this.$cookie.get('LoggedInEmail'); 
                    this.$router.push({ name: 'HostHomePage', params: { HostEmail: Email } })
                }
            },
            postHostLogin: function () {
                var url = 'https://photobookwebapi1.azurewebsites.net/api/Account/Login';

                var dataToBeSend = {
                    userName: this.HostEmail,
                    passWord: this.HostPassword
                    
                };

                //var datarecieved = this.datarecievedp;
                var router = this.$router;
                var cookie = this.$cookie;
                var vuecomponent = this;

                if (cookie.get('LoggedIn') == 'True') {
                    router.push({ name: 'HostHomePage', params: { HostEmail: dataToBeSend.userName } })
                }
                else {
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
                            cookie.set('LoggedIn', 'True', { expires: '4h' })
                            cookie.set('LoggedInEmail', vuecomponent.HostEmail, { expires: '4h' })
                            router.push({ name: 'HostHomePage', params: { HostEmail: dataToBeSend.userName } })
                        }
                        else {
                            alert("Email or password was wrong")
                        }

                    })
                }
                 
            }
        },
        data () {
            return {
                HostEmail: null,
                HostPassword: null,
                HostId: null,
                HostName: null
                
                }
        },
        beforeMount() {
            this.autoLogin()
        },
        name: 'hostlogin',
        props: {
            
        }



  };
</script>

<style scoped>
</style>