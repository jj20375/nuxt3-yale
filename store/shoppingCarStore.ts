import { defineStore } from "pinia";
import type { ShoppingCarInterface } from "~/interface/shoppingCar";
interface State {
    shoppingCar: ShoppingCarInterface[];
}
export const useShoppingCarStore = defineStore({
    id: "shoppingCarStore",
    state: (): State | any => {
        return {
            shoppingCar: [],
        };
    },
    actions: {
        // 設定購物車
        setShoppingCar(val: any) {
            this.shoppingCar = val;
        },
    },
});
