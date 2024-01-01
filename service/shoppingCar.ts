import { setStorage, getStorage, removeStorage } from "~/service/localstorage";

/**
 * 新增至購物車
 * @param  { type Object(物件) } data 商品資料
 */
export function addToShoppingCar(data: any) {
    const shoppingCarDatas = getStorage("shoppingCarDatas");
    shoppingCarDatas.push(data);
    setStorage("shoppingCarDatas", shoppingCarDatas);
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
