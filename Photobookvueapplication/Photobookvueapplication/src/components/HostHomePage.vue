<template>
    <div id="WrapperInternalPage" class="wrapper">
        <a class="alignleft">Welcome {{HostName}} </a>
        <input class="smallbuttonright" type="button"  value="Add Event"/>
        <input class="smallbuttonright" type="button"  value="Delete Event"/>
        <input class="smallbuttonright" type="button" value="Logout"/>

        <br />
        
    </div>
</template>

<script>
    export default {


        methods: {
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
                HostEmail: this.$route.params.HostEmail,
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