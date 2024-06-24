<template>
    <div class=" content-center">
        <h1>Déconnexion</h1>
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