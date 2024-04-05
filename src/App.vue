<script setup lang="ts">
import { RouterView } from 'vue-router';</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
        <button class="btn">Button</button>
        <div class="wrapper">
            <h1 class="text-3xl font-bold underline">
                Hello world!
            </h1>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </nav>
        </div>
    </header>

    <RouterView />
</template>

<style scoped></style>
