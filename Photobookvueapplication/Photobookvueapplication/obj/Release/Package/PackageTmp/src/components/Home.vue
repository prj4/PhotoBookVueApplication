<template>
    <div class="home">
        <div id="Wrapper">
            <img src="../../public/images/photobooktitle.png" width="90%" height="90%" />
            <form>
                <input class="textbox" type="text" placeholder="Your Name" v-model="GuestName"/> <br /> <br />
                <input class="textbox" type="text" placeholder="Event Pin" v-model="EventPin"/> <br /> <br />
                <input class="button" type="submit" value="Click to login to event" v-on:click="GuestLogin"/> <br /> <br /> <br />
            </form>

            <router-link to="/hostlogin"> 
            <button class="button" type="button" width="100px" Height="50px"> Login as Host</button> 
            </router-link>
             <br />

        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        methods: {
            GuestLogin: function () {

                /*
                var url = 'https://photobookwebapi1.azurewebsites.net/api/Account/Guest';

                
                var router = this.$router;
                //var cookie = this.$cookie;

                var dataToBeSend = {
                    Name: this.GuestName,
                    Pin: this.EventPin
                };
                */
                /*
                fetch(url, {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json', 'Accept': 'application/json'
                    }),
                    mode: 'cors',
                    body: json.

                }).then(function (response) {
                    if (response.status == '200' || response.status == '201' || response.status == '204') {
                        router.push({ name: 'GuestEventPage', params: { GuestName: dataToBeSend.Name, EventPin: dataToBeSend.Pin } })

                    }
                    else {
                        alert("Failed to log out")
                    }

                })*/
            }
        },
        data() {
            return {
                GuestName: null,
                EventPin: null
            }
        },
        props: {
            msg: String
        }
        
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
