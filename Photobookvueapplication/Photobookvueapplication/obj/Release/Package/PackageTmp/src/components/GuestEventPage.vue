<template>
    <div id="WrapperInternalPage" class="Wrapper">
        <a class="alignleft">Welcome {{HostName}} To {{EventName}}</a>
        <router-link to="/AddEvent">
            <input class="smallbuttonright" type="button" value="Add Photos" />
        </router-link>
        

        <br />

    </div>
</template>

<script>
    export default {


        methods: {
            
        },
        data() {
            return {
                
            }
        },
        beforeMount() {
            
        },
        name: 'GuestEventPage',
        props: {
        }





    };

</script>

<style scoped>
</style>