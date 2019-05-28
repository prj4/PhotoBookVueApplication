<template>
    <div id="WrapperInternalPage" class="Wrapper">
        <div class="WrapperTopNav">
            <a> Hello {{GuestName}} welcome to {{EventName}}</a> <br />
            <div class="aligncenter">
                <label class="inputlabel" for="file">
                    <span v-if="UploadPhotos.length > 0">{{UploadPhotos.length}} images selected</span>
                    <span v-else>Upload</span>
                </label>
                <input name="file" id="file" class="inputfile" accept="image/*" type="file" @change="onFileChange" multiple>
                <button class="smallbutton" @click="downloadPhotos">Download All</button>
                <button class="smallbutton" @click="logout"> Logout </button>
            </div>
        </div>

        <div class="ContentBox">
            <a> Event Pin: {{EventPin}} </a> <br />
            <a> Location: {{EventLocation}} </a><br />
            <a> Description: {{EventDescription}}</a><br />
            <a> Starting: <time datetime="DD-MM-YY:hh:mmTZD">{{EventStarttime}}</time> - Ending: {{EventEndtime}} </a><br />

            <div v-if="EventPhoto != null" v-for="(EventPhoto,index) in EventPhotos" v-bind:key="EventPhoto" class="imgdiv">
                <router-link :to="{name: 'GuestBigPhotoPage', params: {PictureIDindex: index}}">
                    <img class="previewImg" :src="EventPhoto" /><br />
                </router-link>
            </div>
        </div>

        <div id="container"></div>

    </div>

</template>

