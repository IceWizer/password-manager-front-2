<template>
    <div>
        <h1>Verify Email</h1>
        <button @click="verifyEmail">Verify</button>
    </div>
</template>

<script>
export default {
    methods: {
        verifyEmail() {
            // Get the token from the route
            let token = this.$route.params.token;

            // Send a request to the backend with the token in the route
            this.$store.dispatch('auth_store/verifyEmail', { token: token })
                .then(response => {
                    this.$router.push({ name: "login" });
                })
                .catch(error => {
                    console.error('An error occurred while verifying email:', error);
                });
        }
    }
};
</script>