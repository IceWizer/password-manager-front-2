<template>
    <h1>Liste des mots de passe</h1>
    <div>
        <CardPassword v-for="password in passwords" :key="password.id ?? '0'" :password="password" :canEdit="false"
            :canSee="false" />
    </div>
</template>

<script lang="ts">
import CardPassword from '@/components/CardPassword.vue';
import type Password from '@/models/password';

export default {
    components: {
        CardPassword
    },
    data(): {
        passwords: Password[],
    } {
        return {
            passwords: [],
        }
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            this.$store.dispatch("admin_store/fetchPasswords")
                .then((response: { data: Password[], pagination: any }) => {
                    this.passwords = response.data;
                })
        }
    }
} 
</script>