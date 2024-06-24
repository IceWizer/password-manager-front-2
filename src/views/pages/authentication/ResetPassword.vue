<template>
    <div>
        <h1>Reset Password</h1>
        <form @submit.prevent="resetPassword">
            <label for="new-password">New Password:</label>
            <input type="password" id="new-password" v-model="password" required>
            Temps pour trouver le mot de passe : <span class="text-error">{{
                passwordStrength(item.password).value }}</span><a
                href="https://patrowl.io/fr/le-tableau-de-la-resistance-des-mots-de-passe/" target="_blank">*</a>
            <button type="submit">Reset</button>
        </form>
    </div>
</template>

<script>
import { passwordStrength } from 'check-password-strength'

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