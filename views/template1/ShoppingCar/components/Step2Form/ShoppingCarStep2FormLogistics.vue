<template>
    <div class="mt-[60px]">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] w-full font-medium mb-[30px]">配送方式</h5>
        <el-form class="custom-form">
            <div class="grid grid-cols-2 gap-6">
                <el-form-item>
                    <label class="block w-full text-gray-800 text-[15px]"> 配送方式 </label>
                    <el-select
                        v-model="formData.logistics" class="w-full"
                    >
                        <el-option
                            v-for="(option, index) in logisticsOptions"
                            :key="index"
                            :label="option.label"
                            :value="option.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <p class="text-[15px] text-gray-500 mt-6">運費說明文字運費說明文字運費說明文字運費說明文字運費說明文字運費說明文字</p>
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

const logisticsOptions = ref<any>([
    { value: "type1", label: "type1" },
]);

watch(formData.value, (val) => {
    emit("update:form", val);
});
</script>
