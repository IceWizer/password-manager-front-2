<template>
    <h1 class="text-center text-2xl font-bold mt-10 mb-5">Liste des mots de passe</h1>
    <div class="flex  flex-wrap gap-10 justify-center p-5 ">
            <div  class="grid grid-cols-4 gap-10 justify-center p-5">
                <CardPassword v-for="password in passwords" :key="password.id ?? '0'" :password="password"
                    :canEdit="false" :canSee="false" />
            </div>
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