<template>
    <div>
        <h3 class="text-[16px] font-medium YaleSolisW-Bd mb-[20px]">尺寸 <span class="text-[14px]">（若非以下尺寸，建議致電客製化報價）</span></h3>
        <ul class="flex flex-col gap-4">
            <li
                @click="currentSizeDataId = size.id"
                v-for="(size, index) in sizes"
                :key="index"
                class="py-[16px] px-[24px] text-[14px] rounded-[8px] text-gray-800 cursor-pointer border border-gray-300 cursor-pointer"
                :class="currentSizeDataId === size.id ? 'outline outline-2 outline-yellow-600 -outline-offset-2 font-medium' : ''"
            >
                <div>{{ size.name }}</div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:currentSizeId", "update:currentSizeData"]);

const props = defineProps({
    sizes: {
        type: Array,
        default() {
            return [
                {
                    id: "id1",
                    // 門尺寸
                    name: "200cm-215cm",
                    icon: "",
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
        emit(
            "update:currentSizeData",
            props.sizes.find((item) => item.id === val)
        );
    }
);

watch(
    () => props.currentSizeId,
    (val) => {
        currentSizeDataId.value = val;
    }
);

onMounted(() => {
    emit("update:currentSizeId", props.currentSizeId);
    emit(
        "update:currentSizeData",
        props.sizes.find((item) => item.id === props.currentSizeId)
    );
});
</script>
