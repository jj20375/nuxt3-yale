import { defineStore } from "pinia";
import { ReqCart } from "~/api/cart";
import type { CartItem, ShoppingCarInterface, ShoppingCarCustomInterface, CustomCarItem, ReqUpdateCustomCart, ReqDeleteCustomCart } from "~/interface/shoppingCar";
import { getShoppingCar } from "~/service/shoppingCar";
import { storeToRefs } from "pinia";
import { useUserStore } from "~/store/userStore";
import { removeStorage } from "~/service/localstorage";
import { ElMessage } from "element-plus";
/**
 * CustomProductListIdEnum: 訂製門扇 id 對應分類
 * CustomProductListOptionEnum: 訂製門扇 產品選項
 */
import { CustomProductListIdEnum, CustomProductListOptionEnum } from "@/enums/customProduct.enum";

export const useShoppingCarStore = defineStore("shoppingCarStore", () => {
    const { $api, $shoppingCarService, $utils } = useNuxtApp();
    const userStore = useUserStore();
    const { isAuth } = storeToRefs(userStore);

    // 一般購物車
    const shoppingCar: Ref<ShoppingCarInterface[]> = ref([]);
    // 訂製門扇購物車
    const shoppingCustomCar: Ref<ShoppingCarCustomInterface[]> = ref([]);

    // 設定一般商品購物車
    const setShoppingCar = (val: any) => {
        shoppingCar.value = [...val];
    };
    // 設定一般商品購物車
    const setShoppingCustomCar = (val: any) => {
        shoppingCustomCar.value = [...val];
    };

    // 清空一般商品購物車
    const clearShoppingCar = () => {
        shoppingCar.value = [];
    };
    // 清空一般商品購物車
    const clearShoppingCustomCar = () => {
        shoppingCustomCar.value = [];
    };

    // 取得購物車
    const getUserShopping = async () => {
        // 登入狀態，打 api 取得購物車內容
        if (isAuth.value) {
            const { data }: any = await $api().GetNormalCartAPI();
            if (data.value) {
                shoppingCar.value = data.value.data.cartItems.map((i) => {
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
                if (process.client) {
                    $shoppingCarService().setShoppingCar(shoppingCar.value);
                }
            }
        } else {
            // 非登入狀態，取localstorage
            const temp = getShoppingCar();
            shoppingCar.value = temp ? temp : [];
        }
    };

    /**
     * 取得訂製門扇購物車
     * @param data
     * @returns
     */
    const getUserCustomShoppingCar = async () => {
        try {
            const { data } = await $api().GetCustomCarAPI();
            if (data.value) {
                setCustomShoppingCarData(data.value.data.cartItems);
            }
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * 設定訂製門扇購物車資料
     * @param datas
     */
    const setCustomShoppingCarData = (datas: any) => {
        const arr: ShoppingCarCustomInterface[] = [];
        const result: ShoppingCarCustomInterface = {};
        datas.forEach((item: any) => {
            const service: any = [];
            item.cartItems.forEach((item2: any, index: number) => {
                // 判斷是 門扇 的時候執行
                if (item2.productable.customProductType.id === CustomProductListIdEnum.door) {
                    const door = setDoorData(item2.productable, item2.productVariationable.values, item2.productVariationable.stock);
                    result["doorGroup"] = {
                        label: "門扇",
                        door: { ...door.result, color: door.color },
                        size: door.size,
                    };
                    result.imgSrc = door.result.imgSrc;
                }
                // 判斷是 門框 的時候執行
                if (item2.productable.customProductType.id === CustomProductListIdEnum.doorOut) {
                    const door = setDoorData(item2.productable, item2.productVariationable.values, item2.productVariationable.stock);
                    result["doorOut"] = {
                        label: "門框",
                        color: door.color,
                        ...door.result,
                    };
                }
                // 判斷是 電子鎖 的時候執行
                if (item2.productable.customProductType.id === CustomProductListIdEnum.lock) {
                    const data = setLocksData(item2.productable);
                    result["lock"] = {
                        label: "門鎖",
                        ...data,
                    };
                }
                // 判斷是 水平把手 的時候執行
                if (item2.productable.customProductType.id === CustomProductListIdEnum.handle) {
                    const data = setLocksData(item2.productable);
                    result["lock"] = {
                        label: "門鎖",
                        ...data,
                    };
                }
                // 判斷是 掛門 的時候執行
                if (item2.productable.customProductType.id === CustomProductListIdEnum.tool1) {
                    const data = setToolData(item2.productable);
                    result["currentTool1"] = {
                        label: "掛門",
                        ...data,
                    };
                }
                // 判斷是 氣密條 的時候執行
                if (item2.productable.customProductType.id === CustomProductListIdEnum.tool2) {
                    const data = setToolData(item2.productable);
                    result["currentTool2"] = {
                        label: "氣密條",
                        ...data,
                    };
                }
                // 判斷是 下將壓條 的時候執行
                if (item2.productable.customProductType.id === CustomProductListIdEnum.other1) {
                    const data = setToolData(item2.productable);
                    result["currentOther1"] = {
                        label: "下將壓條",
                        datas: [data],
                    };
                }
                // 判斷是 門弓器 的時候執行
                if (item2.productable.customProductType.id === CustomProductListIdEnum.other2) {
                    const data = setToolData(item2.productable);
                    result["currentOther2"] = {
                        label: "門弓器",
                        datas: [data],
                    };
                }
                // 判斷是 施作服務 的時候執行
                if (item2.productable.customProductType.id === CustomProductListIdEnum.service) {
                    const data = setServiceData(item2.productable);
                    service.push(data);
                    result["otherServices"] = {
                        label: "額外施作服務",
                    };
                }
            });
            if (result["otherServices"]) {
                result["otherServices"].datas = service;
            }

            // 門扇數量
            const doorStock = result.doorGroup.door.doorLimit;
            // 門框數量
            const doorOutStock = result.doorOut.doorLimit;
            // 鎖數量
            const lockStock = result.lock.stock;
            // 掛門數量
            const currentTool1Stock = result.currentTool1.stock;
            // 氣密條數量
            const currentTool2Stock = result.currentTool2.stock;
            let currentOther1 = 0;
            if (result.currentOther1) {
                // 下將壓條 數量
                currentOther1 = result.currentOther1.stock;
            }
            let currentOther2 = 0;
            if (result.currentOther2) {
                // 門弓器 數量
                currentOther2 = result.currentOther2.stock;
            }
            // 取的所有商品中最低數量商品
            const stocks = _Min([doorStock, doorOutStock, lockStock, currentTool1Stock, currentTool2Stock, currentOther1, currentOther2]);
            arr.push({
                id: item.id,
                count: item.quantity,
                singlePrice: Number(item.price),
                price: Number(item.price),
                totalPrice: Number(item.price) * item.quantity,
                doorLimit: stocks,
                ...result,
                name: result.doorGroup.door.title,
            });
        });
        $shoppingCarService().setCustomProductShoppingCar(arr);
        setShoppingCustomCar(arr);
    };

    /**
     * 門扇整理資料
     * @param { type Object(物件) } datas 購物車資料
     * @param { type Array(陣列) } options 型號選項
     * @param { type Number(數字) } productLimit 庫存數量限制
     */
    function setDoorData(datas: any, options: any, productLimit: number) {
        let result: any = {};
        // 預覽圖
        const previewImgSrc = {};
        // 庫存
        const stock = {};
        // 價格
        const price = {};
        // 訂製門扇加入購物車時需要
        const optionId = {};
        for (const key of Object.keys(datas.customProductVariations)) {
            previewImgSrc[key] = {
                front: datas.customProductVariations[key].front_image,
                backend: datas.customProductVariations[key].back_image,
                half: datas.customProductVariations[key].half_image,
            };
            stock[key] = datas.customProductVariations[key].stock;
            price[key] = Number(datas.customProductVariations[key].price);
            // 訂製門扇加入購物車時需要
            optionId[key] = datas.customProductVariations[key].id;
        }
        // 判斷是否有尺寸值
        const haveSize = datas.customProductOptions.find((option: any) => option.id === CustomProductListOptionEnum.size);
        //  判斷是否有尺寸值 沒有值給空陣列
        const sizes = haveSize !== undefined ? haveSize.values : [];
        result = {
            id: datas.id,
            style: datas.model,
            title: datas.name,
            name: `${datas.brand}`,
            imgSrc: datas.main_image,
            colors: datas.customProductOptions
                .find((option: any) => option.id === CustomProductListOptionEnum.color)
                .values.map((color: any) => ({
                    id: color.id,
                    text: color.name,
                    imgSrc: color.icon,
                })),
            sizes,
            previewImgSrc,
            stock,
            doorLimit: productLimit,
            price,
            optionId,
            detailData: {
                carousel: datas.carousel_images.map((item: string, index: number) => ({ id: index + 1, imgSrc: item })),
                content: datas.content,
            },
        };

        const colorId = options.find((option: any) => option.custom_product_option_id === CustomProductListOptionEnum.color);
        let color = {};
        if (colorId !== undefined) {
            color = datas.customProductOptions
                .find((option: any) => option.id === CustomProductListOptionEnum.color)
                .values.map((color: any) => ({
                    id: color.id,
                    text: color.name,
                    imgSrc: color.icon,
                }))
                .find((item: any) => item.id === colorId.custom_product_option_value_id);
        }

        const sizeId = options.find((option: any) => option.custom_product_option_id === CustomProductListOptionEnum.size);
        let size = {};
        if (sizeId !== undefined && haveSize.values.find((item: any) => item.id === sizeId.custom_product_option_value_id) !== undefined) {
            size = { label: "尺寸", ...haveSize.values.find((item: any) => item.id === sizeId.custom_product_option_value_id) };
        }

        if (!$utils().isEmpty(size)) {
            return { result, color, size };
        }
        return { result, color };
    }

    /**
     * 設定鎖資料
     * @param data
     */
    function setLocksData(data: any) {
        const result = {
            imgSrc: data.main_image,
            style: `${data.model}`,
            model: data.model,
            title: data.name,
            name: `${data.name}`,
            shape: data.shape,
            stock: data.stock,
            price: Number(data.price),
            id: data.id,
            detailData: {
                carousel: data.carousel_images.map((item: string, index: number) => ({ id: index + 1, imgSrc: item })),
                content: data.content,
            },
            imgSrc: data.main_image,
            previewImgSrc: {
                front: data.front_image,
                backend: data.back_image,
                half: data.half_image,
            },
        };
        return result;
    }

    /**
     * 設定必選五金與選配資料
     */
    function setToolData(data: any) {
        const result = {
            id: data.id,
            style: data.model,
            title: data.name,
            name: data.brand,
            imgSrc: data.main_image,
            stock: data.stock,
            price: Number(data.price),
            detailData: {
                carousel: data.carousel_images.map((item: string, index: number) => ({ id: index + 1, imgSrc: item })),
                content: data.content,
            },
        };
        return result;
    }

    /**
     * 設定施作服務資料
     */
    function setServiceData(data: any) {
        const result = {
            id: data.id,
            name: data.name,
            imgSrc: data.main_image,
            stock: data.stock,
            price: Number(data.price),
            detailData: {
                carousel: data.carousel_images.map((item: string, index: number) => ({ id: index + 1, imgSrc: item })),
                content: data.content,
            },
        };
        return result;
    }

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
                    console.log("addtocar data =>", data);
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
                await getUserCustomShoppingCar();
                resolve(true);
            } catch (err) {
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

    /**
     * 更新 訂製門扇購物車商品數量
     * @param data
     * @returns
     */
    const updateCustomCart = async (data: ReqUpdateCustomCart, ReqDeleteCustomCart) => {
        try {
            const { error } = await $api().UpdateCustomCartAPI(data);
            if (error.value) {
                return error.value.data.message;
            } else {
                return true;
            }
        } catch (err) {
            return "更新訂製門扇購物車數量失敗";
        }
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

    /**
     * 刪除 訂製門扇購物車商品
     */
    const deleteCustomCart = async (data: ReqDeleteCustomCart) => {
        try {
            const { error } = await $api().DeleteCustomCartAPI(data);
            if (error.value) {
                return error.value.data.message;
            } else {
                return true;
            }
        } catch (err) {
            return "刪除訂製門扇購物車失敗";
        }
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
            $shoppingCarService().removeShoppingCar();
        }
        getUserShopping();
    };

    /**
     * 同步訂製門扇購物車
     */
    const syncCustomCart = async () => {
        const shoppinCar = $shoppingCarService().getCustomProductShoppingCar();
        if (!$utils().isEmpty(shoppinCar)) {
            shoppinCar.forEach(async (item: ShoppingCarCustomInterface) => {
                await addToCustomCart(item, item.count);
            });
        }
    };

    return {
        shoppingCar,
        shoppingCustomCar,
        setShoppingCar,
        setShoppingCustomCar,
        clearShoppingCar,
        clearShoppingCustomCar,
        getUserShopping,
        getUserCustomShoppingCar,
        addToCart,
        addToCustomCart,
        updateCart,
        updateCustomCart,
        deleteCart,
        deleteCustomCart,
        syncCart,
        syncCustomCart,
    };
});
