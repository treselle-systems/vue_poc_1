export default {
    methods: {

        /* Method to call the login details api  */
        getLoginDetails: function (loginParams) {
            return this.$http.post('api/v1/login', loginParams)
        },

        /* Method to call the forget password api  */
        getForgetPassword: function (forgPwdParams) {
            return this.$http.post('api/v1/resetPwdToken', forgPwdParams)
        },

        /* Method to call the confirm password api  */
        confirmPassword: function (confPwdParams) {
            return this.$http.post('api/v1/resetPwd', confPwdParams)
        }
    }
}
