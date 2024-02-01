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
    back_image: string;
    front_image: string;
    half_image: string;
}
