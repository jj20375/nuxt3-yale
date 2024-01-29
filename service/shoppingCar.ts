import { setStorage, getStorage, removeStorage } from "~/service/localstorage";
import type { ShoppingCarInterface } from "~/interface/shoppingCar";
/**
 * 取得購物車商品
 * @param  { type Object(物件) } data 商品資料
 */
export function getShoppingCar(data: any) {
    const shoppingCarDatas = getStorage("shoppingCarDatas");
    return shoppingCarDatas;
}

/**
 * 設定購物車資料
 */
export function setShoppingCar(datas: ShoppingCarInterface[]) {
    setStorage("shoppingCarDatas", datas);
}

/**
 * 新增至購物車
 * @param  { type Object(物件) } data 商品資料
 */
export function addToShoppingCar(data: ShoppingCarInterface) {
    let shoppingCarDatas = getStorage("shoppingCarDatas");
    if (shoppingCarDatas === null) {
        shoppingCarDatas = [];
    }
    shoppingCarDatas.push(data);
    setStorage("shoppingCarDatas", _UniqBy(shoppingCarDatas, "id"));
}

/**
 * 移除購物車單一商品
 * @param { type Number(數字) } index
 */
export function removeSingleShoppingCarProduct(index: number) {
    const shoppingCarDatas = getStorage("shoppingCarDatas");
    shoppingCarDatas.splice(index, 1);
    setStorage("shoppingCarDatas", shoppingCarDatas);
}

/**
 * 刪除所有購物車資料
 */
export function removeShoppingCar() {
    removeStorage("shoppingCarDatas");
}

/**
 * 取得購物車商品
 * @param  { type Object(物件) } data 商品資料
 */
export function getCustomProductShoppingCar(data: any) {
    const shoppingCarDatas = getStorage("shoppingCarCustomProductDatas");
    return shoppingCarDatas;
}

/**
 * 設定 訂製門扇購物車資料
 */
export function setCustomProductShoppingCar(datas: any) {
    setStorage("shoppingCarCustomProductDatas", datas);
}

/**
 * 新增至 訂製門扇 購物車
 * @param  { type Object(物件) } data 商品資料
 */
export function addCustomProductToShoppingCar(data: any) {
    let shoppingCarDatas = getStorage("shoppingCarCustomProductDatas");
    if (shoppingCarDatas === null) {
        shoppingCarDatas = [];
    }
    shoppingCarDatas.push(data);
    setStorage("shoppingCarCustomProductDatas", shoppingCarDatas);
}

/**
 * 移除購物車 訂製門扇 單一商品
 * @param { type Number(數字) } index
 */
export function removeCustomProductSingleShoppingCarProduct(index: number) {
    const shoppingCarDatas = getStorage("shoppingCarCustomProductDatas");
    shoppingCarDatas.splice(index, 1);
    setStorage("shoppingCarCustomProductDatas", shoppingCarDatas);
}

/**
 * 刪除所有 訂製門扇 購物車資料
 */
export function removeCustomProductShoppingCar() {
    removeStorage("shoppingCarCustomProductDatas");
}
