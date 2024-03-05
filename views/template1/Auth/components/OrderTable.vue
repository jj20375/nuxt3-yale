<template>
    <div class="relative"
         :class="[leftArrived ? '': 'before:absolute before:h-full before:w-[30px] before:pointer-events-none before:top-0 before:left-0 before:shadow-[inset_12px_0px_8px_-8px_rgba(5,5,5,0.1)]',rightArrived ? '': 'after:absolute after:h-full after:w-[30px] after:pointer-events-none after:top-0 after:right-0 after:shadow-[inset_-12px_0px_8px_-8px_rgba(5,5,5,0.1)]']">
        <div ref="scrollRef" class="relative m-auto overflow-x-auto">
            <table class="custom-table">
                <thead>
                <tr>
                    <th v-for="item in tableHeadData" :key="item.index">{{ item }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in tableBodyData" :key="item.index"
                    class="cursor-pointer hover:bg-gray-50">
                    <td class="min-w-[120px]">
                        <NuxtLink :to="item.url">
                            <div class="title">{{ item.number }}</div>
                        </NuxtLink>
                    </td>
                    <td class="min-w-[100px]">
                        <NuxtLink :to="item.url">
                            {{ item.date }}
                        </NuxtLink>
                    </td>
                    <td class="min-w-[40px]">
                        <NuxtLink :to="item.url">
                            {{ item.quantity }}
                        </NuxtLink>
                    </td>
                    <td class="min-w-[100px]">
                        <NuxtLink :to="item.url">
                            NT$ {{ $utils().formatCurrency(item.price) }}
                        </NuxtLink>
                    </td>
                    <td class="min-w-[70px]">
                        <NuxtLink :to="item.url" :class="getStatusClass(item.status)">
                            {{ item.status }}
                        </NuxtLink>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">

const { $utils } = useNuxtApp();

interface Props {
    tableHeadData: any[];
    tableBodyData: {
        number: string;
        date: string;
        quantity: string;
        price: number;
        status: string;
        url: {
            name: string;
            params?: { [key: string]: any };
            query?: { [key: string]: any }
        }
    }[];
};

const props = withDefaults(defineProps<Props>(), {
    tableHeadData: (props) => [],
    tableBodyData: [
        {
            number: "",
            date: "",
            quantity: "",
            price: 0,
            status: "",
            url: {
                name: "",
                params: {},
                query: {}
            }
        }
    ]
});

// 計算文字顏色
const getStatusClass = (status) => {
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

// 表格是否出現陰影(滑到底陰影會消失)
const scrollRef = ref(null);
const { x: xPosition, arrivedState } = useScroll(scrollRef, {
    behavior: "smooth"
});
const { right: rightArrived, left: leftArrived } = toRefs(arrivedState);
</script>