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
                <!--   編輯區內容   -->
                <div class="edit-section">
                    <NuxtImg class="w-full"
                             src="/img/reservation/reservation-process.jpg"
                    />
                    <h3 class="font-medium text-[18px] YaleSolisW-Bd mt-[36px] mb-[12px]">服務保證範圍</h3>
                    <p>
                      特殊保固期限 於營業場所使用者則依原保固期限減半。 非保固範圍
                      下列情形非屬保固範圍，檢修需酌收服務費，若需零件更換，則依循本公司服務零件檢修價目表收費。<br /><br />

                      若超過保固期限或是保固期限內需維修，請聯絡客戶服務中心0800-888-259或E-mail至
                      客服信箱service.tw@electrolux.com，將安排到府收送。建議您留下產品包裝外箱以利裝箱運送。<br /><br />

                      保固起算日期將採以下任一方式認定：<br />1. 有效保證卡之留存聯（加蓋經銷店章及註明購買日期）<br />2.
                      購買憑證（發票、收據等）正本或影本 若無以上資料者，則依照產品主機上之機號(製造號碼，第一碼為製造年份，第二與第三碼為製造週別)往後推算三個月做為保固起算日期
                    </p>
                </div>
                <div class="mt-[40px] flex gap-[24px] justify-center text-[20px] font-medium YaleSolisW-Bd">
                    <div class="flex-1 flex flex-col items-center gap-[20px] py-[40px] bg-gray-100 rounded-[20px]">
                        <div class="flex items-center gap-3">
                            <NuxtImg
                                class="w-[36px]"
                                src="/img/reservation/reservation-yale-icon.png"
                            />
                            <div>一般安裝</div>
                        </div>
                        <NuxtLink :to="{ name: 'reservation-general-slug', params: { slug: '一般安裝' } }">
                            <button class="yellow-btn btn-md">前往申請</button>
                        </NuxtLink>
                    </div>
                    <div class="flex-1 flex flex-col items-center gap-[20px] py-[40px] bg-gray-100 rounded-[20px]">
                        <div class="flex items-center gap-3">
                            <NuxtImg
                                class="w-[36px]"
                                src="/img/reservation/reservation-security-guard-icon.png"
                            />
                            <div>新光保全安裝</div>
                        </div>
                        <NuxtLink :to="{ name: 'reservation-guard-slug', params: { slug: '新光保全安裝' } }">
                            <button class="yellow-btn btn-md">前往申請</button>
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
