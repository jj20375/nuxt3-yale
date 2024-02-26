import { defineStore } from "pinia";
import { ReqCart } from "~/api/cart";
import type { CartItem, ShoppingCarInterface } from "~/interface/shoppingCar";
import { getShoppingCar } from "~/service/shoppingCar";
import { storeToRefs } from "pinia";
import { useUserStore } from "~/store/userStore";

export const useShoppingCarStore = defineStore("shoppingCarStore", () => {
    const { $api, $shoppingCarService } = useNuxtApp();
    const userStore = useUserStore();
    const { isAuth } = storeToRefs(userStore);

    // 購物車
    const shoppingCar: Ref<ShoppingCarInterface[]> = ref([]);

    // 設定購物車
    const setShoppingCar = (val: any) => {
        shoppingCar.value = [...val];
    };

    // 取得購物車
    const getUserShopping = async () => {
        // 登入狀態，打 api 取得購物車內容
        if (isAuth.value) {
            const { data } = await $api().GetNormalCartAPI();
            if (data) {
                shoppingCar.value = data.cartItems.map((i) => {
                    return {
                        id: i.id,
                        productID: i.productable.id,
                        price: i.productable.price,
                        name: i.productable.name,
                        imgSrc: i.productable.main_image,
                        count: i.quantity,
                        totalPrice: Number(i.productable.price) * i.quantity,
                    };
                });
                $shoppingCarService().setShoppingCar(shoppingCar.value);
            }
        } else {
            // 非登入狀態，取localstorage
            const temp = getShoppingCar();
            shoppingCar.value = temp ? temp : [];
        }
    };

    // 加入購物車
    const addToCart = (data: ShoppingCarInterface) => {
        const apiReq: CartItem = {
            productable_id: data.productID,
            quantity: data.count,
        };
        // 登入需打api
        const item = shoppingCar.value.find((i) => i.productID === data.productID);
        if (!item) {
            shoppingCar.value.push(data);
            if (isAuth.value) {
                $api().AddToCartAPI(apiReq);
            }
        }
        // localStorage setting
        $shoppingCarService().setShoppingCar(shoppingCar.value);
    };

    // 更新購物車
    const updateCart = (data: ReqCart) => {
        const apiReq = {
            cart_item_id: data.cart_item_id,
            quantity: data.quantity,
        };
        // 登入需打api
        const item = shoppingCar.value.find((i) => i.id === data.cart_item_id);
        if (item) {
            item.count = data.quantity ? data.quantity : 1;
            item.totalPrice = item.count * Number(item.price);
            if (isAuth.value) {
                $api().UpdateCartAPI(apiReq);
            }
        }
        // localStorage setting
        $shoppingCarService().setShoppingCar(shoppingCar.value);
    };

    // 刪除購物車商品
    const deleteCart = async (data: ReqCart) => {
        // 登入需打api
        if (isAuth.value) {
            await $api().DeleteCartAPI(data);
            getUserShopping();
        }
        // 尚需改成 product_id
        shoppingCar.value = shoppingCar.value.filter((i) => i.id !== data.cart_item_id);
        $shoppingCarService().setShoppingCar(shoppingCar.value);
    };

    return {
        shoppingCar,
        setShoppingCar,
        getUserShopping,
        addToCart,
        updateCart,
        deleteCart,
    };
});
