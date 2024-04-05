<template>
    <header>
        <div class="navbar bg-base-100">
            <nav class="">
                <RouterLink to="/"><font-awesome-icon :icon="['fas', 'fingerprint']" size="2xl" class=" text-primary" />
                </RouterLink>
            </nav>
        </div>
    </header>

    <RouterView class=" h-full" />
</template>

<style scoped></style>

<script lang="ts">
import { RouterView } from 'vue-router';
</script>