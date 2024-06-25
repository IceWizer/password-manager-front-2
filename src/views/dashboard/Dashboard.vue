<template>
    <div class="flex text-center flex-wrap gap-10 justify-center p-5 ">
        <button class="btn btn-primary">
            <div class="content-center text-center">
                <font-awesome-icon size="lg" :icon="['fas', 'circle-plus']" />
            </div>
            <RouterLink to="/password">
                <h2>Ajouter</h2>
            </RouterLink>
        </button>
    </div>
    <h1 v-if="passwords" class="text-center text-2xl font-bold mt-10 mb-5">Mes mots de passe</h1>
    <div class="grid grid-cols-3 gap-10 justify-center p-5">
        <CardPassword v-for="password in passwords" :key="password.id ?? '0'" :password="password"
            @open-modal="() => { openModal(password) }" @fetch="fetch" />
    </div>
    <h1 v-if="sharedPasswords" class="text-center text-2xl font-bold mt-10 mb-5">Mots de passe partagés</h1>
    <div class="grid grid-cols-3 gap-10 justify-center p-5">
        <CardPassword v-for="password in sharedPasswords" :key="password.id ?? '0'" :password="password"
            @open-modal="() => { openModal(password) }" :canEdit="false" />
    </div>

    <!-- DaisyUI Modal -->
    <div v-if="selectedPassword" id="ModalShare" class="modal modal-open" role="dialog">
        <div class="modal-box">
            <button @click="closeModal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <h2 class="font-bold text-lg">Partager {{ selectedPassword.label }}</h2>
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
                <select class="select select-bordered m-5" v-model="expiration">
                    <option value="null">Indéfiniment</option>
                    <option value="3600">1 heure</option>
                    <option value="43200">1 jour</option>
                    <option value="302400">1 semaine</option>
                    <option value="1339200">1 mois</option>
                </select>
            </div>
            <button class="btn btn-primary" @click="sharePassword">Valider</button>
        </div>
    </div>
</template>

<script lang="ts">
import CardPassword from '@/components/CardPassword.vue';
import Password from "@/models/password";
import * as Yup from "yup";
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
        sharedPasswords: Password[],
        showPassword: boolean,
        selectedPassword: Password | null,
        dynamicInputs: any[],
        expiration: number | null,
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
            passwords: [],
            sharedPasswords: [],
            showPassword: false,
            selectedPassword: null,
            dynamicInputs: [],
            expiration: null,
        }
    },
    methods: {
        fetch() {
            this.$store.dispatch('passwords_store/fetchItems')
                .then((response: Password[]) => {
                    this.passwords = response;
                });
            this.$store.dispatch('passwords_store/fetchSharedItems')
                .then((response: Password[]) => {
                    this.sharedPasswords = response;
                });
        },
        openModal(password: Password) {
            this.selectedPassword = password;
        },
        closeModal() {
            this.selectedPassword = null;
            this.dynamicInputs = [];
        },
        addInput() {
            this.dynamicInputs.push({ value: '' });  // Ajouter un nouvel input dynamique
        },
        sharePassword() {
            this.$store.dispatch('shares_store/createItems', { password: this.selectedPassword.id, emails: this.dynamicInputs, expiration: this.expiration })
                .then(() => {
                    this.closeModal();
                });
        }
    },
}
</script>