<template>
    <div id="WrapperInternalPage" class="Wrapper">

        <div class="bigphotooutercontainer" :key="BigPhoto">
            <div class="bigphotoinnecontainer">
                <img class="BigPhoto" :src="BigPhoto"/>
            </div>
        </div>


        <div class="bigphotobuttons">
            <button class="smallbutton" @click="previousPhoto">Previus photo</button>
            <button class="smallbutton" @click="deletePhoto">Delete</button>
            <button class="smallbutton" @click="nextPhoto">Next photo</button>
        </div>
        
        

    </div>
</template>

<script>
    export default {

        methods: {
            updatepage: async function () {
                var vuecomponent = this;
                let specificpictureurl = 'https://photobookwebapi1.azurewebsites.net/api/Picture/' + vuecomponent.EventPin + '/' + vuecomponent.currentPictureID;
                    await fetch(specificpictureurl, {
                        credentials: 'include',
                        mode: 'cors'
                    })
                        .then(function (response) {
                            if (response.status == '200') {
                                vuecomponent.Photographer = response.headers.get("content-disposition");
                                response.blob()
                                    .then(image => {
                                        // Then create a local URL for that image and print it
                                        vuecomponent.BigPhoto = URL.createObjectURL(image);
                                        
                                    })
                            }
                            
                        })
            },
            nextPhoto: function () {
                var json_str = this.$cookie.get('currenteventphotoids');
                var arr = JSON.parse(json_str);
                if (this.currentPictureIDindex < arr.length - 1) {
                    var IndexToParse = parseInt(this.currentPictureIDindex);
                    IndexToParse++;
                    this.reloadWithIndex(IndexToParse);
                }
                
            },
            previousPhoto: function () {
                if (this.currentPictureIDindex > 0) {
                    var IndexToParse = parseInt(this.currentPictureIDindex);
                    IndexToParse--;
                    this.reloadWithIndex(IndexToParse);
                }
            },
            deletePhoto: function () {
                var vuecomponent = this;
                var url = 'https://photobookwebapi1.azurewebsites.net/api/Picture/' + this.EventPin + '/' + this.currentPictureID;
                var data = {
                    EventPin: this.EventPin,
                    PictureId: this.currentPictureID
                }

                 fetch(url, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/json', 'Accept': 'application/json'
                    }),
                    mode: 'cors',
                    body: JSON.stringify(data)
                }).then(function (response) {
                    if (response.status == '401' || response.status == '404') {
                        alert("Images failed to delete")
                    }

                    vuecomponent.fetchNewIDList();
                    
                })
                
            },
            reloadWithIndex: function (index) {
                this.currentPictureIDindex = index;
                this.$cookie.set('currentHostBigPhoto', index);
                var json_str = this.$cookie.get('currenteventphotoids');
                var arr = JSON.parse(json_str);
                this.currentPictureID = arr[index];
                this.updatepage();
            },
            fetchNewIDList:  function () {
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
                                    vuecomponent.$cookie.set('currenteventphotoids', JSON.stringify(data.body.pictureList))
                                    var arrayLength = data.body.pictureList.length;
                                    
                                     if (arrayLength == 0) {
                                         // vuecomponent.$router.push({ path: `/HostEventPage` })
                                         vuecomponent.$router.go(-1);
                                     }
                                     else if (vuecomponent.currentPictureIDindex == arrayLength) {
                                         vuecomponent.previousPhoto();
                                     }
                                    else {
                                        var IndexToParse = parseInt(vuecomponent.currentPictureIDindex);
                                        vuecomponent.reloadWithIndex(IndexToParse);
                                    }
                                })
                                
                        }
                    })
            }

        },
        data() {
            return {
                EventPhotoIDs: [/*...*/],
                BigPhoto: null,
                Photographer: null,
                currentPictureID: null,
                currentPictureIDindex: null,
                EventHostName: this.$cookie.get('LoggedInHostName'),
                HostEmail: this.$cookie.get('LoggedInEmail'),
                EventPin: null

            }
        },
        beforeMount() {
            if (this.$route.params.PictureIDindex == null) {
                this.currentPictureIDindex = this.$cookie.get('currentHostBigPhoto');
            }
            else {
                this.$cookie.set('currentHostBigPhoto', this.$route.params.PictureIDindex);
                this.currentPictureIDindex = this.$cookie.get('currentHostBigPhoto');
            }
            this.EventPin = this.$cookie.get('currenteventpin');

            var json_str = this.$cookie.get('currenteventphotoids');
            this.EventPhotoIDs = JSON.parse(json_str);
            var arr = JSON.parse(json_str);

            this.currentPictureID = arr[this.currentPictureIDindex];


            this.updatepage();
        }
    }



</script>

<style scoped>
    
</style>