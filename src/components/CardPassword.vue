<template>
    <div class="collapse bg-base-200 shadow-xl">
        <input type="radio" name="accordeon-password" />
        <div class="collapse-title text-xl font-medium">{{ localPassword?.label ?? "" }}</div>
        <div class="collapse-content">
            <div class="flex">

                <input class="input input-bordered input-disabled mx-2" :type="showPassword === true ? 'text' : 'password'"
                    :value="showPassword === true ? (localPassword?.password ?? '') : 'password'">
                <div class="grid grid-cols-5  my-auto">
                    <div class="tooltip" data-tip="Copier" v-if="canSee">
                        <button class=" mx-2" @click="copyPassword"><font-awesome-icon
                                :icon="['fas', 'copy']" /></button>
                    </div>
                    <div class="tooltip" data-tip="Voir" v-if="canSee">
                        <button @click="showPasswordMethod" size="sm" variant="outline-secondary"
                            class="text-dark rounded-end mx-2">
                            <font-awesome-icon :icon="['fas', 'eye-slash']" v-if="showPassword" />
                            <font-awesome-icon :icon="['fas', 'eye']" v-else />
                        </button>
                    </div>
                    <div class="tooltip" data-tip="Modifier" v-if="canEdit">
                        <button class="mx-2"><font-awesome-icon :icon="['fas', 'edit']" @click="edit" /></button>
                    </div>
                    <div class="tooltip" data-tip="Partager" v-if="canEdit">
                        <button class="mx-2" @click="openModal">
                            <font-awesome-icon :icon="['fas', 'share-from-square']" /></button>
                    </div>
                    <div class="tooltip" data-tip="Supprimer" v-if="canEdit">
                        <button class="mx-2" @click="deletePassword">
                            <font-awesome-icon :icon="['fas', 'trash']" />
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="localPassword?.comment" class="my-2">
                <p>{{ localPassword.comment }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Password from '@/models/password';

export default {
    name: "CardPassword",
    props: {
        password: Password,
        canEdit: {
            type: Boolean,
            default: true
        },
        canSee: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            showPassword: false,
            localPassword: this.password,
        };
    },
    emits: ['open-modal', 'fetch'],
    methods: {
        openModal() {
            this.$emit('open-modal', this.password);
        },
        showPasswordMethod() {
            if (this.password !== undefined && this.localPassword?.password !== null && this.localPassword?.password !== undefined && this.localPassword?.password !== "") {
                this.showPassword = !this.showPassword;
            } else {
                this.$store.dispatch('passwords_store/showPassword', { id: this.localPassword?.id, encryptionKey: "1234" })
                    .then((response: any) => {
                        if (this.password === undefined) {
                            this.localPassword = new Password();
                            this.localPassword.password = response.data ?? "";
                        } else {
                            this.localPassword = { ...this.password, password: response.data ?? "" };
                        }
                        this.showPassword = !this.showPassword;
                    });
            }
        },
        copyPassword() {
            if (this.password !== undefined && this.localPassword?.password !== null && this.localPassword?.password !== undefined && this.localPassword?.password !== "") {
                navigator.clipboard.writeText(this.localPassword.password);
            } else {
                this.$store.dispatch('passwords_store/showPassword', { id: this.localPassword?.id, encryptionKey: "1234" })
                    .then((response: any) => {
                        if (this.password === undefined) {
                            this.localPassword = new Password();
                            this.localPassword.password = response.data ?? "";
                        } else {
                            this.localPassword = { ...this.password, password: response.data ?? "" };
                        }
                        navigator.clipboard.writeText(this.localPassword.password ?? "");
                    });
            }
        },
        edit() {
            this.$router.push({ name: 'password-create-edit', params: { id: this.localPassword?.id } });
        },
        deletePassword() {
            this.$store.dispatch('passwords_store/deleteItem', { id: this.localPassword?.id })
                .then(() => {
                    this.$emit('fetch');
                });
        }
    }
}
</script>