// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

Vue.use(VueResource)

/* Included the needed css files for application  */
require('./assets/vendor/bootstrap/css/bootstrap.min.css')
require('./assets/fonts/iconic/css/material-design-iconic-font.min.css')
require('./assets/vendor/animate/animate.css')
require('./assets/css/main.css')

Vue.config.productionTip = false

/* eslint-disable no-new */

/* Component which handles the routing for the application */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
})
