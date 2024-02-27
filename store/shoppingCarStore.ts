import { defineStore } from "pinia";
import { ReqCart } from "~/api/cart";
import type { CartItem, ShoppingCarInterface, ShoppingCarCustomInterface, CustomCarItem } from "~/interface/shoppingCar";
import { getShoppingCar } from "~/service/shoppingCar";
import { storeToRefs } from "pinia";
import { useUserStore } from "~/store/userStore";
import { removeStorage } from "~/service/localstorage";
import { ElMessage } from "element-plus";

export const useShoppingCarStore = defineStore("shoppingCarStore", () => {
    const { $api, $shoppingCarService, $utils } = useNuxtApp();
    const userStore = useUserStore();
    const { isAuth } = storeToRefs(userStore);

    // 購物車
    const shoppingCar: Ref<ShoppingCarInterface[]> = ref([]);

    // 設定購物車
    const setShoppingCar = (val: any) => {
        shoppingCar.value = [...val];
    };

    // 清空購物車
    const clearShoppingCar = () => {
        shoppingCar.value = [];
    };

    // 取得購物車
    const getUserShopping = async () => {
        // 登入狀態，打 api 取得購物車內容
        if (isAuth.value) {
            const { data } = await $api().GetNormalCartAPI();
            if (data) {
                shoppingCar.value = data.cartItems.map((i) => {
                    const price = i.productVariationable ? i.productVariationable.price : i.productable.price;
                    const imgSrc = i.productVariationable ? `https://yale_backed.mrjin.me/storage/${i.productVariationable.image}` : i.productable.main_image;
                    // 設置顏色名稱
                    let colorIndex = -1;
                    let colorName = undefined;
                    if (i.productVariationable) {
                        for (const [key, value] of Object.entries(i.productable.productVariations)) {
                            const item: any = value;
                            if (item.id === i.productVariationable.id) {
                                colorIndex = Number(key.replace("option-", "")) - 1;
                                colorName = i.productable.productOptions[0]?.values[colorIndex]?.name;
                                break;
                            }
                        }
                    }

                    return {
                        id: i.id,
                        productID: i.productable.id,
                        price,
                        name: i.productable.name,
                        imgSrc,
                        count: i.quantity,
                        totalPrice: Number(price) * i.quantity,
                        product_variationable_id: i.productVariationable ? i.productVariationable.id : undefined,
                        colorName,
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
        return new Promise(async (resolve, reject) => {
            const item = shoppingCar.value.find((i) => i.productID === data.productID && i.product_variationable_id === data.product_variationable_id);

            if (!item) {
                if (!isAuth.value) {
                    // 未登入時
                    shoppingCar.value.push(data);
                    $shoppingCarService().setShoppingCar(shoppingCar.value);
                    resolve(true);
                } else {
                    // 登入需打api
                    const apiReq: CartItem = {
                        productable_id: data.productID,
                        quantity: data.count,
                        product_variationable_id: data.product_variationable_id,
                    };
                    const { error } = await $api().AddToCartAPI(apiReq);
                    if (error.value) {
                        reject(error.value.data.message);
                    } else {
                        shoppingCar.value.push(data);
                        resolve(true);
                    }
                }
            }
            reject("已重複加入購物車");
        });
    };

    /**
     * 新增 訂製門扇購物車
     */
    const addToCustomCart = (data: ShoppingCarCustomInterface, count: number) => {
        return new Promise(async (resolve, reject) => {
            const setCustomCarDatas: CustomCarItem = {
                items: [],
                quantity: count,
            };
            setCustomCarDatas.items.push({
                productable_id: data.doorGroup.door.id,
                product_variationable_id: data.doorGroup.optionId,
                quantity: count,
            });
            setCustomCarDatas.items.push({
                productable_id: data.doorOut.id,
                product_variationable_id: data.doorOut.optionId,
                quantity: count,
            });
            setCustomCarDatas.items.push({
                productable_id: data.lock.id,
                quantity: count,
            });
            setCustomCarDatas.items.push({
                productable_id: data.currentTool1.id,
                quantity: count,
            });
            setCustomCarDatas.items.push({
                productable_id: data.currentTool2.id,
                quantity: count,
            });
            if (!$utils().isEmpty(data["currentOther1"])) {
                data["currentOther1"]?.datas.forEach((item: any) => {
                    setCustomCarDatas.items.push({
                        productable_id: item.id,
                        quantity: count,
                    });
                });
            }
            if (!$utils().isEmpty(data["currentOther2"])) {
                data["currentOther2"]?.datas.forEach((item: any) => {
                    setCustomCarDatas.items.push({
                        productable_id: item.id,
                        quantity: count,
                    });
                });
            }
            if (!$utils().isEmpty(data["otherServices"])) {
                data["otherServices"]?.datas.forEach((item: any) => {
                    setCustomCarDatas.items.push({
                        productable_id: item.id,
                        quantity: count,
                    });
                });
            }
            try {
                await $api().AddToCustomCarAPI(setCustomCarDatas);
                resolve(true);
            } catch (err) {
                console.log("addToCustomCarAPI 2 err => ", err);
                ElMessage({
                    type: "error",
                    message: "加入購物車失敗",
                });
                reject(false);
            }
        });
    };
    // 更新購物車
    const updateCart = (data: { cart_item_id: number | null; productID: number; quantity: number; product_variationable_id: number | null }) => {
        return new Promise(async (resolve, reject) => {
            if (!isAuth.value) {
                // 未登入狀態
                const item = shoppingCar.value.find((i) => i.productID === data.productID && data.product_variationable_id === i.product_variationable_id);
                if (item) {
                    item.count = data.quantity ? data.quantity : 1;
                    item.totalPrice = item.count * Number(item.price);
                }
                // localStorage setting
                $shoppingCarService().setShoppingCar(shoppingCar.value);
                resolve(true);
            } else if (data.cart_item_id && isAuth.value) {
                //登入狀態時
                const apiReq = {
                    cart_item_id: data.cart_item_id,
                    quantity: data.quantity,
                };
                const item = shoppingCar.value.find((i) => i.id === data.cart_item_id);
                if (item) {
                    const { error } = await $api().UpdateCartAPI(apiReq);
                    if (error.value) {
                        reject(error.value.data.message);
                    } else {
                        item.count = data.quantity ? data.quantity : 1;
                        item.totalPrice = item.count * Number(item.price);
                        resolve(true);
                    }
                }
                reject("查無此商品");
            }
        });
    };

    // 刪除購物車商品
    const deleteCart = async (data: { cart_item_id: number | null; productID: number; product_variationable_id: number | null }) => {
        if (!isAuth.value) {
            // 未登入
            shoppingCar.value = shoppingCar.value.filter((i) => {
                if (data.product_variationable_id) {
                    return i.productID !== data.productID || i.product_variationable_id !== data.product_variationable_id;
                } else {
                    return i.productID !== data.productID;
                }
            });
            $shoppingCarService().setShoppingCar(shoppingCar.value);
        } else if (isAuth.value && data.cart_item_id) {
            // 登入需打api
            const req = {
                cart_item_id: data.cart_item_id,
            };
            await $api().DeleteCartAPI(req);
        }
        getUserShopping();
    };

    // 同步購物車
    const syncCart = async () => {
        const temp = getShoppingCar();
        const data = temp
            ? temp.map((i: any) => {
                  return {
                      productable_id: i.productID,
                      // 數量
                      quantity: i.count,
                      product_variationable_id: i.product_variationable_id,
                  };
              })
            : [];

        if (data.length > 0 && isAuth.value) {
            await $api().SyncCartApi({ items: data });
            removeStorage("shoppingCarDatas");
        }
        getUserShopping();
    };

    return {
        shoppingCar,
        setShoppingCar,
        clearShoppingCar,
        getUserShopping,
        addToCart,
        addToCustomCart,
        updateCart,
        deleteCart,
        syncCart,
    };
});
