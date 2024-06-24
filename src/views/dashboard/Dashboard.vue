<template>
    <div class="flex flex-wrap gap-10 justify-center p-5">
        <button class="card w-96 bg-base-200 shadow-xl" v-for="password in passwords" @click="showPassword(password)"
            :key="password.id">
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
        showPassword(password: Password) {
            this.item = password;
        }
    }
}
</script>