export interface ShoppingCarInterface {
    // id
    id: number | null
    // 產品ID
    productID: number
    // 顏色
    color?: string;
    // 價格
    price: number;
    // 名稱
    name: string;
    // 圖片
    imgSrc: string;
    // 數量
    count: number;
    // 總價
    totalPrice: number
}


export interface CartItem {
    // id
    product_id: number;
    // ?
    product_variation_id?: number;
    // 數量
    quantity: number;
}
