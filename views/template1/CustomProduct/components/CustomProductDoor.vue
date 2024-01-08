<template>
    <div>
        <h3 class="text-[16px] font-medium YaleSolisW-Bd mb-[20px]">款式</h3>
        <el-radio-group
            v-model="currentDoorData"
            @change="setDoor"
            class="ml-4"
        >
            <div
                v-for="(door, index) in doors"
                :key="index"
                class="border-b border-gray-300 py-[16px] flex"
            >
                <el-radio
                    :label="door.id"
                    size="large"
                ></el-radio>
                <h5>{{ door.title }}</h5>
                <div class="flex">
                    <div class="mr-[12px]">
                        <NuxtImg
                            class="w-[80px]"
                            :src="door.imgSrc"
                        />
                    </div>
                    <div class="text-[14px]">
                        <p class="text-gray-500">{{ door.style }}</p>
                        <p class="text-gray-500">{{ door.name }}</p>
                        <p class="text-gray-800">+NT$ {{ $utils().formatCurrency(door.price) }}</p>
                    </div>
                </div>
            </div>
        </el-radio-group>
    </div>
</template>

<script setup lang="ts">
const { $utils } = useNuxtApp();

const emit = defineEmits(["update:currentDoor"]);

interface Props {
    currentDoor: string | number;
    doors: {
        imgSrc: string;
        title: string;
        price: number;
        name: string;
        style?: string;
        description?: string | null;
        id: string;
    }[];
}

const props = withDefaults(defineProps<Props>(), {
    // 預設選擇門扇
    currentDoor: "id1",
    // 可選擇門扇
    doors: [
        {
            imgSrc: "/img/custom-product/demo/custom-product-door-demo-1.jpg",
            name: "品牌/ASSA ABLOY",
            style: "YDM3109A",
            price: 2000,
        },
    ],
});

// 預設選擇門扇資料
const currentDoorData = ref(props.currentDoor);

/**
 * 設定選擇門扇資料
 */
function setDoor(val) {
    currentDoorData.value = val;
}

watch(
    () => currentDoorData.value,
    (val) => {
        emit("update:currentDoor", val);
    }
);
</script>

<style lang="scss" scoped>
:deep .el-radio__input.is-checked .el-radio__inner {
    @apply bg-yellow-600 border-yellow-600 #{!important};
}

:deep .el-radio-group {
    @apply block #{!important};
}

:deep .el-radio {
    @apply mr-[8px] #{!important};
}

:deep .el-radio__label {
    @apply hidden #{!important};
}
</style>
