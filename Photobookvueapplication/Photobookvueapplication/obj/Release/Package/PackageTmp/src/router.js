import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import hostlogin from "./components/hostlogin.vue";
import HostSignUp from "./components/HostSignUp.vue";
import HostHomePage from "./components/HostHomePage.vue";
import AddEvent from "./components/AddEvent.vue";
import GuestEventPage from "./components/GuestEventPage.vue";

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
        {
            path: "/HostSignUp",
            name: "HostSignUp",
            component: HostSignUp
        },
        {
            path: "/HostHomePage",
            name: "HostHomePage",
            component: HostHomePage
        },
        {
            path: "/AddEvent",
            name: "AddEvent",
            component: AddEvent
        },
        {
            path: "/GuestEventPage",
            name: "GuestEventPage",
            component: GuestEventPage
        }
        
    ]
});
