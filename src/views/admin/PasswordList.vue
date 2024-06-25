<template>
    <h1>Liste des mots de passe</h1>
    <div>
        <CardPassword />
    </div>
</template>

<script lang="ts">
import CardPassword from '@/components/CardPassword.vue';

export default {
    components: {
        CardPassword
    }
}
</script>