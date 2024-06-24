<template>
    <div>
        <h1>Forgot Password</h1>
        <p v-if="emailSended">An email has been sent to you with instructions on how to reset your password.</p>
        <form @submit.prevent="submitForm" v-if="emailSended === false">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>
            <button type="submit">Reset Password</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            emailSended: false,
        };
    },
    methods: {
        submitForm() {
            this.$store.dispatch('auth_store/forgotPassword', { email: this.email })
                .then(() => {
                    this.emailSended = true;
                });
        }
    }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>