<template>
    <div class="flex items-center justify-center min-h-[600px]">
        <div>
            <h1 class="YaleSolisW-Bd font-medium text-center mb-[20px] text-[28px] text-gray-800">訂單建立成功</h1>
            <p class="text-center mb-[40px] text-gray-800 text-[16px]">
                您的訂單已經成功送出，我們會在第一時間進行處理！ <br />
                請至會員中心-我的訂單查詢，或於結帳時所填之 Email 信箱檢視郵件以追蹤訂單狀態。<br />
                假如您有任何疑問，請撥打服務專線 {{ contactPhone }}，感謝您的訂購。
            </p>
            <div class="flex justify-center">
                <button class="py-[11px] px-[51px] text-center bg-yellow-600 hover:bg-yellow-700 duration-500 transition-all rounded-full">查看訂單狀態</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const contactPhone = ref("0912345678");
</script>
