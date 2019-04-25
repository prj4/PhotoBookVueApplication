<template>
    <div id="WrapperInternalPage" class="wrapper">
        <a class="alignleft">Welcome {{HostName}} </a>
        <input class="smallbuttonright" type="button"  value="Add Event"/>
        <input class="smallbuttonright" type="button"  value="Delete Event"/>
        <input class="smallbuttonright" type="button" value="Logout"/>


        <br />
        
    </div>
</template>

<script>
    export default {


        methods: {
            
        },
        data() {
            return {
                HostEmail: "Børge",
                HostPassword: null,
                HostName: "Børge"
            }
        },
        name: 'HostHomePage',
        props: {
            msg: String,
            


        }



    };

</script>

<style scoped>
</style>