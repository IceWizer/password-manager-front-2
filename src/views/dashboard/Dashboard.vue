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
        <div class="collapse bg-base-200 w-96  shadow-xl" v-for="password in passwords" :key="password.id ?? '0'">
            <input type="radio" name="accordeon-password" />
            <div class="collapse-title text-xl font-medium">{{ password?.label }}</div>
            <div class="collapse-content ">
                <input class="input input-bordered input-disabled mx-2" :type="showPassword ? 'text' : 'password'"
                    :value="password.password ?? 'Password'">
                <div class="tooltip" data-tip="Copier">
                    <button class=" mx-2" :onclick="() => copyPassword(password)"><font-awesome-icon
                            :icon="['fas', 'copy']" /></button>
                </div>
                <div class="tooltip" data-tip="Voir">
                    <button @click="() => showPasswordMethod(password)" size="sm" variant="outline-secondary"
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
import Password from "@/models/password";
import * as Yup from "yup";

export default {
    name: "DashboardView",
    mounted() {
        this.fetch();
    },
    components: {
        // ModalPassword
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
            passwords: [],
            showPassword: false,
        }
    },
    methods: {
        fetch() {
            this.$store.dispatch('passwords_store/fetchItems')
                .then((response: Password[]) => {
                    this.passwords = response;
                    console.log("fetchItems", response, this.passwords);
                })
        },
        copyPassword(password: Password) {
            // let encryptionKey = this.makeid(32);
            this.$store.dispatch('passwords_store/showPassword', { id: password.id, encryptionKey: "12345" })
                .then(async (response: any) => {
                    await navigator.clipboard.writeText(response.data);
                })
        },
        showPasswordMethod(password: Password) {
            this.$store.dispatch('passwords_store/showPassword', { id: password.id, encryptionKey: "12345" })
                .then((response: any) => {
                    password.password = response.data;
                    this.showPassword = !this.showPassword;
                })
        },
        // makeid(length: number) {
        //     let result = '';
        //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        //     const charactersLength = characters.length;
        //     let counter = 0;
        //     while (counter < length) {
        //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
        //         counter += 1;
        //     }
        //     return result;
        // },
        // decrypt(data: string, dynamicSalt: string) {
        //     const k = CryptoJS.enc.Base64.parse("Not24get").toString();
        //     // base64 decode
        //     const d = atob(data);
        //     console.log("decrypt", d);
        //     const iv = d.slice(0, 16);
        //     const encrypted = d.slice(16);
        //     console.log("decrypt", iv, encrypted);
        //     const key = CryptoJS.SHA256(k + dynamicSalt).toString();
        //     console.log("decrypt", k, dynamicSalt);
        //     console.log("decrypt", key);
        //     const decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv });

        //     console.log("decrypt", decrypted.toString());

        //     return decrypted;
        // }
    }
}
</script>