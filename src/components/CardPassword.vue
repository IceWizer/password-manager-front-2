<template>
    <div class="collapse bg-base-200 w-96  shadow-xl">
        <input type="radio" name="accordeon-password" />
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
            </div>
            <div class="tooltip" data-tip="Partager">
                <button class="mx-2" @click="openModal" ><font-awesome-icon
                        :icon="['fas', 'share-from-square']" /></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardPassword",
    props: ['password'],
    data() {
        return {
            showPassword: false
        }
    },
    methods: {
        openModal() {
            this.$emit('open-modal', this.password);
        }
    }
}
</script>