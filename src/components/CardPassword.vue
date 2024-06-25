<template>
    <div class="collapse bg-base-200 w-96  shadow-xl">
        <input type="radio" name="accordeon-password" />
        <div class="collapse-title text-xl font-medium">{{ password.label }}</div>
        <div class="collapse-content ">
            <input class="input input-bordered input-disabled mx-2" :type="showPassword ? 'text' : 'password'"
                :value="showPassword ? password.password : 'password'">
            <div class="tooltip" data-tip="Copier" v-if="canSee">
                <button class=" mx-2" @click="copyPassword"><font-awesome-icon :icon="['fas', 'copy']" /></button>
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
                <button class="mx-2" @click="openModal"><font-awesome-icon
                        :icon="['fas', 'share-from-square']" /></button>
            </div>
        </div>
    </div>
</template>

<script>
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
        };
    },
    emits: ['open-modal'],
    methods: {
        openModal() {
            this.$emit('open-modal', this.password);
        },
        showPasswordMethod() {
            if (!!this.password.password === true) {
                this.showPassword = !this.showPassword;
            } else {
                this.$store.dispatch('passwords_store/showPassword', { id: this.password.id, encryptionKey: "1234" })
                    .then((response) => {
                        this.$props.password.password = response.data;
                        this.showPassword = !this.showPassword;
                    });
            }
        },
        copyPassword() {
            if (!!this.password.password === true) {
                navigator.clipboard.writeText(this.password.password);
            } else {
                this.$store.dispatch('passwords_store/showPassword', { id: this.password.id, encryptionKey: "1234" })
                    .then((response) => {
                        this.$props.password.password = response.data;
                        navigator.clipboard.writeText(this.password.password);
                    });
            }
        },
        edit() {
            this.$router.push({ name: 'password-create-edit', params: { id: this.password.id } });
        },
    }
}
</script>