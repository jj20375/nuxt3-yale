<template>
    <div>
        <el-checkbox-group
            v-model="selectedServices"
            @change="selectService"
        >
            <el-checkbox
                v-for="service in services"
                :key="service.id"
                :label="service.id"
                size="large"
            >
                <div class="flex">
                    <span class="flex-1 min-w-[100px] font-medium YaleSolisW-Bd"> {{ service.name }} </span>
                    <span class="ml-[16px]">+NT$ {{ $utils().formatCurrency(service.price) }}</span>
                </div>
            </el-checkbox>
        </el-checkbox-group>
        <div class="text-[14px] text-gray-500 mt-[30px]">
            <p>【附註說明】</p>
            <ul>
                <li v-for="text in descriptions">
                    {{ text }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
const { $utils } = useNuxtApp();

const emit = defineEmits(["update:selectedServiceIds", "update:selectedServiceDatas"]);

interface Props {
    services: {
        id: number;
        name: string;
        price: number;
    }[];
}

const props = withDefaults(defineProps<Props>(), {
    services: [
        {
            id: "id1",
            name: "拆除及清運",
            price: 1000
        },
        {
            id: "id2",
            name: "泥作",
            price: 1500
        },
        {
            id: "id3",
            name: "油漆",
            price: 1800
        }
    ]
});

const selectedServices = ref([]);

const descriptions = ref(["1. 實際價格將依現場丈量評估後為準，費用加在尾款"]);

/**
 * 選擇服務
 */
function selectService(val: any) {
    emit("update:selectedServiceIds", val);
    emit(
        "update:selectedServiceDatas",
        props.services.filter((item) => val.includes(item.id))
    );
}

watch(
    () => props.services,
    (val) => {
        selectedServices.value = [];
    }
);

/**
 * 需要預設選擇時才呼叫
 */
function init() {
    selectedServices.value = props.services.map((item: any) => item.id);
}

// init();
</script>

<style lang="scss" scoped>
:deep(.el-checkbox-group) {
    @apply text-base leading-normal block #{!important};
}

:deep(.el-checkbox.el-checkbox--large) {
    @apply w-full mr-0;
    .el-checkbox__label {
        @apply font-normal #{!important};
    }

    .el-checkbox__inner {
        @apply w-[18px] h-[18px] #{!important};
        &:hover {
            @apply border-yellow-600;
        }
    }

    .is-checked {
        .el-checkbox__inner {
            @apply bg-yellow-600 border-yellow-600 after:h-[9px] after:left-[6px] after:top-[2px] #{!important};
        }
    }
}
</style>
