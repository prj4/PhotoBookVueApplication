import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import hostlogin from "./components/hostlogin.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/hostlogin",
            name: "hostlogin",
            component: hostlogin
        },
        
    ]
});
