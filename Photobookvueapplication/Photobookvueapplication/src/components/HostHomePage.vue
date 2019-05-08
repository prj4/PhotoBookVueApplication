<template>
    <div id="WrapperInternalPage" class="Wrapper">
        <div>
            <a class="alignleft">Welcome {{HostName}} </a>
            <router-link to="/AddEvent">
                <input class="smallbuttonright" type="button" value="Add Event" />
            </router-link>
            <input class="smallbuttonright" type="button" v-on:click="Logout" value="Logout" />
        </div>

        <br /> <br />

       
               <div class="EventTile" v-for="HostEvent in HostEvents" v-bind:key="HostEvent.pin">
                   <router-link tag="div" class="littlepadding" :to="{name: 'HostEventPage', params: {Email: HostEmail, HostName: HostName, EventName: HostEvent.name, Pin: HostEvent.pin}}">
                      
                       <table class="tg" align="left">
                           <tr>
                               <th class="tg-mcqj">EventName:</th>
                               <th class="tg-73oq">{{HostEvent.name}}</th>
                           </tr>
                           <tr>
                               <td class="tg-mcqj">Pin:</td>
                               <td class="tg-73oq">{{HostEvent.pin}}</td>
                           </tr>
                       </table>

                   </router-link>
               </div>
       


    </div>


</template>

<script>
    export default {

        methods: {
            Logout: function () {
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
                    if (response.status == '200' || response.status == '204') {
                        cookie.delete('LoggedIn')
                        cookie.delete('LoggedInEmail')
                        router.push({ name: 'Home' })

                    }
                    else {
                        alert("Failed to log out")
                    }
                 })
            },
            getData: function () {
                var accounturl = 'https://photobookwebapi1.azurewebsites.net/api/Account/' + this.HostEmail;

                var vuecomponent = this;

                fetch(accounturl).then(function (response) {
                    if (response.status == '200') {
                        response.json().then(data => ({ body: data })).
                            then(function (data) {
                                vuecomponent.HostName = data.body.name;
                            })
                    }
                    else {
                        alert("Error return to start page")
                    }
                });
            },
            getEvents: function () {
                var eventurl = 'https://photobookwebapi1.azurewebsites.net/api/Event/Host';
                var vuecomponent = this;

                fetch(eventurl, {
                    credentials: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Accept-Language': 'da, en-US; q=0.9, en; q=0.8, de; q=0.7, nb; q=0.6'

                    }),
                    mode: 'cors'
                })
                    .then(function (response) {
                        if (response.status == '200') {
                            response.json()
                                .then(data => ({ body: data }))
                                .then(function (data) {

                                    vuecomponent.HostEvents = data.body;
                                })
                        }
                    });
            }
        },
        data() {
            return {
                HostEvents: [/*...*/],
                HostID: null,
                HostName: null,
                HostPassword: null,
                HostEmail: this.$cookie.get('LoggedInEmail'),
            }
        },
        beforeMount() {
            this.getData();
            this.getEvents();
        },
        name: 'HostHomePage',
        props: {
        }

    };

</script>

<style scoped>

    .tg {
        border-collapse: collapse;
        border-spacing: 0;
        border: none;
    }

        .tg td {
            font-size: 14px;
            padding: 10px 5px;
            border-style: solid;
            border-width: 0px;
            overflow: hidden;
            word-break: normal;
        }

        .tg th {
            
            font-size: 14px;
            font-weight: normal;
            padding: 10px 5px;
            border-style: solid;
            border-width: 0px;
            overflow: hidden;
            word-break: normal;
        }

        .tg .tg-mcqj {
            font-weight: bold;
            border-color: #000000;
            text-align: left;
            vertical-align: top
        }

        .tg .tg-73oq {
            border-color: #000000;
            text-align: left;
            vertical-align: top
        }
    
</style>