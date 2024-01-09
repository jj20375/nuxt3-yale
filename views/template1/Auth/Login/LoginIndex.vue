<template>
    <section class="mt-[94px] border-t border-gray-300 bg-gray-100 flex items-center justify-center py-[60px]">
        <div class="w-[420px] py-[60px] px-[72px] bg-white mx-auto rounded-[24px] custom-form">
            <h3 class="font-medium text-[28px] text-center mb-8">會員登入</h3>
            <el-form-item class="form-item" label="電子信箱">
                <el-input placeholder="請輸入電子信箱">
                </el-input>
            </el-form-item>
        </div>
    </section>
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