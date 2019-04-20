<template>
    <div class="home">
        <div id="Wrapper">
            <img src="../../public/images/photobooktitle.png" width="90%" height="90%" />
            <form id="eventLogin" >
                <input class="textbox" type="text" placeholder="Event Pin" /> <br /> <br />
                <input class="button" type="submit" value="Click to login to event"></input> <br /> <br /> <br />
            </form>

            <router-link to="/hostlogin"> 
            <button class="button" type="button" width="100px" Height="50px"> Login as Host</button> 
            </router-link>
             <br />

        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        props: {
            msg: String
        }
        
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
