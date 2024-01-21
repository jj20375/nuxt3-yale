<template>
    <BannerLayout
        :title="'預約安裝'"
        :banner="'/img/repair/repair-banner.jpg'"
    >
        <template #breadcrumbs>
            <Breadcrumb :menus="breadcrumbs" />
        </template>
        <template #content>
            <div class="max-w-[800px] mx-auto mt-[80px]">
                <div class="w-full bg-gray-100 h-[400px] flex items-center justify-center">
                    <div>
                        <NuxtImg
                            class="w-[80px] mx-auto"
                            src="/img/repair/repair-img-icon.svg"
                        />
                        <p class="text-[16px] text-center">預約安裝流程圖</p>
                    </div>
                </div>
                <div class="mt-[36px]">
                    <h3 class="font-medium text-[18px] YaleSolisW-Bd mb-[12px]">服務保證範圍</h3>
                    <p>
                        特殊保固期限 於營業場所使用者則依原保固期限減半。 非保固範圍
                        下列情形非屬保固範圍，檢修需酌收服務費，若需零件更換，則依循本公司服務零件檢修價目表收費。<br /><br />

                        若超過保固期限或是保固期限內需維修，請聯絡客戶服務中心0800-888-259或E-mail至
                        客服信箱service.tw@electrolux.com，將安排到府收送。建議您留下產品包裝外箱以利裝箱運送。<br /><br />

                        保固起算日期將採以下任一方式認定： 1. 有效保證卡之留存聯（加蓋經銷店章及註明購買日期） 2.
                        購買憑證（發票、收據等）正本或影本 若無以上資料者，則依照產品主機上之機號(製造號碼，第一碼為製造年份，第二與第三碼為製造週別)往後推算三個月做為保固起算日期
                    </p>
                    <div class="mt-[60px] flex justify-center text-[20px] font-medium YaleSolisW-Bd">
                        <div class="mr-[24px]">
                            <NuxtLink :to="{ name: 'reservation-general-slug', params: { slug: '一般安裝' } }">
                                <button
                                    class="px-[38px] w-[385px] h-[100px] rounded-[20px] text-center bg-gray-100 hover:bg-yellow-600 duration-500 transit flex items-center justify-center">
                                    <div class="mr-[20px]">
                                        <NuxtImg
                                            class="w-[36px]"
                                            src="/img/reservation/reservation-yale-icon.png"
                                        />
                                    </div>
                                    <div>一般安裝</div>
                                </button>
                            </NuxtLink>
                        </div>
                        <NuxtLink :to="{ name: 'reservation-warranty-slug', params: { slug: '一般安裝' } }">
                            <button
                                class="px-[38px] w-[385px] h-[100px] rounded-[20px] text-center bg-gray-100 hover:bg-yellow-600 duration-500 transit flex items-center justify-center">
                                <div class="mr-[20px]">
                                    <NuxtImg
                                        class="w-[36px]"
                                        src="/img/reservation/reservation-security-guard-icon.png"
                                    />
                                </div>
                                <div>新光保全安裝</div>
                            </button>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </template>
    </BannerLayout>
</template>

<script setup lang="ts">
import BannerLayout from "~/views/template1/layouts/BannerLayout.vue";
import Breadcrumb from "~/views/template1/components/Breadcrumb.vue";

const breadcrumbs = ref([
    {
        name: "index",
        text: "首頁"
    },
    {
        name: "faq-slug",
        text: "服務支援",
        params: { slug: "耶魯服務支援" }
    },
    {
        name: "repair-slug",
        text: "維修與保固",
        params: { slug: "耶魯維修與保固" },
        query: { id: "1" }
    }
]);
</script>
