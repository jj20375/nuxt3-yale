import { CartItem } from "~/interface/shoppingCar";
import { useFetchData } from "~/composables/fetch";


interface ResGetCart {
    cartItems: any[]
}

export interface ReqCart {
    cart_item_id: number
    quantity?: number
}



export default () => {
    const {
        public: { apiUrl },
    } = useRuntimeConfig();
    return {
        /**
         * 取得 會員購物車
         */
        GetCart() {
            return useFetchData.get<ResGetCart>(`${apiUrl}/cart`, {type: '1'});
        },
        /**
         * 加入購物車
         */
        AddToCart(data: CartItem) {
            return useFetchData.post(`${apiUrl}/cart/create-product`, data);
        },
         /**
         * 變更購物車
         */
        UpdateCart(data : ReqCart) {
            return  useFetchData.put(`${apiUrl}/cart/update-product`, data);
        },
        /**
         * 購物車移除商品
         */
        DeleteCart(data: ReqCart) {
            return useFetchData.delete(`${apiUrl}/cart/delete-product`, data);
        }
    };
};
