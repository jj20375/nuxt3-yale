<template>
    <el-dialog
        id="addToCarDialog"
        class="custom-dialog"
        v-model="showDialog2"
        close-on-click-modal
        lock-scroll
        show-close
        width="400"
        :before-close="closeDialog"
        center
        align-center
        append-to-body
    >
        <template #header="{ close, titleId, titleClass }"></template>
        <div class="flex justify-center">
            <div>
                <Vue3Lottie
                    animationLink="/json/shopping-cart.json"
                    :height="100"
                    :width="100"
                />
                <h5 class="text-[20px] text-gray-800 text-center mt-[12px]">加入購物車成功</h5>
                <div class="flex gap-3 mt-[24px]">
                    <button
                        @click.prevent="closeDialog"
                        class="transparent-btn btn-sm !py-2"
                    >
                        繼續選購
                    </button>
                    <NuxtLink :to="{ name: 'shopping-car-slug', params: { slug: '耶魯電子鎖購物車' }, query: { tab } }">
                        <button class="yellow-btn btn-sm !py-2">前往購物車</button>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";

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
        default: "tye1",
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
