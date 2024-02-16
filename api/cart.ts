import { CartItem } from "~/interface/shoppingCar";
import { useFetchData } from "~/composables/fetch";

interface ResGetCart {
    cartItems: any[];
}

export interface ReqCart {
    cart_item_id: number;
    quantity?: number;
}

export default () => {
    const {
        public: { apiUrl },
    } = useRuntimeConfig();
    return {
        /**
         * 取得 會員購物車
         */
        GetCartAPI() {
            return useMyFetch<ResGetCart>(`${apiUrl}/cart`, { method: "get", query: { type: "1" }, server: false });
        },
        /**
         * 加入購物車
         */
        AddToCartAPI(data: CartItem) {
            return useMyFetch(`${apiUrl}/cart/create-product`, { method: "post", body: data, server: false });
        },
        /**
         * 變更購物車
         */
        UpdateCartAPI(data: ReqCart) {
            return useMyFetch(`${apiUrl}/cart/update-product`, { method: "put", body: data, server: false });
        },
        /**
         * 購物車移除商品
         */
        DeleteCartAPI(data: ReqCart) {
            return useMyFetch(`${apiUrl}/cart/delete-product`, { method: "delete", body: data });
        },
    };
};
