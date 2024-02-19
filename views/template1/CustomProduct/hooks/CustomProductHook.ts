/**
 * CustomProductGetSceneInterface: 場景列表
 */
import { CustomProductGetSceneInterface } from "@/interface/customProduct";
/**
 * CustomProductListIdEnum: 訂製門扇 id 對應分類
 * CustomProductListOptionEnum: 訂製門扇 產品選項
 */
import { CustomProductListIdEnum, CustomProductListOptionEnum } from "@/enums/customProduct.enum";

export function useCustomProdutHook() {
    const { $api } = useNuxtApp();

    // 場景資料
    const scenes = ref<CustomProductGetSceneInterface[]>([{ id: 0, name: "", icon: "", background_image: "" }]);

    /**
     * 取得訂製門扇場景資料
     */
    async function getCustomProductSceneList() {
        try {
            const { data } = await $api().CustomProductGetSceneListAPI();
            if (data.value) {
                scenes.value = [];
                // scenes.value = data.value.data;
                for (let i = 0; i < data.value.data.length; i++) {
                    scenes.value.push({
                        id: data.value.data[i].id,
                        text: data.value.data[i].name,
                        icon: data.value.data[i].icon,
                        front: data.value.data[i].front_image,
                        backend: data.value.data[i].back_image,
                        half: data.value.data[i].half_image,
                    });
                }
            }
        } catch (err) {
            console.log("CustomProductGetSceneListAPI => ", err);
        }
    }

    // 訂製門扇資料
    const customProductList = ref<any>({});

    /**
     * 取得訂製門扇列表
     */
    async function getCustomProductList(id: number) {
        try {
            const { data }: any = await $api().CustomProductGetListAPI({ search_relations: "customScene.id:" + id });
            if (data.value) {
                // 取得門扇資料
                let doors = data.value.data.find((item: any) => item.id === CustomProductListIdEnum.door);
                doors = setDoorData(doors);
                // 取得門框資料
                let doorsOut = data.value.data.find((item: any) => item.id === CustomProductListIdEnum.doorOut);
                doorsOut = setDoorData(doorsOut);
                // 取得電子鎖資料
                let locks = data.value.data.find((item: any) => item.id === CustomProductListIdEnum.lock);
                locks = setLocksData(locks);
                // 取得水平把手資料
                let handles = data.value.data.find((item: any) => item.id === CustomProductListIdEnum.handle);
                handles = setLocksData(handles);
                // 取得基本五金-掛門資料
                let tool1Datas = data.value.data.find((item: any) => item.id === CustomProductListIdEnum.tool1);
                tool1Datas = setToolData(tool1Datas);
                // 取得基本五金-取得氣密條資料
                let tool2Datas = data.value.data.find((item: any) => item.id === CustomProductListIdEnum.tool2);
                tool2Datas = setToolData(tool2Datas);
                // 取得選配五金-下將壓條取得
                let other1Datas = data.value.data.find((item: any) => item.id === CustomProductListIdEnum.other1);
                other1Datas = setToolData(other1Datas);
                // 取得選配五金-門弓器取得
                let other2Datas = data.value.data.find((item: any) => item.id === CustomProductListIdEnum.other2);
                other2Datas = setToolData(other2Datas);
                // 取得施作服務取得
                let serviceDatas = data.value.data.find((item: any) => item.id === CustomProductListIdEnum.service);
                serviceDatas = setServiceData(serviceDatas);

                customProductList.value = {
                    doors,
                    doorsOut,
                    locks,
                    handles,
                    tool1Datas,
                    tool2Datas,
                    other1Datas,
                    other2Datas,
                    serviceDatas,
                };
            }
        } catch (err) {
            console.log("CustomProductGetListAPI => ", err);
        }
    }

    /**
     * 門扇整理資料
     */
    function setDoorData(datas: any) {
        const result = [];
        datas.customProducts.forEach((item: any) => {
            // 預覽圖
            const previewImgSrc = {};
            // 庫存
            const stock = {};
            // 價格
            const price = {};
            for (const key of Object.keys(item.customProductVariations)) {
                previewImgSrc[key] = {
                    front: item.customProductVariations[key].front_image,
                    backend: item.customProductVariations[key].back_image,
                    half: item.customProductVariations[key].half_image,
                };
                stock[key] = item.customProductVariations[key].stock;
                price[key] = Number(item.customProductVariations[key].price);
            }
            // 判斷是否有尺寸值
            const haveSize = item.customProductOptions.find((option: any) => option.id === CustomProductListOptionEnum.size);
            //  判斷是否有尺寸值 沒有值給空陣列
            const sizes = haveSize !== undefined ? haveSize.values : [];
            result.push({
                id: item.id,
                style: item.model,
                title: item.name,
                name: `${item.brand}`,
                imgSrc: item.main_image,
                colors: item.customProductOptions
                    .find((option: any) => option.id === CustomProductListOptionEnum.color)
                    .values.map((color: any) => ({
                        id: color.id,
                        text: color.name,
                        imgSrc: color.icon,
                    })),
                sizes,
                previewImgSrc,
                stock,
                price,
                detailData: {
                    carousel: item.carousel_images.map((item: string, index: number) => ({ id: index + 1, imgSrc: item })),
                    content: item.content,
                },
            });
        });
        return result;
    }

    /**
     * 設定鎖資料
     * @param datas
     */
    function setLocksData(datas: any) {
        const result = [];
        datas.customProducts.forEach((item: any) => {
            result.push({
                imgSrc: item.main_image,
                style: `${item.model} ${item.name}`,
                title: item.name,
                name: `${item.name}`,
                shape: item.shape,
                stock: item.stock,
                price: Number(item.price),
                id: item.id,
                detailData: {
                    carousel: item.carousel_images.map((item: string, index: number) => ({ id: index + 1, imgSrc: item })),
                    content: item.content,
                },
                previewImgSrc: {
                    front: item.front_image,
                    backend: item.back_image,
                    half: item.half_image,
                },
            });
        });
        return result;
    }

    /**
     * 設定必選五金與選配資料
     */
    function setToolData(datas: any) {
        const result = [];
        datas.customProducts.forEach((item: any) => {
            result.push({
                id: item.id,
                style: item.model,
                title: item.name,
                name: item.brand,
                imgSrc: item.main_image,
                stock: item.stock,
                price: Number(item.price),
                detailData: {
                    carousel: item.carousel_images.map((item: string, index: number) => ({ id: index + 1, imgSrc: item })),
                    content: item.content,
                },
            });
        });
        return result;
    }

    /**
     * 設定施作服務資料
     */
    function setServiceData(datas: any) {
        const result = [];
        datas.customProducts.forEach((item: any) => {
            result.push({
                id: item.id,
                name: item.name,
                imgSrc: item.main_image,
                stock: item.stock,
                price: Number(item.price),
                detailData: {
                    carousel: item.carousel_images.map((item: string, index: number) => ({ id: index + 1, imgSrc: item })),
                    content: item.content,
                },
            });
        });
        return result;
    }

    return {
        getCustomProductSceneList,
        scenes,
        getCustomProductList,
        customProductList,
    };
}
