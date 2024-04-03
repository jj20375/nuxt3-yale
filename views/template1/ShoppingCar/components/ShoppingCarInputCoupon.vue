<template>
    <div class="bg-gray-50 p-5 xl:p-[24px] rounded-[20px] w-full">
        <p class="text-gray-800 text-[15px] mb-[5px]">輸入優惠序號</p>
        <div class="flex">
            <el-input
                v-model="formData.coupon"
                class="rounded-tl-[4px] rounded-bl-[4px] flex-1 focus:outline-none"
                placeholder="請輸入優惠序號..."
            />
            <button @click="handleCoupon" class="bg-gray-800 py-[10px] px-[16px] xl:px-[24px] text-white rounded-tr-[4px] rounded-br-[4px] text-[16px]">確認</button>
        </div>
        <div
            v-if="formData.showCheckWarning"
            class="text-pink-900 text-[14px] mt[10px]"
        >
            {{formData.warningTXT}}
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
const formData = ref<any>({
    warningTXT: '',
    showCheckWarning: false,
    coupon: ''
})
const emit = defineEmits(["getCoupon"]);
const handleCoupon = () => {
    console.log('handleCoupon')
    if (formData.value.coupon === '') {
        ElMessage({
            type: "error",
            message: '請輸入優惠碼',
        });
    } else {
        emit("getCoupon", formData.value.coupon);
    }
}
defineExpose({
    formData
});
</script>
<style lang="scss" scoped>
:deep(.el-input__inner) {
    font-size: 16px;
}
</style>
