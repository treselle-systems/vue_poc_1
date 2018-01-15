<!-- Html Section for Login page-->
<template>
<div class="limiter">
    <div class="container-login100">
        <div class="wrap-login100">
            <span v-if="(validationMsg != '')" v-error-msg="validationMsg"></span>
            <span class="login100-form-title p-b-34 p-t-27">
            Log in    
          </span>
            <div class="wrap-input100 validate-input" data-validate="Enter username">
                <input @keyup.enter="login" class="input100" type="text" v-model="uEmail" name="uEmail" placeholder="Email">
                <span class="focus-input100"></span>
            </div>
            <div class="wrap-input100 validate-input" data-validate="Enter password">
                <input @keyup.enter="login" class="input100" v-model="uPassword" type="password" name="uPassword" placeholder="Password">
                <span class="focus-input100"></span>
            </div>
            <div class="container-login100-form-btn">
                <button v-on:click="login" class="login100-form-btn">
                    Login
                </button>
            </div>
            <div class="text-center p-t-90" style="padding-top: 20px;">
                <a class="txt1" href="/#/forget_password">
              Forgot Password?
            </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>

/* Import scripts for Login component  */
require('./directives/MessageDirective')
import authService from './mixins/authService'
import langService from './mixins/langService'
const encode = require('nodejs-base64-encode')

export default {
    name: 'Login',
    mixins: [authService,langService],
    data() {
        return {
            validationMsg: '',
            uEmail: '',
            uPassword: ''
        }
    },
    created: function() {console.log()},
    methods: {
        /* Method to handle the login functionality  */
        login: function() {
            var self = this
            this.validateLogin().then(function(response) {
                let loginParams = {
                    userEmail: self.uEmail,
                    userPwd: encode.encode(self.uPassword, 'base64')
                }
                /* Get Login detail from authservice */
                self.getLoginDetails(loginParams).then(function(response) {

                    var apiRes = response.body

                    if (apiRes.res === 'success') {
                        console.log(apiRes)
                        self.$cookies.set('user_session', (apiRes.token))
                        self.$router.push('/home')
                    } else {
                        self.validationMsg = this.lang.wrong_cre
                        this.clearvalidationMsg(self);
                    }
                })
            })
        },
        /*Promise  method to validate the login input parameters  */
        validateLogin: function() {
            return new Promise((resolve, reject) => {
                var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (this.uEmail === '') {
                    this.validationMsg = this.lang.enter_email
                } else if (!emailRegex.test(this.uEmail.toLowerCase())) {
                    this.validationMsg = this.lang.enter_valid_email
                } else if (this.uPassword === '') {
                    this.validationMsg = this.lang.enter_password
                }  else {
                    this.validationMsg = ''
                }

                if (this.validationMsg !== '') {
                    var self = this
                    this.clearvalidationMsg(self);
                } else {
                    resolve({
                        'success': 'true'
                    })
                }
            })
        },

        /* Method to clear any validation messages after 5 secs  */
        clearvalidationMsg: function(self) {
            setTimeout(function() {
                self.validationMsg = ''
            }, 5000)
        }
    }
}

</script>

