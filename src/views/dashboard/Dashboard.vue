<template>
    <h1 class="title p-3">Liste des mots de passe</h1>
    <div class="flex flex-wrap gap-10 justify-center p-5">
<!--    Password row    -->
        <div class="card w-96 bg-base-100 shadow-xl" v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9]" >
            <div class="card-body">
                <h2 class="card-title">Facebook</h2>
                <p>username: florian.charlot53@gmail.com</p>
                <p>site web: https://facebo0k.com/</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "DashboardView",
    mounted() {
        //this.$store.dispatch('getTest');
    }
}
</script>

<style scoped></style>