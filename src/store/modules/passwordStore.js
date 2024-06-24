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

export default {
    name: name,
    store: store,
}
