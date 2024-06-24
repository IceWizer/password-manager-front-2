<template>
    <div class="flex flex-wrap gap-10 justify-center p-5">
        <button class="card w-96 bg-base-200 shadow-xl" v-for="password in passwords" @click="showPassword(password)">
            <div class="card-body">
                <h2 class="card-title">{{ password?.label }}</h2>
            </div>
        </button>
        <div class="card w-96 bg-base-200 shadow-xl">
            <button class="card-body flex flex-row justify-between">
                <RouterLink to="/password">
                    <h2 class="card-title">Ajouter</h2>
                    <div class="content-center">
                        <font-awesome-icon size="2xl" :icon="['fas', 'circle-plus']" />
                    </div>
                </RouterLink>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import * as Yup from "yup";
export default {
    name: "DashboardView",
    mounted() {
        //this.$store.dispatch('getTest');
    },
    components: {
        // ModalPassword
    },
    data() {
        return {
            item: {
                label: '',
                comment: '',
                password: ''
            },
            stateOn: {
                label: false,
                comment: false,
                password: false,
            },
            validators: {
                label: Yup.string().required,
                comment: Yup.string(),
                password: Yup.string().required,
            },
            passwords:[],
            showPassword: false,
            newLabel: ''
        }
    },
    methods: {
        addPassword() {
            // this.$store.dispatch('activities_store/createItem', {label: this.$data.newLabel})
            //     .then(() => {
            //         this.fetchActivities();
            //         // Clear the input
            //         this.newLabel = '';
            //     })
            // // Hide the modal
            // this.hideModal();
        },
    }
}
</script>