<template>
    <div class="mt-[40px]">
        <h5 class="bg-gray-50 py-[8px] pl-[16px] w-full mb-[30px]">訂購人</h5>
        <el-form>
            <div class="grid grid-cols-2 gap-[30px]">
                <div
                    v-for="(column, key) in columns"
                    :key="key"
                >
                    <el-form-item :prop="key">
                        <label class="block w-full text-gray-800 text-[15px]"
                            >{{ column.label
                            }}<span
                                v-if="column.required"
                                class="ml-1 text-red-500"
                                >*</span
                            ></label
                        >
                        <div
                            v-if="key !== 'phone'"
                            class="bg-gray-50 p-[12px] w-full text-[16px]"
                        >
                            {{ formData[key] }}
                        </div>
                        <div
                            v-else
                            class="w-full"
                        >
                            <el-input
                                class="w-full"
                                v-model="formData[key]"
                            ></el-input>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <el-form-item prop="note">
                <label class="block w-full text-gray-800 text-[15px]">訂單備註</label>
                <el-input
                    v-model="formData.note"
                    type="textarea"
                    rows="5"
                    placeholder="有什麼話想告訴賣家嗎?"
                ></el-input>
            </el-form-item>
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
                name: "王小明",
                email: "123@gmail.cpm",
                phone: "0911123123",
                note: null,
            };
        },
    },
});

const columns = ref({
    name: {
        label: "會員名稱",
    },
    email: {
        label: "電子信箱",
    },
    phone: {
        label: "聯絡電話",
        required: true,
    },
});

const formData = ref(props.form);

watch(formData.value, (val) => {
    emit("update:form", val);
});
</script>

<style lang="scss" scoped>
:deep .el-input__wrapper {
    @apply shadow-none border-b border-gray-200 mx-0 rounded-none #{!important};
}
:deep .el-select {
    .el-input__wrapper {
        @apply mx-0;
    }
}
:deep .el-textarea__inner {
    @apply rounded-none;
}
</style>
