import { CartItem } from "~/interface/shoppingCar";
import { useFetchData } from "~/composables/fetch";


interface ResGetCart {
    cartItems: any[]
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
            return useFetchData.get<ResGetCart>(`${apiUrl}/cart`);
        },
        /**
         * 加入購物車
         */
        AddToCart(data: CartItem) {
            return useMyFetch(`${apiUrl}/cart/create-product`, {
                method: "post",
                body: data,
            });
        },
        UpdateCart(data : {cart_item_id: number, quantity : number}) {
            return useMyFetch(`${apiUrl}/cart/update-product`, {
                method: "post",
                body: data,
            });
        }
    };
};
