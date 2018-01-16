/* Import all the components for routing  */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import ForgetPassword from '@/components/ForgetPassword'
import ResetPassword from '@/components/ResetPassword'
import VueResource from 'vue-resource'
import config from '../config/config'

Vue.use(VueResource)
Vue.use(Router)

/*  Below the configuration for application routing to define the path and components */

export default new Router({
    routes: [{
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: (to, from, next) => {
            redirectPath('/home', next)
        }
    }, {
        path: '/forget_password',
        name: 'ForgetPassword',
        component: ForgetPassword,
        beforeEnter: (to, from, next) => {
            redirectPath('/home', next)
        }
    }, {
        path: '/reset_password/:token',
        name: 'ResetPassword',
        component: ResetPassword,
        beforeEnter: (to, from, next) => {
            redirectPath('/home', next)
        }
    }, {
        path: '/home',
        name: 'Home',
        component: Home,
        beforeEnter: (to, from, next) => {
            let userSession = window.$cookies.get('user_session')
            if (userSession == null) {
                next(redirectPath)
            } else {
                next()
            }
        }
    }]
})

/* Function to redirect to provided path  */
function redirectPath (redirectPath, next) {
    let userSession = window.$cookies.get('user_session')
    if (userSession != null) {
        next(redirectPath)
    } else {
        next()
    }
}

/* Interceptors to handle all the $http request. All ajax calls api end point is configured here */
Vue.http.interceptors.push(function (request, next) {
    request.url = config.apiEndPoint + request.url
    next()
})
