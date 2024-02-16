<template>
    <div class="mt-[60px]">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] w-full font-medium mb-[30px]">預約丈量時間</h5>
        <el-form class="custom-form">
            <el-form-item prop="measureSizeTime">
                <div class="grid grid-cols-2 gap-[30px] w-full">
                    <div>
                        <label class="block w-full text-gray-800 text-[15px]">選擇丈量時間<span class="ml-1 text-red-500">*</span></label>
                        <el-date-picker
                            class="w-full"
                            type="date"
                            valueFormat="YYYY-MM-DD"
                            placeholder="請選擇日期"
                            v-model="form.store"
                        >
                        </el-date-picker>
                    </div>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const emit = defineEmits(["update:form"]);

const props = defineProps({
    form: {
        type: Object,
        default() {
            return {
                // 預約丈量時間
                measureSizeTime: "type1",
            };
        },
    },
});

const formData = ref(props.form);

watch(formData.value, (val) => {
    emit("update:form", val);
});
</script>
