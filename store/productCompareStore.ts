import { defineStore } from "pinia";
import type { ProductCompareInterface } from "~/interface/product";
interface State {
    productCompare: ProductCompareInterface[];
}
export const useProductCompareStore = defineStore({
    id: "productCompareStore",
    state: (): State | any => {
        return {
            compareStore: [
                {
                    attributes: {},
                    id: null,
                    main_image: "",
                    model: "",
                    name: "",
                    shape: "",
                },
                {
                    attributes: {},
                    id: null,
                    main_image: "",
                    model: "",
                    name: "",
                    shape: "",
                },
                {
                    attributes: {},
                    id: null,
                    main_image: "",
                    model: "",
                    name: "",
                    shape: "",
                },
            ],
        };
    },
    actions: {
        compareStoreReset (val: State) {
            this.compareStore = [
                {
                    attributes: {},
                    id: null,
                    main_image: "",
                    model: "",
                    name: "",
                    shape: "",
                },
                {
                    attributes: {},
                    id: null,
                    main_image: "",
                    model: "",
                    name: "",
                    shape: "",
                },
                {
                    attributes: {},
                    id: null,
                    main_image: "",
                    model: "",
                    name: "",
                    shape: "",
                },
            ]
        },
    },
    persist: {
        storage: persistedState.localStorage,
    },
});
