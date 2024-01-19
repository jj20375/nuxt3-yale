import { defineStore } from "pinia";
import type { ProductCompareInterface } from "~/interface/product";
interface State {
    productCompare: ProductCompareInterface[];
}
export const useProductCompareStore = defineStore({
    id: "productCompareStore",
    state: (): State | any => {
        return {
            compareStore: [],
        };
    },
    actions: {

    },
    persist: {
        storage: persistedState.localStorage,
    },
});
