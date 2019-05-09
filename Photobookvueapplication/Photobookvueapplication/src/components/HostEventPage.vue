<template>
    <div id="WrapperInternalPage" class="Wrapper">
        
            <div class="WrapperTopNav">
                <a>    {{thisEventName}} hosted by {{EventHostName}}</a> <br />
                <div class="aligncenter">
                    <label class="inputlabel" for="file">
                        <span v-if="UploadPhotos.length > 0">{{UploadPhotos.length}} images selected</span>
                        <span v-else>Select images</span>
                    </label>

                    <input name="file" id="file" class="inputfile" accept="image/*" type="file" @change="onFileChange" multiple>
                    <button class="smallbutton" @click="onUpload">Upload</button>
                    <button class="smallbutton" @click="deleteEvent">Delete Event</button>
                    <!--<input class="smallbutton" type="button" v-on:click="updatepage" value="Update" />--> <br /> <br />
                </div>
            </div>


            <div class="ContentBox">

                <div v-if="EventPhoto != null" v-for="(EventPhoto,index) in EventPhotos" v-bind:key="EventPhoto" class="imgdiv">
                    <router-link :to="{name: 'HostBigPhotoPage', params: {PictureIDindex: index}}">
                        <img  class="previewImg" :src="EventPhoto" /><br />
                    </router-link>
                </div>

            </div>
        
    </div>
</template>

<script>
    export default {

        methods: {
            deleteEvent: function () {
                var url = 'https://photobookwebapi1.azurewebsites.net/api/Event/' + this.EventPin;
                var vuecomponent = this;
                
                fetch(url, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/json', 'Accept': 'application/json'
                    }),
                    mode: 'cors',
                   
                })
                    .then(function (response) {
                        if (response.status == '200' || response.status == '204') {
                            vuecomponent.$router.push({ path: `/HostHomePage` })
                        }
                       
                    })
            },
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
                        let base64Img = reader.result.replace(/data:image\/png;base64,|data:image\/jpeg;base64,|data:image\/gif;base64,/gi, '');
                        
                        //data: image / gif; base64,
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
                                vuecomponent.getEventPhotos();
                            })

                    }

                }

                while (this.UploadPhotos.length != 0) {
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
                                    for (let i = 0; i < data.body.pictureList.length; i++) {
                                        vuecomponent.$set(vuecomponent.EventPhotoIDs, i, data.body.pictureList[i]);
                                        
                                    }
                                    
                                })
                                .then(function () {
                                    vuecomponent.$cookie.set('currenteventphotoids', JSON.stringify(vuecomponent.EventPhotoIDs))
                                    vuecomponent.updatepage();
                                })
                        }
                    })
            },

            updatepage: async function () {
                var vuecomponent = this;
                
                for (let e = 0; e < vuecomponent.EventPhotoIDs.length; e++) {

                    let specificpictureurl = 'https://photobookwebapi1.azurewebsites.net/api/Picture/Preview/' + vuecomponent.EventPin + '/' + vuecomponent.EventPhotoIDs[e];


                    await fetch(specificpictureurl, {
                        credentials: 'include',
                        mode: 'cors'
                    })
                        .then(function (response) {
                            if (response.status == '200') {
                                response.blob()
                                    .then(image => {
                                        // Then create a local URL for that image and print it 
                                        vuecomponent.$set(vuecomponent.EventPhotos, e, URL.createObjectURL(image));
                                        

                                    })
                            }
                            else {
                                vuecomponent.$set(vuecomponent.EventPhotos, e, null);
                            }

                        })
                }
            },
            
            
        
        },
        data() {
            return {
                
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


</style>