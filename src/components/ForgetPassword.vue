<!-- Html Section for Forget Password page-->
<template>
<div class="limiter">
    <div class="container-login100">
        <div class="wrap-login100">
            <span v-if="(validationMsg != '')" v-error-msg="validationMsg"></span>
            <span class="login100-form-title p-b-34 p-t-27">
            Forget Password 
          </span>
            <div class="wrap-input100 validate-input">
                <input @keyup.enter="getForgPwd" class="input100" type="text" v-model="fpEmail" name="fpEmail" placeholder="Email">
                <span class="focus-input100" data-placeholder=""></span>
            </div>
            <div class="container-login100-form-btn">
                <button v-on:click="getForgPwd()" class="login100-form-btn">
                    Submit
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

/* Import scripts for Forgetpassword component  */
require('./directives/MessageDirective')
import authService from './mixins/authService'
import langService from './mixins/langService'

export default {
    name: 'ForgetPassword',
    mixins: [authService,langService],
    data () {
        return {
            validationMsg: '',
            fpEmail: ''
        }
    },
    methods: {
        /* Method to handle the forget password functionality  */
        getForgPwd: function (event) {
            let forgPwdParams = {
                userEmail: this.fpEmail
            }
            let self = this
            this.validateEmail().then(function (response) {
                self.getForgetPassword(forgPwdParams).then(function (response) {
                    var apiRes = response.body
                    if (apiRes.res === 'success') {
                        self.$router.push('/reset_password/' + apiRes.token)
                    } else {
                        self.validationMsg = this.lang.enter_email
                        this.clearvalidationMsg(this)
                    }
                }).catch(function (error) {
                    self.validationMsg = this.lang.enter_valid_email
                    this.clearvalidationMsg(this)
                })
            })
        },
        /* Method to validate the provided email  */
        validateEmail: function () {
            return new Promise((resolve, reject) => {
                var emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

                if (this.fpEmail === '') {
                    this.validationMsg = this.lang.enter_email
                } else if (!emailRegx.test(this.fpEmail.toLowerCase())) {
                    this.validationMsg = this.lang.enter_valid_email
                } else {
                    this.validationMsg = ''
                }

                if (this.validationMsg !== '') {
                    this.clearvalidationMsg(this)
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

