<template>
    <section class="max-w-[950px] mx-auto mt-[40px]">
        <h2 class="text-[32px] mb-[20px] YaleSolisW-Bd font-medium">Yale Home 安裝注意事項</h2>
        <!--    編輯器區塊   -->
        <div class="edit-section" v-html="datas">
        </div>
        <p class="mt-10">(註1) 上述為人因素致使損壞或故障，需由買方自行承擔。</p>
    </section>
</template>

<script setup lang="ts">
const datas = ref('<h5 class="text-[20px] YaleSolisW-Bd font-medium">一、【本公告及產品規範僅適用於台灣地區】</h5><p class="text-[16px] mt-[16px]">在台銷售之電子鎖產品為專門為台灣地區用戶所設計，非經由香港商亞薩合萊有限公司台灣區分公司授權之銷售通路購買之產品恕不適用。</p><h5 class="text-[20px] YaleSolisW-Bd font-medium">二、【設定與費用說明】</h5><ul class="mt-[16px]"><li class="list-disc list-inside text-[16px]">電子鎖一經綁定Yale Home藍芽模組只能停留在進階模式，無法藉由電子鎖及手機APP操作回到一般模式，請用戶於確定安裝使用前謹慎評估。</li><li class="list-disc list-inside text-[16px]">電子鎖經安裝「Yale Home藍芽模組」後如需更改為原廠設定，僅能透過原廠認證之專業技術人員到府更換零件，並將收取技術及零件費用。</li><li class="list-disc list-inside text-[16px]">凡未經Yale原廠授權之專業技師，即用戶或（及）第三方自行嘗試改為電子鎖原廠設定，可能造成電子鎖本身或藍芽模組無法使用或(及)損壞。(註1)</li><li class="list-disc list-inside text-[16px]">確定不再使用藍芽功能，且由原廠認證之專業技術人員到府更換零件(即改為原廠設定)，此變更電子鎖功能屬人為因素，非產品本身問題，不適用保固權益。</li></ul>');
</script>
