<!-- Html Section for Home page-->
<template>
<div>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">HOME</a>
            </div>
            <ul class="nav navbar-nav navbar-right">
                <li v-on:click="logout">Log Out</li>
            </ul>
        </div>
    </nav>
    <div class="container">
        <div class="inner-container">
            <h1>Welcome to Home Page</h1>
            <p>This poc is a quick exercise to illustrate how the vue application works.</p>
        </div>
    </div>
</div>
</template>

<script>
/* Import scripts for Home component  */

export default {
    name: 'Home',
    data () {
        return {}
    },
    methods: {
        /* Method to clear cookies and redirect to login page  */
        logout: function () {
            this.$cookies.remove('user_session')
            this.$router.push('/login')
        }
    }
}
</script>


