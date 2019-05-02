<template>
    <div id="WrapperInternalPage" class="Wrapper">
        <div>
            <a class="alignleft">Welcome {{HostName}} </a>
            <router-link to="/AddEvent">
                <input class="smallbuttonright" type="button" value="Add Event" />
            </router-link>
            <input class="smallbuttonright" type="button" value="Delete Event" />
            <input class="smallbuttonright" type="button" v-on:click="Logout" value="Logout" />
        </div>

        <br /> <br />

        <div class="EventTile" v-for="HostEvent in HostEvents" v-bind:key="HostEvent.pin">
            
            EventName: {{HostEvent.name}} <br />
            Pin: {{HostEvent.pin}}
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
</style>