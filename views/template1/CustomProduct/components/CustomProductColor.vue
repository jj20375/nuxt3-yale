<template>
    <div>
        <h3 class="text-[16px] font-medium YaleSolisW-Bd mb-[20px]">顏色</h3>
        <ul
            class="flex mt-[20px] gap-[20px]"
            v-for="(rowColor, index) in showColors"
        >
            <li
                v-for="color in rowColor"
                :key="color.id"
                class="cursor-pointer group"
                @click="currentColorIdData = color.id"
            >
                <div
                    class="p-2 border-2 border-transparent rounded-full duration-300 transition-all"
                    :class="currentColorIdData === color.id ? 'border-yellow-600' : 'group-hover:border-gray-100'"
                >
                    <NuxtImg
                        class="w-[32px]"
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

// 顯示顏色規則 因為 6個顏色要換行 因此加上此演算法
const showColors = computed(() => {
    // 一行顯示幾個
    const rowShowTotal = 6;
    var datas = props.colors;

    // 可被整除的數字 (取出可被 6 整除的最大公倍數，當陣列數小於 6 時 給予預設值 1)
    const divisble = datas.length / rowShowTotal < 0 ? 1 : datas.length / rowShowTotal;
    // 需要更新的所有路徑 (將陣列資料 以 4 筆 為單位 拆成 二維陣列資料方式存入)
    const datasTotal: any = [];
    // 判斷最大公倍數有多少執行回圈多少次
    for (let i = 0; i < divisble; i++) {
        datasTotal[i] = datas.slice(i * rowShowTotal, (i + 1) * rowShowTotal);
    }
    // 陣列數 / 6 如果未整除時 將剩餘陣列資料塞入 datasToatal 中
    if (datas.length / rowShowTotal > divisble) {
        // 新增一筆陣列資料將最後剩餘的資料塞入
        datasTotal[divisble] = datas.splice(divisble * rowShowTotal, datas.length);
    }
    return datasTotal;
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
