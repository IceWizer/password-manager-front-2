
import { apiRequest } from "@store/axios";

export default ({
    state: {
        user: null,
    },
    mutations: {

    },
    actions: {
        register({ commit }, payload) {
            return apiRequest(
                'auth/register',
                'POST',
                null,
                payload
            )
        },
        login({ commit }, payload) {
            return apiRequest(
                'auth/login',
                'POST',
                null,
                payload
            )
        },
        verifyEmail({ commit }, payload) {
            return apiRequest(
                `auth/verify-email/${payload.token}`,
                'POST',
                null,
                null
            )
        },
        forgotPassword({ commit }, payload) {
            return apiRequest(
                `auth/forgot-password`,
                'POST',
                null,
                payload
            )
        },
        resetPassword({ commit }, payload) {
            return apiRequest(
                `auth/reset-password/${payload.token}`,
                'POST',
                null,
                { password: payload.password }
            )
        },
        logout({ commit }) {
            return apiRequest(
                'auth/logout',
                'POST',
                null,
                null
            )
        }
    },
    getters: {
        getUser(state) {
            return state.user;
        }
    },
    namespaced: true,
})
