import Vue from 'vue';
import App from './App.vue';
import Router from './router';
import VueCookie from 'vue-cookie'


Vue.use(VueCookie);

Vue.config.productionTip = false;


new Vue({
    router: Router,
    render: h => h(App)
}).$mount('#app');
