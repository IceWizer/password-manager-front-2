<template>
    <div class="text-center gap-2">
        <h1>Déconnexion</h1>
        <span class="loading loading-spinner loading-lg"></span>
    </div>
</template>

<script>
import connection from "@/auth/utils/connection";

export default {
    name: "Log-out",
    setup() {
        return {

        }
    },
    created() {
        this.logout();
    },
    methods: {
        logout() {
            this.$store.dispatch('auth_store/logout')
                .then((response) => {
                    connection.logout();
                    this.$router.push({ name: 'login' });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}
</script>