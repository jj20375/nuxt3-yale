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
                customProductList.value = {
                    doors,
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
                sizes: item.customProductOptions.find((option: any) => option.id === CustomProductListOptionEnum.size).values,
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

    return {
        getCustomProductSceneList,
        scenes,
        getCustomProductList,
        customProductList,
    };
}
