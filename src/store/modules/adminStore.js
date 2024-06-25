import { apiRequest } from "../axios";

export default ({
    state: {
    },
    mutations: {
    },
    actions: {
        fetchPasswords({ commit }, payload) {
            return apiRequest(
                "admin/passwords",
                "GET",
                null,
                payload
            )
        },
    },
    getters: {
    },
    namespaced: true,
})
