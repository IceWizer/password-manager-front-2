import { useCrud } from "@/store/utils";
import { apiRequest } from "../axios";

const model = "shares";

const { name, store } = useCrud(model);

store.actions.createItems = (context: any, payload: any): Promise<unknown> => {
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