<script>

    import JSZip from 'jszip'
    import { saveAs } from 'file-saver';


    export default {

        methods: {
            downloadPhotos: function () {

                var zip = new JSZip();
                var count = 0;
                var zipFilename = "Photos.zip";
                var vuecomponent = this;
                let FullSizePhotoArray = [/*...*/]
               

                for (let e = 0; e < vuecomponent.EventPhotoIDs.length; e++) {

                    let specificpictureurl = 'https://photobookwebapi1.azurewebsites.net/api/Picture/' + vuecomponent.EventPin + '/' + vuecomponent.EventPhotoIDs[e];

                    fetch(specificpictureurl, {
                        credentials: 'include',
                        mode: 'cors'
                    })
                        .then(function (response) {
                            if (response.status == '200') {
                                response.blob()
                                    .then(image => {
                                        // Then create a local URL for that image and print it 
                                        FullSizePhotoArray[e] = URL.createObjectURL(image);

                                        var filename = FullSizePhotoArray[e];
                                        
                                        filename = filename.replace(/[\/\*\|\:\<\>\?\"\\]/gi, '').replace("blobhttplocalhost1337", "").replace("blobhttpsphotobookvue.z16.web.core.windows.net", "");;
                                        // loading a file and add it in a zip file
                                        JSZipUtils.getBinaryContent(FullSizePhotoArray[e], function (err, data) {
                                            if (err) {
                                                throw err; // or handle the error
                                            }
                                            zip.file(filename + '.jpg', data, { binary: true });
                                            count++;
                                            vuecomponent.bar.animate((count / vuecomponent.EventPhotos.length) * 0.95);
                                            if (count == vuecomponent.EventPhotos.length) {
                                                zip.generateAsync({ type: 'blob' }).then(function (content) {
                                                    vuecomponent.bar.animate(1);
                                                    saveAs(content, zipFilename);
                                                    vuecomponent.bar.animate(0);
                                                });
                                            }
                                        });

                                    })

                            }
                            else {
                                FullSizePhotoArray[e] = null;
                                count++
                            }
                        })
                }


            },

            onFileChange: function (event) {
                this.UploadPhotos.length = 0;
                for (var i = 0; i < event.target.files.length; i++) {
                    this.$set(this.UploadPhotos, i, event.target.files[i]);
                }
                this.onUpload();
            },
            readFile: function (file) {
                return new Promise((resolve, reject) => {

                    let reader = new FileReader();

                    reader.onload = () => {
                        resolve(reader.result.replace(/data:image\/png;base64,|data:image\/jpeg;base64,|data:image\/gif;base64,/gi, ''));
                    };

                    reader.onerror = reject;

                    reader.readAsDataURL(file);

                })
            },

            onUpload: async function () {
                var url = 'https://photobookwebapi1.azurewebsites.net/api/Picture'

                var vuecomponent = this;

                for (let i = 0; i < this.UploadPhotos.length; i++) {

                    vuecomponent.bar.animate(((i + 1) / this.UploadPhotos.length));


                    let base64Img = await this.readFile(this.UploadPhotos[i])

                    let dataToBeSend = {
                        pictureString: base64Img,
                        eventPin: vuecomponent.EventPin
                    };

                    await fetch(url, {
                        method: 'POST',
                        credentials: 'include',
                        headers: new Headers({
                            'Content-Type': 'application/json', 'Accept': 'application/json'
                        }),
                        mode: 'cors',
                        body: JSON.stringify(dataToBeSend)
                    })
                        .then(function (response) {
                            if (i == vuecomponent.UploadPhotos.length - 1) {
                                vuecomponent.bar.animate(0.0);
                                vuecomponent.getEventPhotos();

                            }
                            if (response.status != '200') {
                                alert("Images failed to upload")
                            }

                        })


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
                                        
                                        vuecomponent.$set(vuecomponent.EventPhotos, e, URL.createObjectURL(image));
                                        
                                    })
                            }
                            else {
                                vuecomponent.$set(vuecomponent.EventPhotos, e, null);
                            }

                        })
                }
                
            },
            getEventInfo: function () {
                var vuecomponent = this;

                var url = 'https://photobookwebapi1.azurewebsites.net/api/Event/' + vuecomponent.EventPin;

                fetch(url, {
                    credentials: 'include',
                    mode: 'cors'
                })
                    .then(function (response) {
                        if (response.status == '200') {
                            response.json()
                                .then(data => ({ body: data }))
                                .then(function (data) {
                                    vuecomponent.EventName = data.body.name;
                                    vuecomponent.EventDescription = data.body.description;
                                    vuecomponent.EventLocation = data.body.location;
                                    {
                                        let DateObject = new Date(Date.parse(data.body.startDate));
                                        let FullDateString = DateObject.toString();
                                        var dateArray = FullDateString.split('');
                                        dateArray.splice(FullDateString.indexOf('GMT') - 4);
                                        var shorterDate = dateArray.join('');
                                        vuecomponent.EventStarttime = shorterDate;
                                    }
                                    {
                                        let DateObject = new Date(Date.parse(data.body.endDate));
                                        let FullDateString = DateObject.toString();
                                        var dateArray = FullDateString.split('');
                                        dateArray.splice(FullDateString.indexOf('GMT') - 4);
                                        var shorterDate = dateArray.join('');
                                        vuecomponent.EventEndtime = shorterDate;
                                    }

                                })
                                
                        }
                    })


            },
            logout: function () {
                var url = 'https://photobookwebapi1.azurewebsites.net/api/Account/Logout';
                
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
                        cookie.delete('LoggedInGuest')
                        cookie.delete('currenteventpin')
                        cookie.delete('currenteventname')
                        cookie.delete('currentguest')
                        router.push({ name: 'Home' })

                    }
                    else {
                        alert("Failed to log out")
                    }
                })
            },



        },
        data() {
            return {
                zippedPhotos: null,
                EventPhotoIDs: [/*...*/],
                EventPhotos: [/*...*/],
                UploadPhotos: [/*...*/],
                EventPin: null,
                EventName: null,
                EventDescription: null,
                EventLocation: null,
                EventStarttime: null,
                EventEndtime: null,
                bar: null,
            }
        },
        beforeMount() {
            if (this.$cookie.get('LoggedInGuest') != 'True') {
                this.$router.push({ name: 'Home' })
                return;
            }
            
            if (this.$cookie.get('currenteventpin') == null) {
                this.$cookie.set('currenteventpin', this.$route.params.EventPin)

            }
            else if (this.$route.params.EventPin != null && this.$cookie.get('currenteventpin') != this.$route.params.EventPin) {
                this.$cookie.set('currenteventpin', this.$route.params.EventPin);
            }

            if (this.$cookie.get('currentguest') == null) {
                this.$cookie.set('currentguest', this.$route.params.GuestName)

            }
            else if (this.$route.params.GuestName != null && this.$cookie.get('currentguest') != this.$route.params.GuestName) {
                this.$cookie.set('currentguest', this.$route.params.GuestName);
            }
            
            this.EventPin = this.$cookie.get('currenteventpin');
            this.GuestName = this.$cookie.get('currentguest');
            this.getEventInfo();
           
            this.getEventPhotos();
        },
        mounted() {
            var ProgressBar = require('progressbar.js')
            this.bar = new ProgressBar.Circle(container, {
                strokeWidth: 10,
                easing: 'easeInOut',
                duration: 500,
                color: '#f4766f',
                trailWidth: 0,
                svgStyle: null
            });
        },



    }


</script>

<style scoped>
</style>