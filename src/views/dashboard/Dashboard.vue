<template>
    <div class="flex flex-wrap gap-10 justify-center p-5">
        <div class="card w-1/5 bg-base-200 shadow-xl">
            <button class="card-body flex flex-row ">
                <div class="content-center">
                    <font-awesome-icon size="2xl" :icon="['fas', 'circle-plus']" />
                </div>
                <RouterLink to="/password">
                    <h2 class="card-title">Ajouter un mot de passe</h2>
                </RouterLink>
            </button>
        </div>
        <div class="collapse bg-base-200 w-96  shadow-xl"  v-for="password in passwords">
            <input type="radio" name="accordeon-password"/>
            <div class="collapse-title text-xl font-medium">TestMDP{{ password?.label }}</div>
            <div class="collapse-content ">
                <input class="input input-bordered input-disabled mx-2" type="password" value="Password">
                <div class="tooltip" data-tip="Copier">
                    <button class=" mx-2"><font-awesome-icon :icon="['fas', 'copy']" /></button>
                </div>
                <div class="tooltip" data-tip="Voir">
                    <button @click="showPassword = !showPassword" size="sm" variant="outline-secondary"
                        class="text-dark rounded-end mx-2">
                        <font-awesome-icon :icon="['fas', 'eye-slash']" v-if="showPassword" />
                        <font-awesome-icon :icon="['fas', 'eye']" v-else />
                    </button>
                    <div class="tooltip" data-tip="Partager">
                        <button class=" mx-2"><font-awesome-icon :icon="['fas', 'share-from-square']" /></button>
                    </div>
                </div>
            </div>
        </div>

            <!-- <button class="card w-96 bg-base-200 shadow-xl" v-for="password in passwords"
                @click="showPassword(password)">
                <div class="card-body">
                    <h2 class="card-title">{{ password?.label }}</h2>
                </div>
            </button> -->

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
            passwords: [],
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