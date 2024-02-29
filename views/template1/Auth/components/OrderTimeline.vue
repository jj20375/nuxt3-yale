<template>
    <div class="w-full">
        <div
            class="relative w-full flex gap-[30px] items-center bg-gray-100 px-[20px] py-[10px] cursor-pointer"
            @click.prevent="toggleMenu"
        >
            <div class="flex gap-2">
                <div class="font-bold">訂單編號</div>
                <div class="YaleSolisW-Bd">{{ orderNumber }}</div>
            </div>
            <div
                class="font-bold"
                :class="getStatusClass(timeline[timeline.length - 1]?.status)"
            >
                {{ timeline[timeline.length - 1]?.status }}
            </div>
            <button @click.stop="refund" class="transparent-btn btn-xs">付款去</button>
            <NuxtImg
                class="absolute right-[20px] w-[32px] transition-all duration-300 ease-in-out"
                :class="{ '-rotate-180': isMenuOpen }"
                src="/img/icons/auth/arrow-down.svg"
            />
        </div>
        <div
            :class="{ active: isMenuOpen }"
            class="menu-content"
            :style="{ maxHeight: isMenuOpen ? menuInnerHeight + 'px' : '0' }"
        >
            <div
                class="py-[20px] px-[24px]"
                ref="menuInnerRef"
            >
                <ul class="pl-4 text-gray-400 list-disc">
                    <li
                        v-for="item in timeline"
                        :key="item.index"
                        class="py-1.5"
                    >
                        <div class="flex gap-4">
                            <div>{{ item.date }}</div>
                            <div>{{ item.time }}</div>
                            <div>{{ item.status }}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
interface Props {
    orderNumber: string;
    timeline: {
        date: string;
        time: string;
        status: string;
    }[];
}

const props = withDefaults(defineProps<Props>(), {
    orderNumber: "",
    timeline: [
        {
            date: "",
            time: "",
            status: "",
        },
    ],
});

// 計算文字顏色
const getStatusClass = (status: any) => {
    if (status === "未付款" || status === "待付訂金" || status === "待付尾款") {
        return "!text-pink-900";
    } else if (status === "處理中" || status === "派工確認完成" || status === "施工確認完成") {
        return "!text-blue-500";
    } else if (status === "已取消") {
        return "!text-orange-500";
    } else {
        return "";
    }
};

// 一開始為展開
const isMenuOpen = ref(true);
const menuInnerRef = ref(null);
const menuInnerHeight = ref(0);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const refund = (e) => {
    console.log(e)
}

onMounted(() => {
    // 在元素渲染後獲取高度
    if (menuInnerRef.value) {
        menuInnerHeight.value = menuInnerRef.value.clientHeight;
    }
});
</script>

<style scoped lang="scss">
.menu-content {
    @apply w-full outline outline-1 -outline-offset-1 outline-gray-100 overflow-hidden transition-all duration-300 ease-in-out;
    will-change: height;
    &.active {
        @apply transition-all duration-300 ease-in-out;
    }
    ul {
        li:last-child {
            @apply text-gray-800;
        }
    }
}
</style>
