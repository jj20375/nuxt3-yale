<template>
    <div class="bg-gray-50 p-4 sm:p-[30px] rounded-[8px] mb-6 sm:mb-[30px]">
        <div class="leading-8" v-html="saleData"></div>
    </div>
</template>

<script setup lang="ts">
const saleData = ref(`
[活動] 寵愛媽咪節，滿 <strong>NT$10,000</strong> 折 <strong>NT$1,000</strong> <br />
※ 還差 <strong>NT$1500</strong> 就可再享有 <strong>9</strong> 折優惠!<br />
※ 還差 <strong>NT$100</strong> 就可獲得滿額贈品!<br  />
※ 宅配、郵寄、超取訂單總計滿 <strong>NT$2000 免運費。</strong>
`);
</script>

<style lang="scss" scoped>
strong {
    font-family: "YaleSolisW-Bd", "Noto Sans TC", "Open Sans", Arial, Helvetica, sans-serif;
    @apply font-bold;
}
</style>
