<template>
    <div class="flex justify-center">
        <div class="self-center my-auto">
            <h1 class="text-center text-2xl font-bold my-10">{{ !!$route.params.id === false ? "Ajouter" : "Editer" }}
                un mot de passe</h1>
            <div class="w-full mx-auto ">
                <div class=" my-5">
                    <label for="label" class="input input-bordered flex items-center gap-2">
                        <font-awesome-icon :icon="['fas', 'pen']" />
                        <input class="grow" placeholder="Label" id="label" name="label" v-model="item.label">
                    </label>
                </div>
                <div class="my-5">
                    <label for="password" class="input input-bordered flex items-center gap-2">
                        <font-awesome-icon :icon="['fas', 'key']" />
                        <input :type="showPassword ? 'text' : 'password'" placeholder="Mot de passe" name="password"
                            id="password" rules="required" class="grow" v-model="item.password"
                            autocomplete="current-password" @focus="stateOn.password = true" required />
                        <button @click="showPassword = !showPassword" size="sm" variant="outline-secondary"
                            class="text-dark rounded-end">
                            <font-awesome-icon :icon="['fas', 'eye-slash']" v-if="showPassword" />
                            <font-awesome-icon :icon="['fas', 'eye']" v-else />
                        </button>
                    </label>
                </div>
                <div class="my-5">
                    <textarea class="textarea textarea-bordered w-full" placeholder="Commentaire"
                        v-model="item.comment"></textarea>
                </div>
                <div>
                    <button class="btn btn-primary text-center" @click="save">Ajouter</button>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import * as Yup from "yup";
// import { MdEditor } from "@/components/MdEditor.vue";
import { ref } from 'vue';

const text = ref('# Hello Editor');
export default {
    name: "PasswordView",
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
        }
    },
    methods: {
        fetch() {
            if (!!this.$route.params.id === true) {
                this.$store.dispatch('passwords_store/fetchItem', { id: this.$route.params.id })
                    .then((response) => {
                        console.log("fetchItem", response);
                    })
                    .catch(() => {

                    });
            }
        },
        save() {
            if (!!this.$route.params.id === true) {
                this.$store.dispatch('passwords_store/updateItem', { ...this.item })
                    .then((response) => {
                        console.log("fetchItem", response);
                    })
                    .catch(() => {

                    });
            } else {
                this.$store.dispatch('passwords_store/createItem', { ...this.item })
                    .then((response) => {
                        console.log("fetchItem", response);
                    })
                    .catch(() => {

                    });
            }
        },
    }
}
</script>