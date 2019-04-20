<template>
    <div id="Wrapper">
        <img src="images/photobooktitle.png" width="90%" height="90%" />
        <input class="textbox" type="email" placeholder="Email" /> <br /> <br />
        <input class="textbox" type="password" placeholder="Password" /> <br /> <br />
        <button class="button" type="button" width="100px" Height="50px"> CLick to login as host</button> <br />

    </div>
</template>

<script>
    export default {
        name: 'hostlogin',
        props: {
            msg: String
        }

    };
</script>

<style scoped>
</style>