<template>
    <el-dialog
        id="addToCarDialog"
        v-model="showDialog2"
        width="388"
        :show-close="false"
        :align-center="true"
        :before-close="closeDialog"
        style="border-radius: 24px"
        appen-to-body
    >
        <template #header="{ close, titleId, titleClass }"></template>
        <div class="flex justify-center">
            <div>
                <NuxtImg
                    class="w-[56px] mx-auto"
                    src="/img/icons/shop-card.svg"
                />
                <h5 class="text-[20px] text-gray-800 text-center mt-[12px]">加入購物車成功</h5>
                <div class="flex mt-[24px]">
                    <div class="mr-[12px]">
                        <button
                            @click.prevent="closeDialog"
                            class="transition-all duration-500 hover:bg-gray-800 hover:text-white text-gray-800 border border-gray-800 rounded-full px-[37px] py-[11px] text-center"
                        >
                            繼續選購
                        </button>
                    </div>
                    <NuxtLink :to="{ name: 'shopping-car-slug', params: { slug: '耶魯電子鎖購物車' }, query: { tab } }">
                        <button class="transition-all duration-500 hover:bg-yellow-700 hover:border-yellow-700 bg-yellow-600 text-gray-800 border border-yellow-600 rounded-full px-[37px] py-[11px] text-center">前往購物車</button>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:showDialog"]);
const props = defineProps({
    // 顯示彈窗
    showDialog: {
        type: Boolean,
        default: false,
    },
    // 判斷是否為一般產品 還是 訂製門扇購物車
    tab: {
        type: String,
        default: "type1",
    },
});

const router = useRouter();

// 判斷是否顯示彈窗
const showDialog2 = ref(props.showDialog);

watch(
    () => props.showDialog,
    (val) => {
        showDialog2.value = val;
    }
);

function closeDialog() {
    emit("update:showDialog", false);
}
</script>
