<template>
    <div id="Wrapper">
        <img src="images/photobooktitle.png" width="90%" height="90%" />
        <form>
            <input name="Name" class="textbox" type="text" v-model="HostName" placeholder="Name" /> <br /> <br />
            <input name="Email" class="textbox" type="email" v-model="HostEmail" placeholder="Email" /> <br /> <br />
            <input name="Password" class="textbox" type="text" v-model="HostPassword" placeholder="Password (min. 6 characters)" /> <br /> <br />
            <input name="ConfirmPassword" class="textbox" type="text" v-model="HostConfirmPassword" placeholder="Confirm Password" /> <br /> <br />
            <input class="button" v-on:click="postHostSignUp" @click.prevent="redirect" type="submit" value="Click to sign up as Host" width="100px" Height="50px" /><br />
        </form>


    </div>
</template>

<script>
    export default {

        methods: {

            postHostSignUp: function () {

                var url = 'https://photobookwebapi1.azurewebsites.net/api/Account/Host'

                
                var data = {
                    Name: this.HostName,
                    Email: this.HostEmail,
                    Password: this.HostPassword,
                    ConfirmPassWord: this.HostConfirmPassword
                };

                if (this.HostName === null) {
                    alert("Please enter a valid name");
                    return false;
                }

                if (this.HostEmail === null) {
                    alert("Please enter a valid email (1)");
                    return false;
                }


                //if (this.HostEmail !== re) {
                //    alert("Please enter a valid email (2)");
                //    return false;
                //}

                if (this.HostPassword === null) {
                    alert("Please enter valid passowrd");
                    return false;
                }

                if (this.HostConfirmPassword !== this.HostPassword) {
                    alert("The confirmed password does not match selected password");
                    return false;
                }


                //var vuecomponent = this;
                var router = this.$router;

                fetch(url, {
                    method: 'POST',
                    credential: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }),
                    mode: 'cors',
                    body:
                        JSON.stringify(data)
                })

                  .then(function (response) {
                        if (response.status == '200') {
                            router.push({ name: 'Home', params: { HostName: data.Name, HostEmail: data.Email, HostPassword: data.Password, } })
                            alert('You are now signed up as a host')
                        } else {
                            alert("Error: Host could not be signed up");
                        }

                    })
            }

        },
        data: function () {
            return {
                HostName: null,
                HostEmail: null,
                HostPassword: null,
                HostConfirmPassword: null

            }
        },

    }

</script>

<style scoped>
</style>