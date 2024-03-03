import { CartItem, ReqUpdateCustomCart, ReqDeleteCustomCart, ReqMeasuring } from "~/interface/shoppingCar";

interface ResGetCart {
    cartItems: any[];
}

export interface ReqCart {
    cart_item_id: number;
    quantity?: number;
}

export interface ReqCheckout {
    type: string; // normal
    member_phone?: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    contact_zip3: string;
    contact_city: string;
    contact_district: string;
    contact_address: string;
    remark: string;
    payment_gateway: string;
    shipping_method: string;
    invoice_type: string;
    carrier_code?: string;
    donation_code?: string;
    tax_number?: string;
    cart_item_id: number[];
}

/**
 * 新增訂製門扇購物車 api 參數
 */
export interface ReqCustomCar {
    // 訂製門扇商品
    items: {
        // 產品 id
        productable_id: number;
        // 型號 id
        product_variationable_id?: number;
        // 數量
        quantity: number;
    }[];
    // 數量
    quantity: number;
}

export default () => {
    const {
        public: { apiUrl },
    } = useRuntimeConfig();
    return {
        /**
         * 取得 一般商品會員購物車
         */
        GetNormalCartAPI() {
            return useMyFetch<ResGetCart>(`${apiUrl}/cart`, { method: "get", params: { type: "normal" } });
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
        /**
         * 取得 訂製門扇購物車資料
         */
        GetCustomCarAPI() {
            return useMyFetch<ResGetCart>(`${apiUrl}/cart`, { method: "get", params: { type: "combination" } });
        },
        /**
         * 新增 訂製門扇購物車資料
         */
        AddToCustomCarAPI(data: ReqCustomCar) {
            return useMyFetch(`${apiUrl}/cart/create-combination`, { method: "post", body: data });
        },
        /**
         * 變更 訂製門扇購物車資料
         */
        UpdateCustomCartAPI(data: ReqUpdateCustomCart) {
            return useMyFetch(`${apiUrl}/cart/update-combination`, { method: "put", body: data, server: false });
        },
        /**
         * 刪除 訂製門扇購物車資料
         */
        DeleteCustomCartAPI(data: ReqDeleteCustomCart) {
            return useMyFetch(`${apiUrl}/cart/delete-combination`, { method: "delete", body: data });
        },
        /*
         * 取得據點列表(分頁)
         */
        GetShippingMethodApi() {
            return useMyFetch(`${apiUrl}/shipping-method`, {
                method: "get",
            });
        },
        /**
         * 購物車結帳
         */
        CheckOutApi(data: ReqCheckout) {
            return useMyFetch(`${apiUrl}/cart/checkout`, {
                method: "post",
                body: data,
            });
        },
        /**
         * 同步購物車
         */
        SyncCartApi(data: { items: CartItem[] }) {
            return useMyFetch(`${apiUrl}/cart/sync-product`, {
                method: "post",
                body: data,
            });
        },

        /**
         * 取得丈量時間範圍
         */
        GetMeasuringTimeAPI(data: ReqMeasuring) {
            return useMyFetch(`${apiUrl}/measuring/available-dates`, { method: "get", params: data });
        },

        /**
         * 取得線下付款門市
         */
        GetOfflinePaymentStoresAPI() {
            return useMyFetch(`${apiUrl}/stronghold/offline-payment`, { method: "get" });
        },
    };
};
