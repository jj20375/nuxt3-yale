export interface ShoppingCarInterface {
    // id
    id: number | null;
    // 產品ID
    productID: number;
    // 顏色名稱
    colorName?: string;
    // 顏色
    product_variationable_id?: number;
    // 價格
    price: number;
    // 名稱
    name: string;
    // 圖片
    imgSrc: string;
    // 數量
    count: number;
    // 總價
    totalPrice: number;
    // 庫存
    stock: number;
    // 選項
    productVariationable: number;
}

/**
 * 訂製門扇購物車
 */
export interface ShoppingCarCustomInterface {
    id: string | number;
    // 數量
    count: number;
    // 價格
    price?: number;
    // 總價
    totalPrice: number;
    // 單一數量價格
    singlePrice?: number;
    // 場景名稱
    name: string;
    // 圖片
    imgSrc: string;
    // 門扇資料
    doorGroup: {
        // 尺寸
        size: {
            label: string;
            [key: string]: any;
        };
        // 門扇
        door: {
            label: string;
            [key: string]: any;
        };
        // 關聯 型號 id
        optionId?: number;
    };
    // 門框資料
    doorOut: {
        label: string;
        [key: string]: any;
        // 顏色
        color: any;
    };
    // 門鎖或門把
    lock: {
        label: string;
        [key: string]: any;
    };
    // 掛門
    currentTool1: {
        label: string;
        [key: string]: any;
    };
    // 氣密條
    currentTool2: {
        label: string;
        [key: string]: any;
    };
    // 基本五金 下將壓條
    currentOther1?: {
        label: string;
        datas: any[];
    };
    // 基本五金 門弓器
    currentOther2?: {
        label: string;
        datas: any[];
    };
    // 施作服務
    otherServices?: {
        label: string;
        datas: any[];
    };
}

export interface CartItem {
    // id
    productable_id: number;
    // 關聯型號 id
    product_variationable_id?: number;
    // 數量
    quantity: number;
}

// 訂製門扇購物車 api 資料
export interface CustomCarItem {
    items: CartItem[];
    // 數量
    quantity: number;
}

// 訂製門扇更新購物車數量參數
export interface ReqUpdateCustomCart {
    cart_combination_id: number;
    quantity?: number;
}
// 訂製門扇刪除購物車參數
export interface ReqDeleteCustomCart {
    cart_combination_id: number;
}
//  取得丈量時間參數
export interface ReqMeasuring {
    // 開始時間
    start_date: string;
    // 結束時間
    end_date: string;
}
// 愛心捐贈碼驗證 api 參數
export interface ReqValidatorDonationCode {
    donation_code: string;
}
// 手機載具 api 參數
export interface ReqValidatorMobileCarrierCode {
    carrier_code: string;
}

// 折扣計算 api 參數
export interface DiscountCalculate {
    type: string;
    coupon_code: string;
    cart_items?: string[];
    cart_combinations?: string[];
}
