<template>
    <div class="flex justify-center ">
        <div class="self-center my-auto">
            <h1 class="text-center text-2xl">Connexion</h1>
            <div class="w-full mx-auto">
                <div class="my-5">
                    <label class="input input-bordered flex items-center gap-2" for="username">
                        <font-awesome-icon :icon="['fas', 'user']" />
                        <input class="grow" type="text" placeholder="Nom" name="username" id="username"
                            v-model="item.username"
                            :state="stateOn.username ? validators.username.isValidSync(item.username) : null"
                            autocomplete="username" @focus="stateOn.username = true" />
                    </label>
                    <p v-if="stateOn.username && !validators.username.isValidSync(item.username)">
                        {{ getErrorMessage(validators.username, item.username) }}
                    </p>
                </div>
                <div class="my-5">
                    <label for="password" class="input input-bordered flex items-center gap-2">
                        <font-awesome-icon :icon="['fas', 'key']" />
                        <input :type="showPassword ? 'text' : 'password'" placeholder="Mot de passe" name="password"
                            id="password" rules="required" class="grow" v-model="item.password"
                            :state="stateOn.password ? validators.password.isValidSync(item.password) : null"
                            autocomplete="current-password" @focus="stateOn.password = true" />
                        <button @click="showPassword = !showPassword" size="sm" variant="outline-secondary"
                            class="text-dark rounded-end">
                            <font-awesome-icon :icon="['fas', 'eye-slash']" v-if="showPassword" />
                            <font-awesome-icon :icon="['fas', 'eye']"v-else  />
                        </button>
                    </label>

                    <p>
                        {{ getErrorMessage(validators.password, item.password) }}
                    </p>
                </div>
            </div>
            <div class="my-5 mx-auto text-center">
                <button class="btn btn-primary" type="submit" @click="loginCheck()">Connexion</button>
            </div>
            <div class="text-bg-danger my-5 text-center rounded p-1" v-if="dataSent">
                L'identifiant ou le mot de passe est incorrect
            </div>
            <div class="text-center mt-1">
                <p>
                    Tu n'as pas de compte ?
                    <router-link to="register"> Créer un compte </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import connection from "@/auth/utils/connection";
import * as Yup from "yup";

export default {
    name: "Log-in",
    data() {
        return {
            item: {
                username: '',
                password: ''
            },
            stateOn: {
                username: false,
                password: false,
            },
            validators: {
                username: Yup.string().min(3, 'Username doit contenir au minimum 3 caractères').required('Le champ username est obligatoire'),
                password: Yup.string().required('Le champ password est obligatoire'),
            },

            showPassword: false,
            dataSent: false,
        }
    },
    setup() {
        return {
            Yup,
        }
    },
    methods: {
        loginCheck() {
            let canSend = true;
            for (const [key, value] of Object.entries(this.item)) {
                if (!this.stateOn[key] || this.getErrorMessage(this.validators[key], value) !== null) {
                    canSend = false;
                }
            }

            if (canSend)
                this.sendLogin();
            else
                this.dataSent = true;
        },
        sendLogin() {
            this.$store.dispatch('auth_store/login', this.item)
                .then((response) => {
                    console.log()
                    connection.login(response.token);
                    this.$router.push({ name: 'dashboard' });
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    this.dataSent = true;
                });
        },
        getErrorMessage(validator, itemToValidate) {
            try {
                validator.validateSync(itemToValidate);
                return null;
            } catch (err) {
                return err.message;
            }
        }
    }
}
</script>

<style scoped></style>
