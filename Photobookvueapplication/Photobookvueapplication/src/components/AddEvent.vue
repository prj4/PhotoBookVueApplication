<template>
    <div id="Wrapper" class="Wrapper">
        <form >
            <h1>Add Event</h1> 
            <input class="textbox" type="text" v-model="EventName" placeholder="Event Name" name="name"/> <br /> <br />
            <input class="textbox" type="text" v-model="EventLocation" placeholder="Location" name="location"/> <br /> <br />
            <input class="bigtextbox" type="text" v-model="EventDescription" placeholder="Description" name="description"/> <br /> <br />
            <input class="textbox" type="datetime-local" v-model="StartDate" placeholder="Start Date" name="startDate"/> <br /> <br />
            <input class="textbox" type="datetime-local" v-model="EndDate" placeholder="End Date" name="endDate"/> <br /> <br />
            <input class="button" type="button" v-on:click="postAddEvent" value="Click to create event" width="100px" Height="50px" /> <br />
        </form>

        
    </div>
</template>

<script>
    export default {

    //v-on:click="postAddEvent"
        //method="post" action="https://photobookwebapi1.azurewebsites.net/api/Event"
        methods: {
            postAddEvent: function () {
                var newurl = 'https://photobookwebapi1.azurewebsites.net/api/Event';
                

                var dataToBeSend = {
                    location: this.EventLocation,
                    description: this.EventDescription,
                    name: this.EventName,
                    startDate: this.StartDate,
                    endDate: this.EndDate
                };

                //var datarecieved = this.datarecievedp;
                var router = this.$router;

                fetch(newurl, {
                    method: 'POST',
                    credentials: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/json', 'Accept': 'application/json'
                    }),
                    mode: 'cors',
                    body: JSON.stringify(dataToBeSend)

                }).then(function (response) {
                    if (response.status == '200') {
                        router.push({ name: 'HostHomePage', params: { HostEmail: dataToBeSend.userName } })
                    }
                    else if (response.status == '204') {
                        alert("Unable to create event, try again later")
                    }
                    else {
                        alert("Email or password was wrong" + response.status)
                    }

                })


            }
        },
        data() {
            return {
                EventName: null,
                EventLocation: null,
                EventDescription: null,
                StartDate: null,
                EndDate: null

            }
        },
        name: 'AddEvent',
        props: {

        }



    };
</script>

<style scoped>
</style>