/* File to include all the custom directives */
import Vue from 'vue'

/* Directive for error message */
Vue.directive('errorMsg', {
    bind: function(el, binding, vnode) {
        el.innerHTML = "<div class='alert alert-danger'>" + binding.value + '</div>'
    }
})

/* Directive for success message */
Vue.directive('successMsg', {
    bind: function(el, binding, vnode) {
        el.innerHTML = "<div class='alert alert-success'>" + binding.value + '</div>'
    }
})