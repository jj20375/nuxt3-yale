/**
 * CustomProductGetSceneInterface 場景列表
 */
import { CustomProductGetSceneInterface } from "@/interface/customProduct";

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
                scenes.value = data.value.data;
            }
        } catch (err) {
            console.log("CustomProductGetSceneListAPI => ", err);
        }
    }

    // 訂製門扇資料
    const customProductList = ref<any>([]);

    /**
     * 取得訂製門扇列表
     */
    async function getCustomProductList(id: number) {
        try {
            const { data }: any = await $api().CustomProductGetListAPI({ search_relations: "customScene.id:" + id });
            if (data.value) {
                customProductList.value = data.value.data;
            }
        } catch (err) {
            console.log("CustomProductGetListAPI => ", err);
        }
    }

    return {
        getCustomProductSceneList,
        scenes,
        getCustomProductList,
        customProductList,
    };
}
