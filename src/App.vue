<template class="h-full" >
    <Navbar v-if="showNavbar" />
    <RouterView class=" mt-60 my-auto"/>
</template>

<style scoped></style>

<script lang="ts">
import { RouterView } from 'vue-router';

import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  },
  computed: {
    showNavbar() {
      // Liste des chemins où la navbar ne doit pas être affichée
      const noNavbarRoutes = ['/login', '/register'];
      return !noNavbarRoutes.includes(this.$route.path);
    }
  }
};
</script>