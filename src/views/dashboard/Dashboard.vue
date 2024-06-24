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
        <CardPassword v-for="password in passwords" :key="password.id ?? '0'" :password="password"
            @open-modal="openModal" />
    </div>

    <!-- DaisyUI Modal -->
    <div v-if="selectedPassword" id="ModalShare" class="modal modal-open" role="dialog">
        <div class="modal-box">
            <button @click="closeModal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <h2 class="font-bold text-lg">Partager {{ this.selectedPassword.label }}</h2>
            <div class="text-center flex flex-col m-5">
                <div class="tooltip" data-tip="Ajouter">
                    <button class="btn btn-primary " @click="addInput"><font-awesome-icon
                            :icon="['fas', 'plus']" /></button>
                </div>
                <div v-for="(input, index) in dynamicInputs" :key="index" class="py-2">
                    <label for="emailShare" class="input input-bordered flex items-center gap-2">
                        <font-awesome-icon :icon="['fas', 'envelope']" />
                        <input v-model="input.value" id="emailShare" placeholder="Email">
                    </label>
                </div>
                <select class="select select-bordered m-5" name="" id="">
                    <option value="null">Indéfiniment</option>
                    <option value="3600">1 heure</option>
                    <option value="43200">1 jour</option>
                    <option value="302400">1 semaine</option>
                    <option value="1339200">1 mois</option>
                </select>
            </div>
            <button class="btn btn-primary">Valider</button>
        </div>
    </div>
</template>

<script lang="ts">
import Password from "@/models/password";
import * as Yup from "yup";
import CardPassword from '@/components/CardPassword.vue'
export default {
    name: "DashboardView",
    mounted() {
        this.fetch();
    },
    components: {
        CardPassword
    },
    data(): {
        item: Password,
        stateOn: {
            label: boolean,
            comment: boolean,
            password: boolean,
        },
        validators: {
            label: any,
            comment: any,
            password: any,
        },
        passwords: Password[],
        showPassword: boolean,
    } {
        return {
            item: new Password(),
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
            passwords: [
                { id: 1, label: 'Password 1' },
                { id: 2, label: 'Password 2' },
                // plus de mots de passe
            ],
            showPassword: false,
            newLabel: '',
            selectedPassword: null,
            dynamicInputs: []
        }
    },
    methods: {
        openModal(password) {
            this.selectedPassword = password;
        },
        closeModal() {
            this.selectedPassword = null;
            this.dynamicInputs = [];
        },
        addInput() {
            this.dynamicInputs.push({ value: '' });  // Ajouter un nouvel input dynamique
        }
        // addPassword() {
        // this.$store.dispatch('activities_store/createItem', {label: this.$data.newLabel})
        //     .then(() => {
        //         this.fetchActivities();
        //         // Clear the input
        //         this.newLabel = '';
        //     })
        // // Hide the modal
        // this.hideModal();
        // },
    },
}
</script>