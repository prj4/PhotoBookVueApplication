<template>
    <div id="WrapperInternalPage" class="Wrapper">
        <a class="alignleft">Welcome {{HostName}} </a>
        <router-link to="/AddEvent">
            <input class="smallbuttonright" type="button" value="Add Event" />
        </router-link>
            <input class="smallbuttonright" type="button" value="Delete Event" />
            <input class="smallbuttonright" type="button" v-on:click="Logout" value="Logout" />

            <br />

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
                        router.push({ name: 'Home'})
                        
                    }
                    else {
                        alert("Failed to log out")
                    }

                })
            },
            getData: function () {
                var url = 'https://photobookwebapi1.azurewebsites.net/api/Account/' + this.HostEmail;

                var vuecomponent = this;

                fetch(url).then(function (response) {
                    if (response.status == '200') {
                        response.json().then(data => ({ body: data })).
                            then(function (data) {
                                vuecomponent.HostName = data.body.name;
                            })
                    }
                    else {
                        alert("Error return to start page")
                    }
                })
            }
        },
        data() {
            return {
                HostEvents: [],
                HostName: null,
                HostPassword: null,
                HostEmail: this.$cookie.get('LoggedInEmail'),
            }
        },
        beforeMount(){
            this.getData()
        },
        name: 'HostHomePage',
        props: {
        }
        
        



    };

</script>

<style scoped>
</style>