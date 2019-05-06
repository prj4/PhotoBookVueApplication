<template>
    <div id="WrapperInternalPage" class="Wrapper">
        <a>Welcome {{EventHostName}} to your event:</a> <br />
        <a>{{thisEventName}}</a>

    </div>
</template>

<script>
    export default {

        methods: {
            getEventPhotos: function () {
                var picturelisturl = 'https://photobookwebapi1.azurewebsites.net/api/Picture/Ids/' + this.EventPin;
                var vuecomponent = this;

                fetch(picturelisturl, {
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
                                    vuecomponent.EventPhotoIDs = data.body;
                                })
                        }
                    });
                /*
                for (let EventPhotoID of EventPhotoIDs) {
                    var localphotourl;
                    var specificpictureurl = '/api/Picture/Preview/{EventPin}/{PictureId}' + this.EventPin + EventPhotoID; 


                    fetch(specificpictureurl, {
                        credentials: 'include',
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'Accept-Language': 'da, en-US; q=0.9, en; q=0.8, de; q=0.7, nb; q=0.6'

                        }),
                        mode: 'cors'
                    })*/

                
                /*
                .then(response => response.blob())
                    .then(images => {
                        // Then create a local URL for that image and print it 
                        outside = URL.createObjectURL(images)
                        console.log(outside)
                    })*/
            }
        },
        data() {
            return {
                EventPhotoIDs: [/*...*/],
                EventPhotos: [/*...*/],
                
                EventPin: this.$route.params.Pin,
                EventHostName: this.$route.params.HostName,
                HostEmail: this.$route.params.Email,
                thisEventName: this.$route.params.EventName
                
            }
        },
        beforeMount() {
            this.getEventPhotos();
        }
    }



</script>

<style scoped>

</style>