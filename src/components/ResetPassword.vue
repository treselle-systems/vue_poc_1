<!-- Html Section for Reset password page-->
<template>
<div class="limiter">
    <div class="container-login100">
        <div class="wrap-login100">
            <span v-if="(validationMsg != '')" v-error-msg="validationMsg"></span>
            <span v-if="(successMsg != '')" v-success-msg="successMsg"></span>
            <span class="login100-form-title p-b-34 p-t-27">
           Reset Password  
          </span>
            <div class="wrap-input100 validate-input" data-validate="New password">
                <input @keyup.enter="resetPassword" class="input100" v-model="resPassword" type="password" name="resPassword" placeholder="New password">
                <span class="focus-input100" data-placeholder=""></span>
            </div>
            <div class="wrap-input100 validate-input" data-validate="Confirm password">
                <input @keyup.enter="resetPassword" class="input100" v-model="confPassword" type="password" name="confPassword" placeholder="Confirm Password">
                <span class="focus-input100" data-placeholder=""></span>
            </div>
            <div class="container-login100-form-btn">
                <button v-on:click="resetPassword" class="login100-form-btn">
                    Reset
                </button>
            </div>
            <div class="text-center p-t-90" style="padding-top: 20px;">
                <a class="txt1" href="/#/login">
               Login
            </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import authService from './mixins/authService'
import langService from './mixins/langService'
/* Import scripts for Reset Password component  */
require('./directives/MessageDirective')
const encode = require('nodejs-base64-encode')

export default {
    name: 'ResetPassword',
    mixins: [authService, langService],
    data () {
        return {
            resPassword: '',
            confPassword: '',
            validationMsg: '',
            successMsg: ''
        }
    },
    created: function () {},
    methods: {
        /* Method to reset the password  */
        resetPassword: function (event) {
            let self = this
            this.validateConfirmPassword().then(function (response) {
                let resetPwdParams = {
                    token: self.$route.params.token,
                    resPwd: encode.encode(self.resPassword, 'base64')
                }
                self.confirmPassword(resetPwdParams).then(function (response) {
                    var apiRes = response.body
                    if (apiRes.res === 'success') {
                        this.successMsg = this.lang.update_password_success
                        setTimeout(function () {
                            self.successMsg = ''
                            self.resPassword = ''
                            self.confPassword = ''
                        }, 3000)
                    }
                })
            })
        },
        /* Method to validate the confirm password  */
        validateConfirmPassword: function () {
            return new Promise((resolve, reject) => {
                if (this.resPassword === '') {
                    this.validationMsg = this.lang.enter_new_password
                } else if (this.confPassword === '') {
                    this.validationMsg = this.lang.enter_confirm_password
                } else if (this.confPassword !== this.resPassword) {
                    this.validationMsg = this.lang.password_not_match
                }

                if (this.validationMsg !== '') {
                    var self = this
                    setTimeout(function () {
                        self.validationMsg = ''
                    }, 3000)
                } else {
                    resolve({
                        'success': 'true'
                    })
                }
            })
        }
    }
}
</script>

