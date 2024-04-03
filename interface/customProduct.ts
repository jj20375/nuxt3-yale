/**
 * 場景列表 api 格式
 */
export interface CustomProductGetSceneListAPIInterface {
    data: CustomProductGetSceneInterface[];
}
/**
 * 場景列表 格式
 */
export interface CustomProductGetSceneInterface {
    id: number;
    name: string;
    icon: string;
    // 背景背面圖
    back_image: string;
    // 背景正面圖
    front_image: string;
    // 背景側面圖
    half_image: string;
    // 訂製門扇方案
    customPlans: CustomProductPlans[];
}

/**
 * 訂製門扇方案
 */
export interface CustomProductPlans {
    id: number;
    // 方案名稱
    name: string;
    CustomPlanProducts: CustomProductPlanDefaultSelect[];
}

/**
 * 訂製門扇方案預設選項
 */
export interface CustomProductPlanDefaultSelect {
    id: number;
    // 產品名稱
    name?: string;
    // 品牌名稱
    brand?: string | null;
    // 產品圖片
    carousel_images?: string[];
    // 產品說明
    content?: string;
    // 產品規格選項
    customProductOptions?: any[];
    // 產品分類
    customProductType?: {
        id: number;
        name: string;
    }[];
    // 產品分類 id
    custom_product_type_id?: number;
    // 產品背面圖
    back_image?: string | null;
    // 產品正面圖
    front_image?: string | null;
    // 產品側面圖
    half_image?: string | null;
    // 產品價格
    price: string;
    // 庫存
    stock: number;
    // 判斷是否有額外的產品型號
    is_single_variation: 1 | 0;
}
