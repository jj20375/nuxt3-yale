/**
 * 場景列表 api 格式
 */
export interface CustomProductGetSceneListInterface {
    data: {
        id: number;
        name: string;
        icon: string;
        background_image: string;
    }[];
}
