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
                if (this.$cookie.get('LoggedInHost') == 'True') {
                    var Email = this.$cookie.get('LoggedInEmail'); 
                    this.$router.push({ name: 'HostHomePage', params: { HostEmail: Email } })
                }
            },
            postHostLogin: async function () {
                await this.logout();
                var url = 'https://photobookwebapi1.azurewebsites.net/api/Account/Login';

                var dataToBeSend = {
                    userName: this.HostEmail,
                    passWord: this.HostPassword
                    
                };

                //var datarecieved = this.datarecievedp;
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
                            router.push({ name: 'HostHomePage', params: { HostEmail: dataToBeSend.userName } })
                        }
                        else {
                            alert("Email or password was wrong")
                        }

                    })
                
                 
            },
            logout: function () {
                return new Promise((resolve,reject) => {

                    var url = 'https://photobookwebapi1.azurewebsites.net/api/Account/Logout';

                    //var datarecieved = this.datarecievedp;
                    var router = this.$router;
                    var cookie = this.$cookie;

                     fetch(url, {
                        method: 'POST',
                        credentials: 'include',
                        headers: new Headers({
                            'Content-Type': 'application/json', 'Accept': 'application/json'
                        }),
                        mode: 'cors'
                    }).then(function (response) {
                        resolve()
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
                })
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