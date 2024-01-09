<template>
    <div>
        <h3 class="text-[16px] font-medium YaleSolisW-Bd mb-[20px]">尺寸</h3>
        <ul>
            <li
                @click="currentSizeDataId = size.id"
                v-for="(size, index) in sizes"
                :key="index"
                class="py-[16px] px-[24px] text-[14px] rounded-[8px] text-gray-800 mb-[16px] cursor-pointer"
                :class="currentSizeDataId === size.id ? 'border-2 border-yellow-600 font-medium YaleSolisW-Bd' : 'border-gray-300 border'"
            >
                <div>門高:{{ size.height }} 門寬:{{ size.width }} 門厚:{{ size.bold }}</div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:currentSizeId"]);

const props = defineProps({
    sizes: {
        type: Array,
        default() {
            return [
                {
                    id: "id1",
                    // 門高
                    height: "200cm-215cm",
                    // 門寬
                    width: "100cm",
                    // 門厚
                    bold: "7cm",
                },
            ];
        },
    },
    // 選擇尺寸
    currentSizeId: {
        type: String,
        default: "",
    },
});

// 選擇尺存
const currentSizeDataId = ref(props.currentSizeId);

watch(
    () => currentSizeDataId.value,
    (val) => {
        emit("update:currentSizeId", val);
    }
);
</script>
