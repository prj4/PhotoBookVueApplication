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

                var dataToBeSend = {
                    userName: this.HostEmail,
                    passWord: this.HostPassword
                    
                };

                //var datarecieved = this.datarecievedp;
                var router = this.$router;

                fetch(url, {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json', 'Accept': 'application/json'
                    }),
                    mode: 'cors',
                    body: JSON.stringify(dataToBeSend)

                }).then(function (response) {
                    if (response.status == '200' || response.status == '204') {
                        router.push({ name: 'HostHomePage', params: {HostEmail: dataToBeSend.userName} })
                    }
                    else {
                        alert("Email or password was wrong")
                    }
                    
                    })

                    //response.json().then(data => ({ status: response.status, body: data })). then(function (data) {


                    /*
                    .then(r => r.json().then(data => ({ status: r.status, body: data }))).
                    then(function (data) {
                        if (data.status == '200' || data.status == '204') {
                            router.push({ name: 'HostHomePage'/*, params: {Id: data.body.hostId, Name: data.body.name} })
                        }
                        else {
                            alert("Email or password was wrong")
                        }

                    });
                    */

                     /*then(function (response) {
                     const status = JSON.parse(response.status);
                    
                     alert(datarecieved.name);
                     if (status == '200') {
                         router.push({ name: 'HostHomePage' })
                     }
                     else {
                         alert("Email or password was wrong")
                     }
                 })*/

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
        name: 'hostlogin',
        props: {
            
        }



  };
</script>

<style scoped>
</style>