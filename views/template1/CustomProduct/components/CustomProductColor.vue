<template>
    <div>
        <h3 class="text-[16px] font-medium YaleSolisW-Bd mb-[20px]">顏色</h3>
        <ul
            class="flex flex-wrap mt-[20px] gap-x-[20px] gap-y-[12px]"
        >
            <li
                v-for="color in colors"
                :key="color.id"
                class="cursor-pointer group w-[48px]"
                @click="currentColorIdData = color.id"
            >
                <div
                    class="p-2 border-2 border-transparent rounded-full duration-300 transition-all"
                    :class="currentColorIdData === color.id ? 'border-yellow-600' : 'group-hover:border-gray-100'"
                >
                    <NuxtImg
                        class="w-[32px] aspect-square"
                        :src="color.imgSrc"
                    />
                </div>
                <p
                    class="text-[14px] text-center text-gray-800 px-2 pt-[8px] opacity-0 group-hover:opacity-100 duration-300 transition-all"
                    :class="currentColorIdData === color.id ? 'opacity-100': ''"
                >
                    {{ color.text }}
                </p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:currentColorId", "update:currentColorData"]);

interface Props {
    colors: {
        id: string | number;
        text: string;
        value: string | number;
        imgSrc: string;
    }[];
    currentColorId: string | number;
}

const props = withDefaults(defineProps<Props>(), {
    colors: [
        {
            id: "id1",
            text: "黑色",
            value: "black",
            imgSrc: "/img/product/demo/color-1.png",
        },
        {
            id: "id2",
            text: "紅色",
            value: "red",
            imgSrc: "/img/product/demo/color-2.png",
        },
    ],
    currentColorId: "id1",
});

// 預設選中顏色
const currentColorIdData = ref(props.currentColorId);

watch(
    () => currentColorIdData.value,
    (val) => {
        emit("update:currentColorId", val);
        emit(
            "update:currentColorData",
            props.colors.find((item) => item.id === val)
        );
    }
);
watch(
    () => props.currentColorId,
    (val) => {
        currentColorIdData.value = val;
    }
);

onMounted(() => {
    emit("update:currentColorId", props.currentColorId);
    emit(
        "update:currentColorData",
        props.colors.find((item) => item.id === props.currentColorId)
    );
});
</script>
