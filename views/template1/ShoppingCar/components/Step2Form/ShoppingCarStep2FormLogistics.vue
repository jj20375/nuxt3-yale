<template>
    <div class="mt-[88px]">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] w-full mb-[30px]">配送方式</h5>
        <el-form>
            <label class="block w-full text-gray-800 text-[15px]"> 配送方式 </label>
            <div class="bg-gray-50 p-[12px] w-full text-[16px]">
                {{ formData.logistics }}
            </div>
            <p class="text-[15px] text-gray-500 mt-[16px]">運費說明文字運費說明文字運費說明文字運費說明文字運費說明文字運費說明文字</p>
        </el-form>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:form"]);

const props = defineProps({
    form: {
        type: Object,
        default() {
            return {
                // 配送方式
                logistics: "type1",
            };
        },
    },
});

const formData = ref(props.form);

watch(formData.value, (val) => {
    emit("update:form", val);
});
</script>
