<template>
    <div id="WrapperInternalPage" class="Wrapper">
        <div>
            <a class="alignleft">    {{thisEventName}} hosted by {{EventHostName}}</a> <br /> 


            <label class="inputlabel" for="file">
                <span v-if="UploadPhotos.length > 0">{{UploadPhotos.length}} images selected</span>
                <span v-else>Select images</span>
            </label>

            <input name="file" id="file" class="inputfile" accept="image/*" type="file" @change="onFileChange" multiple>
            <button class="smallbuttonleft" @click="onUpload">Upload</button>
            <input class="smallbuttonleft" type="button" v-on:click="updatepage" value="Update" /> <br /> <br />

        </div>

        <div class="aligncenter">
            
            <div v-for="EventPhoto in EventPhotos" class="imgdiv">
                <router-link to="/">
                    <img class="previewImg" :src="EventPhoto" /><br />
                </router-link>
                    <button class="btn"></button>
            </div>
            
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

                while (this.UploadPhotos.length != 0) {
                    this.UploadPhotos.pop();
                }

                this.getEventPhotos();

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
                                    for (let i = 0; i < data.body.pictureList.length; i++) {
                                        vuecomponent.$set(vuecomponent.EventPhotoIDs, i, data.body.pictureList[i]);

                                    }
                                    vuecomponent.IDlength = vuecomponent.EventPhotoIDs.length;

                                })
                        }
                    })
            },

            updatepage: function () {
                var vuecomponent = this;
                let count = 0;
                for (let e = 0; e < vuecomponent.EventPhotoIDs.length; e++) {

                    let specificpictureurl = 'https://photobookwebapi1.azurewebsites.net/api/Picture/Preview/' + vuecomponent.EventPin + '/' + vuecomponent.EventPhotoIDs[e];


                    fetch(specificpictureurl, {
                        credentials: 'include',
                        mode: 'cors'
                    })
                        .then(function (response) {
                            if (response.status == '200') {
                                response.blob()
                                    .then(image => {
                                        // Then create a local URL for that image and print it 
                                        vuecomponent.$set(vuecomponent.EventPhotos, count, URL.createObjectURL(image));
                                        count++;

                                    })
                            }

                        })
                }
            },
            
            
        
        },
        data() {
            return {
                IDlength: null,
                EventPhotoIDs: [/*...*/],
                EventPhotos: [/*...*/],
                UploadPhotos: [/*...*/],
                EventPin: null,
                EventHostName: this.$cookie.get('LoggedInHostName'),
                HostEmail: this.$cookie.get('LoggedInEmail'),
                thisEventName: null
                
            }
        },
        beforeMount() {
            

            if (this.$cookie.get('currenteventname') == null) {
                this.$cookie.set('currenteventname', this.$route.params.EventName)
                this.$cookie.set('currenteventpin', this.$route.params.Pin)
            }
            else if (this.$route.params.EventName != null && this.$cookie.get('currenteventname') != this.$route.params.EventName) {
                this.$cookie.set('currenteventname', this.$route.params.EventName);
                this.$cookie.set('currenteventpin', this.$route.params.Pin);
            }

            this.EventPin = this.$cookie.get('currenteventpin');
            this.thisEventName = this.$cookie.get('currenteventname');

            this.getEventPhotos();
        },     
        
        
      
    }



</script>

<style scoped>
a{
    margin-left:5px;
   
}

</style>