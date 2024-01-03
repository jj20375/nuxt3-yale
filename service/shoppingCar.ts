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
