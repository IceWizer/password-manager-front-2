import { useCrud } from "@store/utils";
import { apiRequest } from "../axios";

const model = "passwords";

const { name, store } = useCrud(model);

store.actions.fetchItems = ({ commit }, payload) => {
    return apiRequest(
        model,
        'GET',
        null,
        payload
    )
};

store.actions.showPassword = ({ commit }, payload) => {
    return apiRequest(
        `${model}/${payload.id}/1234`,
        'GET',
        null,
        null
    )
}

export default {
    name: name,
    store: store,
}
