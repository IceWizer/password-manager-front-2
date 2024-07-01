import { useCrud } from "@/store/utils";
import { apiRequest } from "../axios";

const model = "passwords";

const { name, store } = useCrud(model);

store.actions.fetchItems = ({ commit }: any, payload: any) => {
    return apiRequest(
        model,
        'GET',
        null,
        payload
    )
};

store.actions.fetchSharedItems = ({ commit }: any, payload: any) => {
    return apiRequest(
        `${model}/shared`,
        'GET',
        null,
        payload
    )
};
store.actions.fetchItems = ({ commit }: any, payload: any) => {
    return apiRequest(
        model,
        'GET',
        null,
        payload
    )
};

store.actions.showPassword = ({ commit }: any, payload: any) => {
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
