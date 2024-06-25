import { useCrud } from "@store/utils";
import { apiRequest } from "../axios";

const model = "shares";

const { name, store } = useCrud(model);

store.actions.createItems = async (context, payload) => {
    return apiRequest(
        `${model}/create-items`,
        "POST",
        null,
        payload
    );
}


export default {
    name: name,
    store: store,
}
