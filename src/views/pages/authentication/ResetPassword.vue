<template>
    <div>
        <h1>Reset Password</h1>
        <form @submit.prevent="resetPassword">
            <label for="new-password">New Password:</label>
            <input type="password" id="new-password" v-model="password" required>
            <button type="submit">Reset</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        resetPassword() {
            let token = this.$route.params.token;

            this.$store.dispatch('auth_store/resetPassword', { token: token, password: this.password })
                .then(() => {
                    this.$router.push({ name: 'login' });
                })
                .catch((error) => {
                    console.log('error', error);
                })
        }
    }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>