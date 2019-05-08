<template>
    <div id="WrapperInternalPage" class="Wrapper">
        <div>
            <a class="alignleft">{{thisEventName}} hosted by {{EventHostName}}</a>
            <button class="smallbuttonright" @click="onUpload">Upload</button>
            
            <label class="inputlabel" for="file">
                <span v-if="UploadPhotos.length > 0">{{UploadPhotos.length}} images selected</span>
                <span v-else>Select images</span>
            </label>
            <input name="file" id="file" class="inputfile" accept="image/*" type="file" @change="onFileChange" multiple><br>

        </div>

    </div>
</template>

<script>
    export default {

        methods: {
            onFileChange: function (event) {
                this.UploadPhotos.length = 0;
                for (var i = 0; i < event.target.files.length; i++) {
                    this.$set(this.UploadPhotos, i, event.target.files[i]);
                }
            },
            onUpload: function () {
                var url = 'https://photobookwebapi1.azurewebsites.net/api/Picture'

                var vuecomponent = this;

                for (let i = 0; i < this.UploadPhotos.length; i++) {
                    let reader = new FileReader();
                    reader.readAsDataURL(this.UploadPhotos[i]);
                    reader.onload = function () {
                        let base64Img = reader.result.replace("data:image/jpeg;base64,", "");

                        let dataToBeSend = {
                            pictureString: base64Img,
                            eventPin: vuecomponent.EventPin
                        };

                        fetch(url, {
                            method: 'POST',
                            credentials: 'include',
                            headers: new Headers({
                                'Content-Type': 'application/json', 'Accept': 'application/json'
                            }),
                            mode: 'cors',
                            body: JSON.stringify(dataToBeSend)
                        })
                            .then(function (response) {
                                if (response.status != '200') {
                                    alert("Images failed to upload")
                                }
                            })


                    }

                }


                for (let e = 0; e < this.UploadPhotos.length + 1; e++) {
                    this.UploadPhotos.pop();
                }

            },
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
                                    vuecomponent.EventPhotoIDs = data.body.pictureList;
                                })
                        }
                    });


                for (let EventPhotoID of EventPhotoIDs) {
                    let localphotourl;
                    let specificpictureurl = '/api/Picture/Preview/{EventPin}/{PictureId}' + this.EventPin + EventPhotoID;

                
                    fetch(specificpictureurl, {
                        credentials: 'include',
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'Accept-Language': 'da, en-US; q=0.9, en; q=0.8, de; q=0.7, nb; q=0.6'

                        }),
                        mode: 'cors'
                    })
                     .then(response => response.blob())
                        .then(images => {
                            // Then create a local URL for that image and print it 
                            localphotourl = URL.createObjectURL(images)
                            console.log(outside)
                        })
                }
            }
        
        },
        data() {
            return {
                EventPhotoIDs: [/*...*/],
                EventPhotos: [/*...*/],
                UploadPhotos: [/*...*/],
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