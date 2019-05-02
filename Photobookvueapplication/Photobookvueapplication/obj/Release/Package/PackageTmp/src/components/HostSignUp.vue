<template>
    <div id="Wrapper">
        <img src="images/photobooktitle.png" width="90%" height="90%" />
        <form id="signup" method="post" @submit="postHostSignUp" >
            <input class="textbox" type="name" v-model="HostName" placeholder="Name" required /> <br /> <br />
            <input class="textbox" type="email" v-model="HostEmail" placeholder="Email" required /> <br /> <br />
            <input class="textbox" type="password" v-model="HostPassword" placeholder="Password" required pattern="[\w]{6,}"/> <br /> <br />
            <input class="textbox" type="password" v-model="HostConfirmPassword" placeholder="Confirm Password" required pattern="[\w]{6,}"/> <br /> <br />

        </form>
        <router-link to="/hostlogin">
            <button class="button" type="button" width="100px" Height="50px"> Sign up as Host</button>
        </router-link>

    </div>
</template>

<script>
    const apiUrl = 'https://photobookwebapi1.azurewebsites.net/api/Account/Host';

    export default {
        methods: {
            postHostSignUp: function (e) {
                e.preventDefault();

                var url = 'https://photobookwebapi1.azurewebsites.net/api/Account/Host';

                var data = {
                    userName: this.HostName,
                    email: this.HostEmail,
                    passWord: this.HostPassword,
                    confirmPassword: this.confirmPassword,
                };

                this.errors = [];

                if (this.HostName === '') {
                    this.errors.push('Name is required');
                } else {
                    fetch(apiURL + encodeURIComponent(this.HostName))
                        .then(res => res.json())
                        .then(res => {
                            if (res.error) {
                                this.errors.push(res.error);
                            } else {
                                alert("You are now signed up as a Host")
                            }
                        });
                }

            }
        }
    };
    


</script>

<style scoped>
</style>