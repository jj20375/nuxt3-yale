<template>
    <section class="min-h-screen mt-[94px]">
        <nav class="border-t border-b border-gray-300 py-[16px] pl-[122px] bg-white">
            <Breadcrumb :menus="breadcrumbs" />
        </nav>
        <div class="bg-gray-50">
            <div class="flex justify-center">
                <div class="container text-center">
                    <h1 class="text-[32px] YaleSolisW-Bd mt-[58px]">主鎖比較</h1>
                    <p class="text-[16px] mt-[13px]">請選擇產品進行規格比較</p>
                    <div class="mt-[20px]">
                        <button
                            :disabled="selectProducts.length === 0"
                            class="py-[11px] px-[31px] disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed bg-yellow-600 rounded-full text-gray-800 text-[16px]"
                        >
                            <span
                                @click="router.push({ name: 'product-compare-difference-slug', params: { slug: '耶魯電子鎖-主鎖規格比較' }, query: { category: 'id1', tag: 'id1' } })"
                                v-if="selectProducts.length > 0"
                                >查看規格</span
                            >
                            <span v-else>選擇一個產品</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="container grid grid-cols-4 gap-4 mt-[30px] pb-[104px]">
                <div
                    @click="selectProduct(item)"
                    v-for="item in 14"
                    :key="item"
                    :class="[selectProducts.includes(item) ? 'border border-yellow-600' : '', selectProducts.length === 3 && !selectProducts.includes(item) ? 'opacity-50' : '']"
                    class="bg-white p-[30px] rounded-[16px] cursor-pointer"
                >
                    <NuxtImg
                        class="object-cover w-full rounded-2xl aspect-1/1"
                        src="/img/home/product/product1.jpg"
                    />
                    <h5 class="text-[18px] YaleSolisW-Bd font-medium">YDM 4109A</h5>
                    <p class="text-[14px] text-gray-800">指紋密碼鑰匙三合一</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// 麵包屑組件
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";

const router = useRouter();

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁",
    },
    {
        name: "product-slug",
        text: "產品資訊",
        params: { slug: "耶魯產品資訊" },
    },
    {
        name: "product-slug",
        text: "電子鎖",
        params: { slug: "耶魯產品資訊-電子鎖" },
        query: { category: "id1" },
    },
    {
        name: "product-slug",
        text: "主鎖",
        params: { slug: "耶魯產品資訊-電子鎖-主鎖" },
        query: { category: "id1", tag: "id1" },
    },
    {
        name: "product-compare-slug",
        text: "主鎖比較",
        params: { slug: "耶魯產品資訊-主鎖比較" },
        query: { category: "id1", tag: "id1" },
    },
]);

// 選中產品
const selectProducts = ref<string | number[]>([]);

// 斷斷是否可以選擇產品
const cnaSelected = ref(false);

/**
 * 選擇事件
 * @param { type String or Number(字串或數字) } val 選中地區值
 */
function selectProduct(val: string | number) {
    if (selectProducts.value.map((item: any) => item).includes(val)) {
        // 將可選擇狀態改為 true
        cnaSelected.value = true;
        // 取得選擇區域 index索引位置
        const arrIndex = _FindIndex(selectProducts.value, function (item: any) {
            // 尋找與 val 相同位置的值
            return item == val;
        });
        // 刪除選中的地區值
        selectProducts.value.splice(arrIndex, 1);
    } else {
        // 如果選擇區域超過或等於3個時 直接回傳 不給選擇
        if (selectProducts.value.length >= 3) {
            // 將可選擇狀態改為 false
            cnaSelected.value = false;
            return;
        }
        // 新增選中的地區值
        selectProducts.value.push(val);
    }
}
</script>
