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
    background_image: string;
}
